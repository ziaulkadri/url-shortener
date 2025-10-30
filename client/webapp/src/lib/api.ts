const API_BASE = "http://localhost:8000";

export async function signup(email, password, firstname, lastname) {
  const res = await fetch(`${API_BASE}/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, firstname, lastname })
  });
  return await res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return await res.json();
}

export async function createShortUrl(token, url, code) {
  const res = await fetch(`${API_BASE}/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ url, code }),
  });
  if (res.status === 401) return { unauthorized: true };
  return await res.json();
}

export async function getMyUrls(token) {
  const res = await fetch(`${API_BASE}/my/urls`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (res.status === 401) return { unauthorized: true };
  return await res.json();
}

export async function deleteMyUrl(token, id) {
  const res = await fetch(`${API_BASE}/my/urls/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (res.status === 401) return { unauthorized: true };
  return await res.json();
}
