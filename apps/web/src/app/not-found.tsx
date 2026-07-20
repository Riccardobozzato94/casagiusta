export const dynamic = "force-dynamic";

export default function NotFound() {
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
      <div
        style={{
          fontSize: "96px",
          fontWeight: 800,
          lineHeight: 1,
          marginBottom: "8px",
          color: "#14b8a6",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: 700,
          marginBottom: "8px",
        }}
      >
        Pagina non trovata
      </h1>
      <p
        style={{
          color: "#94a3b8",
          marginBottom: "8px",
          maxWidth: "400px",
        }}
      >
        La pagina che cerchi non esiste o &egrave; stata spostata.
      </p>
      <a
        href="/"
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
          textDecoration: "none",
        }}
      >
        Torna alla home
      </a>
    </div>
  );
}
