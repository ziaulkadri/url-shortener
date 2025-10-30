"use client";
import Link from "next/link";
import { removeToken } from "../lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useAuthReady } from "../lib/useAuth";

export default function Navbar() {
  const { ready, isLoggedIn } = useAuthReady();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!ready) setMenuOpen(false);
  }, [ready]);

  function handleLogout() {
    removeToken();
    setMenuOpen(false);
    router.push("/auth/login");
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftGroup}>
        <button
          className={styles.hamburger}
          aria-label="Menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <Link href="/" className={styles.siteName}>
          Zia's URL Shortener
        </Link>
      </div>
      <div className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/docs" className={styles.link}>Docs</Link>
        {ready && (!isLoggedIn ? (
          <>
            <Link href="/auth/signup" className={styles.link}>Sign Up</Link>
            <Link href="/auth/login" className={styles.link}>Login</Link>
          </>
        ) : (
          <>
            <Link href="/shorten" className={styles.link}>Shorten</Link>
            <Link href="/dashboard" className={styles.link}>My URLs</Link>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          </>
        ))}
      </div>
    </nav>
  );
}
