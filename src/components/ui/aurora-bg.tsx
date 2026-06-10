export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base static gradient — #282E30 center → #13161E outer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,oklch(0.22_0.012_200)_0%,oklch(0.12_0.018_260)_100%)]" />

      {/* Blob 1 — top left, large violet */}
      <div
        className="absolute rounded-full opacity-[0.18]"
        style={{
          width: "65vw",
          height: "65vw",
          top: "-15%",
          left: "-10%",
          background:
            "radial-gradient(circle, oklch(0.558 0.243 293) 0%, transparent 70%)",
          filter: "blur(72px)",
          animation: "aurora-1 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Blob 2 — bottom right, deeper violet */}
      <div
        className="absolute rounded-full opacity-[0.14]"
        style={{
          width: "55vw",
          height: "55vw",
          bottom: "-20%",
          right: "-10%",
          background:
            "radial-gradient(circle, oklch(0.45 0.22 280) 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "aurora-2 36s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Blob 3 — center, subtle indigo drift */}
      <div
        className="absolute rounded-full opacity-[0.09]"
        style={{
          width: "40vw",
          height: "40vw",
          top: "30%",
          left: "35%",
          background:
            "radial-gradient(circle, oklch(0.62 0.20 263) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "aurora-3 44s ease-in-out infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}
