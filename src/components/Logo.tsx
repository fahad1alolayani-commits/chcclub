import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  lang?: "ar" | "en";
  light?: boolean;
}

export default function Logo({
  className = "",
  size = 50,
  showText = false,
  lang = "ar",
  light = false,
}: LogoProps) {
  // Exact brand colors matching the uploaded logo
  const blueColor = "#1CAADA"; // Keep signature blue bright
  const tealColor = "#56A8A7"; // Teal of the logo

  const svgContent = (
    <svg
      id="chc-logo-svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="inline-block flex-shrink-0"
    >
      {/* Top-Left Quadrant: Teal L-shape */}
      <path
        id="quad-tl"
        d="M 14 41 L 41 41 L 41 14"
        fill="none"
        stroke={tealColor}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top-Right Quadrant: Blue L-shape + Blue Dot */}
      <path
        id="quad-tr"
        d="M 86 41 L 59 41 L 59 14"
        fill="none"
        stroke={blueColor}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle id="dot-tr" cx="80" cy="20" r="9" fill={blueColor} />

      {/* Bottom-Left Quadrant: Blue L-shape + Blue Dot */}
      <path
        id="quad-bl"
        d="M 14 59 L 41 59 L 41 86"
        fill="none"
        stroke={blueColor}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle id="dot-bl" cx="20" cy="80" r="9" fill={blueColor} />

      {/* Bottom-Right Quadrant: Teal L-shape */}
      <path
        id="quad-br"
        d="M 86 59 L 59 59 L 59 86"
        fill="none"
        stroke={tealColor}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (!showText) {
    return <span className={`inline-flex ${className}`}>{svgContent}</span>;
  }

  // Text is stylized precisely to mimic the uploaded logo design
  return (
    <div
      id="chc-logo-wrapper"
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`flex items-center gap-3 text-right select-none ${className}`}
    >
      <div className="shrink-0 flex items-center justify-center">
        {svgContent}
      </div>
      <div className="flex flex-col justify-center text-right leading-none gap-0.5 select-none">
        {/* Line 1: نادي صحة المجتمع */}
        <span
          className={`font-sans font-black tracking-tight leading-tight text-xs sm:text-[13px] md:text-[15px] select-none ${
            light ? "text-white" : "text-[#56A8A7]"
          }`}
          style={{ fontFamily: '"Cairo", sans-serif' }}
        >
          نادي صحة المجتمع
        </span>

        {/* Line 2: بجامعة الملك سعود */}
        <span
          className={`font-sans font-bold tracking-normal leading-tight text-[9px] sm:text-[10px] md:text-[11px] select-none ${
            light ? "text-slate-200" : "text-[#56A8A7]/90"
          }`}
          style={{ fontFamily: '"Cairo", sans-serif' }}
        >
          بجامعة الملك سعود
        </span>

        {/* Line 3: Community Health Club */}
        <span
          className={`font-sans font-extrabold tracking-normal leading-tight text-[8px] sm:text-[9px] md:text-[10px] select-none ${
            light ? "text-slate-300/90" : "text-[#1CAADA]"
          }`}
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          Community Health Club
        </span>
      </div>
    </div>
  );
}
