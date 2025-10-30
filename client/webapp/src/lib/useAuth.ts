import { useEffect, useState } from "react"
import { getToken } from "./auth"

export function useAuthReady() {
  const [ready, setReady] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Run only on client after hydration
    setIsLoggedIn(!!getToken())
    setReady(true)

    const onStorage = () => setIsLoggedIn(!!getToken())
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  return { ready, isLoggedIn }
}
