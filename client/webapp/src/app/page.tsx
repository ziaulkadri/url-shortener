"use client"
import Link from "next/link"
import { useState } from "react"
import styles from "./page.module.css"
import { useRouter } from "next/navigation"
import { getToken } from "../lib/auth"
import { createShortUrl } from "../lib/api"
import { useAuthReady } from "../lib/useAuth"

export default function HomePage() {
  const [longUrl, setLongUrl] = useState("")
  const [sampleShort, setSampleShort] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { ready, isLoggedIn } = useAuthReady()

  async function handleShorten(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSampleShort(null)
    if (!longUrl.trim()) return

    const token = getToken()
    if (!token) {
      router.push("/auth/login")
      return
    }

    const res = await createShortUrl(token, longUrl)
    if ((res as any)?.unauthorized) {
      alert("Session expired. Please log in again.")
      router.push("/auth/login")
      return
    }
    if ((res as any)?.data?.shortcode || (res as any)?.data?.shortCode) {
      const code = (res as any).data.shortcode ?? (res as any).data.shortCode
      setSampleShort(`http://localhost:8000/${code}`)
    } else if ((res as any)?.error) {
      setError(
        typeof (res as any).error === "string" ? (res as any).error : "Failed to shorten URL"
      )
    } else {
      setError("Failed to shorten URL")
    }
  }

  return (
    <div className={styles.rootBg}>
      <main className={styles.homeContainer}>
        <span className={styles.brand}>Zia's URL Shortener</span>
        <h1 className={styles.heading}>Shorten and share links, beautifully</h1>

        <form onSubmit={handleShorten} className={styles.shortenBox}>
          <input
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Paste your long URL here…"
            className={styles.shortenInput}
          />
          <div className={styles.shortenActions}>
            <button
              type="submit"
              className={`${styles.linkBtn} ${styles.shorten}`}
            >
              Shorten URL
            </button>
            <Link
              href="/shorten"
              className={`${styles.linkBtn} ${styles.login}`}
            >
              Advanced
            </Link>
          </div>
          {sampleShort && (
            <p className={styles.sampleMsg}>
              Success! Try: {" "}
              <a href={sampleShort} className={styles.sampleLink}>
                {sampleShort}
              </a>
            </p>
          )}
          {error && (
            <p className={styles.sampleMsg} style={{ color: "#d92029" }}>
              {error}
            </p>
          )}
        </form>

        {ready && !isLoggedIn && (
          <section className={styles.ctaBox}>
            <h3>Ready to simplify your links?</h3>
            <div className={styles.ctaActions}>
              <Link
                href="/auth/signup"
                className={`${styles.linkBtn} ${styles.signup}`}
              >
                Get Started
              </Link>
              <Link
                href="/auth/login"
                className={`${styles.linkBtn} ${styles.login}`}
              >
                Login
              </Link>
            </div>
          </section>
        )}

        <section className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔗</div>
            <h3>Custom short links</h3>
            <p>Create memorable custom aliases for your links.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Click tracking</h3>
            <p>Track performance and engagement over time.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛡️</div>
            <h3>Secure redirection</h3>
            <p>Reliable redirects with robust validation.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚙️</div>
            <h3>API support</h3>
            <p>Integrate shortening into your apps and workflows.</p>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>© 2025 Zia's URL Shortener</span>
          <nav>
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
        </footer>
      </main>
    </div>
  )
}
