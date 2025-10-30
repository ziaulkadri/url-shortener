"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { login } from "../../../lib/api";
import { setToken } from "../../../lib/auth";
import styles from "./login.module.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await login(form.email, form.password);
    if (res.token) {
      setToken(res.token);
      window.dispatchEvent(new Event("storage"));
      router.push('/dashboard');
    } else {
      setError(res.error?.message || "Login failed");
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.heading}>Login</h1>
        <input
          required
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className={styles.input}
        />
        <input
          required
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Login</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
