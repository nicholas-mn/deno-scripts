Checks if [Teable](https://github.com/teableio/teable) has new commits. If it
does, send a notification.

## Instructions

1. Rename and edit .env file

```bash
mv .env.json.example .env.json
nano .env.json
```

2. Run script

```bash
deno --allow-net --allow-read main.ts
```
