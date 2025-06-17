# Henry Santangelo – Personal Site


## Content

* Creative writing library (short stories & essays)
* Section with Henry Santangelo's pinned GitHub projects

---

## Local dev

```bash
npm ci
npm run dev   # http://localhost:3000
```

Production build:

```bash
npm run build && npm run start
```

---

## Deploy to Amplify

1. Connect repository.
2. Use these commands:

   ```yaml
   preBuild: { commands: ["npm ci"] }
   build:    { commands: ["npm run build"] }
   ```

3. Select "Next.js (SSR)" hosting.

---

## Structure

```
app/
  layout.tsx           # global layout + metadata
  page.tsx             # home
  creativewriting/
    page.tsx           # story index
    [id]/page.tsx      # story reader
public/creativewriting # markdown files + data.json
app/components/*       # shared UI
```

---

## License

MIT © Henry Santangelo
