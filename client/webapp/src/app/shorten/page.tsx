"use client";
import { useState, useEffect } from "react";
import { getToken } from "../../lib/auth";
import { createShortUrl } from "../../lib/api";
import { useRouter } from "next/navigation";
import styles from "./shorten.module.css";

export default function ShortenPage() {
  const [form, setForm] = useState({ url: "", code: "" });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) {
      router.replace("/auth/login");
      return;
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    const token = getToken();
    if (!token) {
      setError("You must be logged in.");
      router.push('/auth/login');
      return;
    }
    const res = await createShortUrl(token, form.url, form.code);
    if (res.data) {
      setResult(res.data);
    } else {
      setError(res.error?.message || "Error creating short url.");
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.heading}>Shorten a URL</h1>
        <input
          required
          placeholder="Long URL"
          value={form.url}
          onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
          className={styles.input}
        />
        <input
          placeholder="Custom shortcode (optional)"
          value={form.code}
          onChange={e => setForm(f => ({ ...f, code: e.target.value }))}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Shorten</button>
        {result && (
          <div className={styles.result}>
            <span>Short URL: </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`http://localhost:8000/${result.shortcode}`}
              className={styles.link}
            >{`http://localhost:8000/${result.shortcode}`}</a>
          </div>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
