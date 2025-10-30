export default function DocsPage() {
  return (
    <main className="docs-container" style={{ maxWidth: 860, margin: "2rem auto", padding: "1.2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#185abd", marginBottom: ".6rem" }}>Documentation</h1>
      <p style={{ color: "#475569", marginBottom: "1rem" }}>Zia's URL Shortener · Modern, fast, and easy to use</p>

      <section style={{ margin: "1.2rem 0" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Overview</h2>
        <p style={{ lineHeight: 1.7, color: "#334155" }}>
          This app lets you create short URLs, manage them from your dashboard, and
          share them anywhere. It uses a Node/Express backend and a Next.js frontend.
        </p>
      </section>

      <section style={{ margin: "1.2rem 0" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Authentication</h2>
        <p style={{ lineHeight: 1.7, color: "#334155" }}>
          Sign up and log in to generate a JWT. Include the token in the <code>Authorization</code>
          header as <code>Bearer &lt;token&gt;</code> for protected endpoints.
        </p>
      </section>

      <section style={{ margin: "1.2rem 0" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>API Endpoints</h2>
        <ul style={{ paddingLeft: "1.2rem", color: "#334155" }}>
          <li><strong>POST</strong> /user/signup – Create account</li>
          <li><strong>POST</strong> /user/login – Get JWT token</li>
          <li><strong>POST</strong> /shorten – Create short URL (auth)</li>
          <li><strong>GET</strong> /my/urls – List your URLs (auth)</li>
          <li><strong>GET</strong> /:shortCode – Redirect to original URL</li>
        </ul>
      </section>

      <section style={{ margin: "1.2rem 0" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Examples</h2>
        <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: ".85rem 1rem", borderRadius: 10, overflowX: "auto" }}>{`# Signup
curl -X POST http://localhost:8000/user/signup \
  -H "Content-Type: application/json" \
  -d '{"firstname":"Zia","lastname":"K","email":"user@example.com","password":"secret"}'

# Login
curl -X POST http://localhost:8000/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'

# Shorten (requires token)
curl -X POST http://localhost:8000/shorten \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"url":"https://example.com"}'
`}</pre>
      </section>

      <section style={{ margin: "1.2rem 0" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Notes</h2>
        <ul style={{ paddingLeft: "1.2rem", color: "#334155" }}>
          <li>Replace <code>&lt;token&gt;</code> with your JWT from login.</li>
          <li>The web app calls these endpoints directly; ensure the backend runs on port 8000.</li>
          <li>Use the Dashboard to copy, manage, and delete links.</li>
        </ul>
      </section>
    </main>
  )
}
