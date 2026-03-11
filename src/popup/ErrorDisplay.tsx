export function ErrorDisplay({ message }: { message: string | null }) {
  if (!message) return null

  return (
    <div
      style={{
        background: "#ff4444",
        color: "#fff",
        padding: "10px",
        textAlign: "center",
        fontSize: "12px",
        fontWeight: "bold",
        width: "100%",
        boxSizing: "border-box",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100
      }}>
      {message}
    </div>
  )
}
