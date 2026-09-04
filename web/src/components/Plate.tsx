/**
 * Art-direction slot.
 *
 * Renders a warm, palette-derived plate in place of photography so layout and
 * rhythm can be judged before images exist. Replace with <Image /> at launch —
 * the `brief` text is the shot note for whoever sources it.
 */
export default function Plate({
  brief,
  tone = "warm",
  className = "",
}: {
  brief: string;
  tone?: "warm" | "forest" | "lavender";
  className?: string;
}) {
  const tones = {
    warm: {
      base: "#ddd6c6",
      washes:
        "radial-gradient(120% 90% at 18% 12%, rgba(255,252,244,.95), transparent 58%), radial-gradient(90% 80% at 88% 96%, rgba(124,101,41,.34), transparent 62%), radial-gradient(70% 70% at 62% 40%, rgba(164,139,61,.16), transparent 70%)",
      label: "rgba(51,51,51,.50)",
    },
    forest: {
      base: "#123016",
      washes:
        "radial-gradient(110% 85% at 22% 8%, rgba(198,169,79,.30), transparent 60%), radial-gradient(95% 90% at 90% 92%, rgba(4,20,7,.85), transparent 65%)",
      label: "rgba(242,240,234,.55)",
    },
    lavender: {
      base: "#e2e0ee",
      washes:
        "radial-gradient(115% 90% at 12% 18%, rgba(255,255,255,.92), transparent 60%), radial-gradient(90% 85% at 92% 90%, rgba(124,101,41,.20), transparent 64%)",
      label: "rgba(51,51,51,.48)",
    },
  }[tone];

  return (
    <div
      className={`relative overflow-hidden isolate ${className}`}
      style={{ backgroundColor: tones.base, backgroundImage: tones.washes }}
      role="img"
      aria-label={`Photography placeholder: ${brief}`}
    >
      {/* film grain, keeps the plate from reading as flat CSS */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.10] mix-blend-overlay" aria-hidden="true">
        <filter id={`g-${tone}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#g-${tone})`} />
      </svg>

      <span
        className="absolute bottom-4 left-5 right-5 text-[10px] leading-snug tracking-[0.14em] uppercase"
        style={{ color: tones.label }}
      >
        {brief}
      </span>
    </div>
  );
}
