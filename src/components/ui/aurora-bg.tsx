export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dark grey base — matches Simon's dark neutral */}
      <div className="absolute inset-0 bg-[#111118]" />

      {/* Blob 1 — left side, violet/purple */}
      <div
        style={{
          position: "absolute",
          width: "60vw",
          height: "60vw",
          top: "-10%",
          left: "-20%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, #7c3aed 0%, #4f1db5 40%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.25,
          animation: "blob-left 20s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Blob 2 — right side, teal/emerald */}
      <div
        style={{
          position: "absolute",
          width: "55vw",
          height: "55vw",
          bottom: "-15%",
          right: "-15%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, #0d9488 0%, #065f46 40%, transparent 70%)",
          filter: "blur(90px)",
          opacity: 0.2,
          animation: "blob-right 26s ease-in-out infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}
