interface HelloCardProps {
  message: string;
  loading: boolean;
  error: string | null;
}

export default function HelloCard({ message, loading, error }: HelloCardProps) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
      <p>{message}</p>
    </div>
  );
}
