"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../../lib/api";
import styles from "./signup.module.css";

export default function SignupPage() {
  const [form, setForm] = useState({ email: "", password: "", firstname: "", lastname: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await signup(form.email, form.password, form.firstname, form.lastname);
    if (res.data?.userId) {
      window.dispatchEvent(new Event("storage"));
      router.push('/auth/login');
      // If you decide to log users in after signup, emulate login with setToken
      // setToken(res.token); window.dispatchEvent(new Event("storage")); router.push('/dashboard');
    } else {
      setError(res.error?.message || "Signup failed");
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.heading}>Sign Up</h1>
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
        <input
          required
          placeholder="First name"
          value={form.firstname}
          onChange={e => setForm(f => ({ ...f, firstname: e.target.value }))}
          className={styles.input}
        />
        <input
          required
          placeholder="Last name"
          value={form.lastname}
          onChange={e => setForm(f => ({ ...f, lastname: e.target.value }))}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Sign Up</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
