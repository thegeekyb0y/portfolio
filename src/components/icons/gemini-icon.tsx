import Image from "next/image";

export function GeminiIcon() {
  return (
    <Image
      src="/icons/gemini.svg"
      alt="Gemini"
      width={20}
      height={20}
      className="shrink-0"
    />
  );
}
