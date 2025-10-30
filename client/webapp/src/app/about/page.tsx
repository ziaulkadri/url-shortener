import styles from "./page.module.css"

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>About Zia's URL Shortener</h1>
      <p className={styles.subtitle}>A lightweight link platform for fast sharing</p>
      <p className={styles.p}>
        Zia's URL Shortener helps you turn long, hard-to-share links into clean, memorable short links.
        The app is built with Next.js on the frontend and Node/Express/Drizzle on the backend.
      </p>
      <p className={styles.p}>
        Core features include custom short codes, secure redirection, and an authenticated dashboard to
        manage your links. This project is designed for simplicity, performance, and clarity.
      </p>
      <p className={styles.p}>
        Want to contribute or suggest features? Reach out or open an issue on our GitHub.
      </p>
    </main>
  )
}
