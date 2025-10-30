"use client";
import { useState, useEffect } from "react";
import { getMyUrls, deleteMyUrl } from "../../lib/api";
import { getToken } from "../../lib/auth";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const [urls, setUrls] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/auth/login");
      return;
    }
    getMyUrls(token).then(res => {
      if ((res as any)?.unauthorized) {
        alert("Session expired. Please log in again.");
        router.replace("/auth/login");
        return;
      }
      setUrls((res as any).data || []);
    }).catch(() => setError("Failed to fetch URLs"));
  }, [router]);

  async function handleDelete(id: string) {
    const token = getToken();
    if (!token) {
      router.replace("/auth/login");
      return;
    }
    try {
      setDeletingId(id);
      const res = await deleteMyUrl(token, id);
      if ((res as any)?.unauthorized) {
        alert("Session expired. Please log in again.");
        router.replace("/auth/login");
        return;
      }
      if ((res as any)?.status === "deleted") {
        setUrls(prev => prev.filter(u => u.id !== id));
      } else {
        setError((res as any)?.error || "Failed to delete URL");
      }
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>My URLs</h1>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.tableWrapper}>
          <table className={styles.myTable}>
            <thead>
              <tr>
                <th>Short Code</th>
                <th>Target URL</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url.id}>
                  <td>
                    <a href={`http://localhost:8000/${url.shortCode}`} target="_blank" rel="noopener noreferrer" className={styles.shortLink}>
                      {url.shortCode}
                    </a>
                  </td>
                  <td className={styles.shortLink}>{url.targetUrl}</td>
                  <td className={styles.date}>{url.createdAt ? new Date(url.createdAt).toLocaleString() : ""}</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      onClick={() => handleDelete(url.id)}
                      disabled={deletingId === url.id}
                      className="delete-btn"
                      style={{
                        background: deletingId === url.id ? "#cbd5e1" : "#ef4444",
                        color: "#fff",
                        border: 0,
                        padding: "6px 12px",
                        borderRadius: 6,
                        cursor: deletingId === url.id ? "not-allowed" : "pointer"
                      }}
                    >
                      {deletingId === url.id ? "Deleting…" : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
