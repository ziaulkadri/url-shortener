import styles from "./page.module.css"

export default function PrivacyPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.subtitle}>Last updated: 2025-01-01</p>

      <section className={styles.section}>
        <h2 className={styles.h2}>Overview</h2>
        <p className={styles.p}>
          We respect your privacy. Zia's URL Shortener stores only the data needed to
          operate the service, such as your account details and the URLs you shorten.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Data We Collect</h2>
        <ul className={styles.list}>
          <li>Account information (email, name)</li>
          <li>Shortened URLs and basic metadata (created time)</li>
          <li>Authentication tokens for secure access</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>How We Use Data</h2>
        <ul className={styles.list}>
          <li>To authenticate you and secure your links</li>
          <li>To display and manage your URLs in the dashboard</li>
          <li>To improve the product experience</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Contact</h2>
        <p className={styles.p}>
          Questions? Reach out via our <a className={styles.link} href="/docs">Docs</a> page or the project repository.
        </p>
      </section>
    </main>
  )
}
