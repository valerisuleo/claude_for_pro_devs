import { useEffect, useState } from "react";
import HelloCard from "./components/HelloCard";

export default function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ message: string }>;
      })
      .then((data) => setMessage(data.message))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "4rem auto", padding: "0 1rem" }}>
      <h1>Fullstack Bun App</h1>
      <p>React + Vite + Express + TypeScript, powered by Bun</p>
      <HelloCard message={message} loading={loading} error={error} />
    </main>
  );
}
