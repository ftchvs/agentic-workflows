#!/usr/bin/env bun

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const supportedLocales = new Set(['pt-BR', 'es', 'fr', 'ja', 'de']);
const defaultExcludedFrontmatter = ['date', 'slug', 'id', 'audioProjectId', 'heroImage'];

type Args = {
  source: string;
  locale: string;
  output?: string;
  execute: boolean;
  dryRun: boolean;
};

function parseArgs(argv: string[]): Args {
  const args: Args = {
    source: '',
    locale: '',
    execute: false,
    dryRun: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    const next = argv[index + 1];

    if (value === '--source' && next) {
      args.source = next;
      index += 1;
    } else if (value === '--locale' && next) {
      args.locale = next;
      index += 1;
    } else if (value === '--output' && next) {
      args.output = next;
      index += 1;
    } else if (value === '--execute') {
      args.execute = true;
    } else if (value === '--dry-run') {
      args.dryRun = true;
    } else {
      throw new Error(`Unknown or incomplete argument: ${value}`);
    }
  }

  if (!args.source || !args.locale) {
    throw new Error('Usage: i18n-agent.ts --source <file.mdx> --locale <locale> [--output <file>] [--dry-run|--execute]');
  }

  if (!supportedLocales.has(args.locale)) {
    throw new Error(`Unsupported locale "${args.locale}". Supported: ${[...supportedLocales].join(', ')}`);
  }

  if (args.execute && args.dryRun) {
    throw new Error('Choose either --execute or --dry-run, not both.');
  }

  if (!args.execute && !args.dryRun) {
    args.dryRun = true;
  }

  return args;
}

function outputPathFor(sourcePath: string, locale: string): string {
  const parsed = path.parse(sourcePath);
  return path.join(parsed.dir, `${parsed.name}.${locale}${parsed.ext}`);
}

function buildPrompt(sourcePath: string, locale: string, sourceContent: string): string {
  return `You are an expert MDX transcreation editor for locale "${locale}".

Transcreate the following MDX file. Do not translate literally.

Preserve exactly:
- YAML frontmatter keys
- ${defaultExcludedFrontmatter.join(', ')}
- URLs, file paths, image paths, code blocks, MDX component names, HTML attributes, CSS classes

Adapt:
- idioms
- sentence rhythm
- register and tone
- headings and summaries so they sound native

Return only the complete MDX file starting with frontmatter.

Source path: ${sourcePath}

${sourceContent}`;
}

function validateMdx(output: string): void {
  const trimmed = output.trim();
  if (!trimmed || trimmed === '---') {
    throw new Error('Transcreation returned empty MDX content.');
  }

  if (!trimmed.startsWith('---')) {
    throw new Error('Transcreation output must start with YAML frontmatter.');
  }

  const secondFence = trimmed.indexOf('---', 3);
  if (secondFence === -1) {
    throw new Error('Transcreation output is missing closing frontmatter fence.');
  }

  const body = trimmed.slice(secondFence + 3).trim();
  if (!body) {
    throw new Error('Transcreation output has frontmatter but no body content.');
  }
}

function runProvider(prompt: string): string {
  const command = process.env.TRANSCREATION_COMMAND;
  if (!command) {
    throw new Error('TRANSCREATION_COMMAND is required when using --execute.');
  }

  return execFileSync(command, {
    input: prompt,
    encoding: 'utf8',
    shell: true,
    stdio: ['pipe', 'pipe', 'inherit'],
  });
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(args.source)) {
    throw new Error(`Source file not found: ${args.source}`);
  }

  const sourceContent = fs.readFileSync(args.source, 'utf8');
  const prompt = buildPrompt(args.source, args.locale, sourceContent);
  const output = args.output ?? outputPathFor(args.source, args.locale);

  if (args.dryRun) {
    process.stdout.write(prompt);
    return;
  }

  const translated = runProvider(prompt).trim();
  validateMdx(translated);
  fs.writeFileSync(output, `${translated}\n`, 'utf8');
  console.log(`Wrote ${output}`);
}

main();
