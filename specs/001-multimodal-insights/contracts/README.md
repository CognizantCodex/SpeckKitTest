# Contract Validation

Run the lightweight local marker check:

```bash
python backend/scripts/validate_openapi.py
```

When Redocly is available, run the full lint:

```bash
npx @redocly/cli lint specs/001-multimodal-insights/contracts/openapi.yaml
```
