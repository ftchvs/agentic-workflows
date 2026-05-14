# Human in the loop

AI agents can draft, inspect, summarize, compare, and recommend. They should not
silently take irreversible or external-visible actions.

## Default authority model

| Category | AI authority |
| --- | --- |
| Read local/project context | Allowed when scoped |
| Draft documents/messages | Allowed |
| Create local artifacts | Allowed |
| Commit code on requested work | Usually allowed with review |
| Send email/post/comment/invite/merge/delete | Requires explicit approval |
| Destructive or privacy-sensitive action | Requires explicit approval every time |

The point is not to slow down work. The point is to keep agency and
accountability where they belong.
