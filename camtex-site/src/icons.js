// Small technical drawings shown beside the cursor when hovering a discipline.
// viewBox 0 0 200 140. `.acc` strokes are drawn in the accent colour.
export const DRAWINGS = {
  civil: `
    <path d="M10 90 L60 90 L80 70 L130 70 L150 90 L190 90"/>
    <path class="acc" d="M10 96 Q60 100 100 84 T190 96" stroke-dasharray="4 4"/>
    <circle cx="105" cy="104" r="9"/><circle cx="105" cy="104" r="6"/>
    <path d="M60 90 V112 M150 90 V112 M60 108 H150"/>
    <text x="10" y="20">SECTION A–A · GRADING</text><text x="92" y="128">Ø 18" RCP</text>`,
  structural: `
    <path d="M10 70 H190 M10 78 H190"/>
    <path d="M40 78 V118 M100 78 V118 M160 78 V118 M30 118 H50 M90 118 H110 M150 118 H170"/>
    <path class="acc" d="M10 70 Q40 58 70 70 Q100 58 130 70 Q160 58 190 70" />
    <path d="M10 50 V64 M190 50 V64 M10 57 H190"/>
    <text x="80" y="48">3 @ 60'-0"</text><text x="10" y="20">ELEVATION · GIRDER BRIDGE</text>`,
  cei: `
    <path d="M100 40 L70 120 M100 40 L130 120 M100 40 V120"/>
    <rect x="86" y="24" width="28" height="16"/><circle cx="100" cy="32" r="5"/>
    <path class="acc" d="M114 32 H190" stroke-dasharray="6 4"/>
    <path d="M176 22 V42 M184 22 V42"/>
    <text x="10" y="20">FIELD CHECK · ELEV 112.40</text><text x="140" y="60">HI = 5.12</text>`,
  traffic: `
    <path d="M10 60 H80 V10 M120 10 V60 H190 M10 90 H80 V130 M120 130 V90 H190"/>
    <path class="acc" d="M10 75 H70 M130 75 H190 M100 10 V50 M100 90 V130" stroke-dasharray="8 6"/>
    <circle cx="80" cy="60" r="4"/><circle cx="120" cy="90" r="4"/>
    <path d="M88 52 h24 v8 h-24 z"/>
    <text x="134" y="24">SIG. PLAN</text>`,
  land: `
    <rect x="12" y="20" width="176" height="104"/>
    <path d="M12 72 H188 M56 20 V72 M100 20 V72 M144 20 V72 M56 72 V124 M100 72 V124 M144 72 V124"/>
    <path class="acc" d="M100 20 V124" stroke-width="3"/>
    <text x="24" y="50">LOT 1</text><text x="68" y="50">LOT 2</text><text x="112" y="50">LOT 3</text><text x="156" y="50">LOT 4</text>
    <text x="24" y="102">60'</text>`,
  public: `
    <path d="M10 70 H190"/>
    <circle cx="40" cy="70" r="10"/><circle cx="110" cy="70" r="10"/><circle cx="175" cy="70" r="10"/>
    <path class="acc" d="M50 70 H100 M120 70 H165" stroke-width="3"/>
    <path d="M110 80 V125 M40 30 V60"/>
    <text x="10" y="20">STORM SEWER · PLAN</text><text x="56" y="62">S = 0.35%</text><text x="114" y="122">LATERAL</text>`,
  survey: `
    <path d="M60 50 L35 125 M60 50 L85 125 M60 50 V125"/>
    <rect x="48" y="36" width="24" height="14"/>
    <path class="acc" d="M72 43 L190 30"/>
    <path d="M182 22 V130 M178 40 h8 M178 60 h8 M178 80 h8"/>
    <circle cx="140" cy="110" r="2"/><circle cx="160" cy="98" r="2"/><circle cx="120" cy="120" r="2"/>
    <text x="10" y="20">BM 01 · 26°17'35" N</text>`,
  planning: `
    <path d="M14 120 Q50 60 110 90 T190 40" />
    <path d="M14 100 Q60 40 120 70 T190 20"/>
    <rect class="acc" x="30" y="24" width="50" height="34"/>
    <rect x="96" y="96" width="40" height="28"/><rect x="150" y="80" width="34" height="40"/>
    <text x="34" y="44">ZONE A</text><text x="10" y="134">MASTER PLAN · PHASE 1</text>`,
  landscape: `
    <circle cx="44" cy="44" r="22"/><circle cx="44" cy="44" r="3"/>
    <circle cx="150" cy="40" r="16"/><circle cx="150" cy="40" r="3"/>
    <circle cx="120" cy="104" r="20"/><circle cx="120" cy="104" r="3"/>
    <path class="acc" d="M0 130 Q60 70 100 80 T200 60" stroke-width="2.5"/>
    <path d="M0 136 Q60 78 100 88 T200 68"/>
    <text x="10" y="16">PLANTING PLAN</text>`,
  athletic: `
    <path d="M60 30 H140 A40 40 0 0 1 140 110 H60 A40 40 0 0 1 60 30 Z"/>
    <path d="M60 40 H140 A30 30 0 0 1 140 100 H60 A30 30 0 0 1 60 40 Z"/>
    <rect class="acc" x="60" y="48" width="80" height="44"/>
    <path d="M100 48 V92"/><circle cx="100" cy="70" r="8"/>
    <text x="10" y="16">400 M TRACK · FIELD</text>`,
};
