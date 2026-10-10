# Application guidance

- Application UI extensions live in `src/personal`; imported component implementations remain attributable to their sources.
- `Dockerfile.personal` builds the main application and the isolated MotionVault preview. Run dependency installation and verification in the environment authorized for the task.
- Keep original source and prompt snapshots byte-stable. Preserve licenses and do not infer unknown model or reproduction provenance.
- Do not add private infrastructure or account information to public documentation.
