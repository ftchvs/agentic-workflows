import { test, expect } from 'bun:test';
import { readFileSync, existsSync } from 'node:fs';
import catalog from '../wiki/catalog.json';
import sources from '../wiki/sources.json';

test('public catalog has distinct identities and reconciled counts', () => {
  const skills = catalog.entries.filter(entry => entry.type === 'skill');
  expect(skills).toHaveLength(505);
  expect(new Set(skills.map(entry => entry.name)).size).toBe(skills.length);
  expect(catalog.entries.filter(entry => entry.type === 'workflow')).toHaveLength(19);
  expect(catalog.distinctSkillNames - catalog.withheldPrivateSkills).toBe(skills.length);
  expect(skills.filter(entry => entry.availability === 'Reference copy')).toHaveLength(268);
});

test('every copied definition and existing playbook resolves to a real file', () => {
  for (const entry of catalog.entries) {
    if (!entry.documentation) continue;
    const path = entry.documentation.split('/blob/main/')[1];
    expect(existsSync(path)).toBe(true);
    expect(readFileSync(path, 'utf8').trim().length).toBeGreaterThan(50);
  }
  for (const source of sources) {
    expect(source.license).toBe('MIT');
    expect(readFileSync(source.licensePath, 'utf8')).toContain('Permission is hereby granted');
  }
});

test('public metadata contains no private paths or recognizable secrets', () => {
  const text = JSON.stringify(catalog);
  expect(text).not.toMatch(/\/Users\/|\/home\//);
  expect(text).not.toMatch(/\b(?:sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{20,})/);
  for (const entry of catalog.entries) {
    if (entry.source) expect(entry.source).toStartWith('https://');
    expect(entry.name).not.toContain('\n');
  }
});

test('reference-only entries never claim a redistributed implementation', () => {
  for (const entry of catalog.entries.filter(entry => entry.availability === 'Reference only')) {
    expect(entry.documentation).toBeNull();
    expect(entry.license).toBe('Not reviewed');
  }
});

test('directory descriptions are English and source checks record exact commits', () => {
  for (const entry of catalog.entries) {
    expect(entry.description).not.toMatch(/[\u3400-\u9fff]/);
  }
  for (const source of sources) {
    expect(source.checkedCommit).toMatch(/^[a-f0-9]{40}$/);
  }
});
