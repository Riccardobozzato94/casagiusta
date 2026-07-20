"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        textAlign: "center",
        backgroundColor: "#0f172a",
        color: "#f8fafc",
      }}
    >
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>&#x26A0;&#xFE0F;</div>
      <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>
        Qualcosa non ha funzionato
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px", maxWidth: "400px" }}>
        Si &egrave; verificato un errore imprevisto. Il nostro team &egrave; stato notificato.
      </p>
      <button
        onClick={reset}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          borderRadius: "8px",
          backgroundColor: "#14b8a6",
          color: "#0f172a",
          padding: "12px 24px",
          fontWeight: 700,
          fontSize: "14px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Riprova
      </button>
    </div>
  );
}
