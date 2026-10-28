/**
 * What the monitor shows in each hero picture. All drawn inside the screen area
 * (x 126..448, y 78..292) in white on the screen gradient, so they work in both themes.
 */
const W = '#fff'
const T = { fill: W, opacity: 0.85 }

function Robot() {
  return (
    <g className="scn-bot">
      <circle cx="287" cy="190" r="86" fill="url(#scnGlow)" opacity=".22" />
      <path d="M287 98v16" stroke="var(--scn-bot)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="287" cy="96" r="7" fill="var(--scn-accent)" />
      <rect x="233" y="112" width="108" height="86" rx="30" fill="var(--scn-bot)" />
      <rect x="247" y="128" width="80" height="52" rx="22" fill="var(--scn-face)" />
      <g className="scn-eyes" fill="var(--scn-eye)">
        <ellipse cx="270" cy="150" rx="6" ry="8" />
        <ellipse cx="304" cy="150" rx="6" ry="8" />
      </g>
      <path d="M277 168q10 9 20 0" stroke="var(--scn-eye)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <rect x="245" y="204" width="84" height="74" rx="26" fill="var(--scn-bot)" />
      <path d="M246 224q-34 6-40 36M328 224q34 6 40 36" stroke="var(--scn-bot)" strokeWidth="18" strokeLinecap="round" fill="none" />
      <circle className="scn-orb" cx="204" cy="268" r="17" fill="var(--scn-orb)" />
      <circle className="scn-orb" cx="370" cy="268" r="17" fill="var(--scn-orb)" style={{ animationDelay: '.8s' }} />
    </g>
  )
}

function Dashboard() {
  const bars = [46, 70, 54, 92, 66, 104, 80]
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={146 + i * 100} y="96" width="88" height="46" rx="9" fill={W} opacity=".16" />
          <rect x={156 + i * 100} y="108" width="34" height="6" rx="3" {...T} />
          <rect x={156 + i * 100} y="122" width="52" height="10" rx="5" fill={W} />
        </g>
      ))}
      <rect x="146" y="154" width="188" height="122" rx="10" fill={W} opacity=".14" />
      {bars.map((h, i) => (
        <rect key={i} className="scn-bar" x={162 + i * 24} y={262 - h} width="14" height={h} rx="5" fill={W} opacity={0.9} style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
      <rect x="346" y="154" width="86" height="122" rx="10" fill={W} opacity=".14" />
      <circle cx="389" cy="206" r="26" fill="none" stroke={W} strokeOpacity=".3" strokeWidth="11" />
      <circle className="scn-ring" cx="389" cy="206" r="26" fill="none" stroke={W} strokeWidth="11" strokeDasharray="110 164" strokeLinecap="round" transform="rotate(-90 389 206)" />
      <rect x="362" y="248" width="54" height="6" rx="3" {...T} />
    </g>
  )
}

function Phone() {
  return (
    <g>
      <rect x="236" y="90" width="104" height="192" rx="18" fill="var(--scn-face)" stroke={W} strokeOpacity=".7" strokeWidth="3" />
      <rect x="276" y="97" width="24" height="5" rx="2.5" fill={W} opacity=".6" />
      <rect x="250" y="116" width="76" height="40" rx="10" fill={W} opacity=".9" />
      <rect x="258" y="126" width="40" height="6" rx="3" fill="var(--scn-s1)" />
      <rect x="258" y="138" width="56" height="6" rx="3" fill="var(--scn-s1)" opacity=".5" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="262" cy={178 + i * 30} r="9" fill={W} opacity=".85" />
          <rect x="278" y={172 + i * 30} width={46 - i * 8} height="6" rx="3" fill={W} opacity=".85" />
          <rect x="278" y={184 + i * 30} width="30" height="5" rx="2.5" fill={W} opacity=".45" />
        </g>
      ))}
      <g className="scn-float b">
        <rect x="146" y="120" width="78" height="30" rx="12" fill={W} opacity=".92" />
        <rect x="156" y="131" width="50" height="6" rx="3" fill="var(--scn-s1)" />
        <rect x="352" y="170" width="80" height="30" rx="12" fill={W} opacity=".3" />
        <rect x="362" y="181" width="52" height="6" rx="3" fill={W} />
      </g>
    </g>
  )
}

function Web() {
  return (
    <g>
      <rect x="146" y="94" width="288" height="188" rx="10" fill={W} opacity=".14" />
      <rect x="146" y="94" width="288" height="22" rx="10" fill={W} opacity=".22" />
      {[0, 1, 2].map((i) => <circle key={i} cx={160 + i * 12} cy="105" r="3.5" fill={W} opacity=".8" />)}
      <rect x="162" y="128" width="130" height="14" rx="7" fill={W} />
      <rect x="162" y="150" width="100" height="8" rx="4" {...T} />
      <rect x="162" y="166" width="76" height="22" rx="11" fill="var(--scn-bot)" />
      <rect x="318" y="126" width="102" height="70" rx="10" fill={W} opacity=".28" />
      <circle cx="352" cy="150" r="12" fill={W} opacity=".9" />
      <path d="M326 188l22-20 14 12 16-18 34 26z" fill={W} opacity=".75" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={162 + i * 92} y="208" width="80" height="62" rx="9" fill={W} opacity=".2" />
          <rect x={172 + i * 92} y="220" width="36" height="6" rx="3" fill={W} />
          <rect x={172 + i * 92} y="234" width="58" height="5" rx="2.5" fill={W} opacity=".5" />
          <rect x={172 + i * 92} y="246" width="44" height="5" rx="2.5" fill={W} opacity=".5" />
        </g>
      ))}
    </g>
  )
}

function Shield() {
  return (
    <g>
      <circle cx="287" cy="186" r="92" fill="url(#scnGlow)" opacity=".2" />
      <path d="M287 98l70 24v58c0 44-30 72-70 90-40-18-70-46-70-90v-58z" fill={W} opacity=".92" />
      <path d="M287 112l56 19v49c0 36-24 60-56 75-32-15-56-39-56-75v-49z" fill="var(--scn-bot)" />
      <path className="scn-check" d="M259 184l20 20 38-42" stroke={W} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {[[158, 130], [396, 150], [166, 240], [404, 238]].map(([x, y], i) => (
        <g key={i} opacity=".85">
          <rect x={x - 12} y={y - 4} width="24" height="18" rx="4" fill={W} />
          <path d={`M${x - 7} ${y - 4}v-5a7 7 0 0 1 14 0v5`} stroke={W} strokeWidth="3" fill="none" />
        </g>
      ))}
    </g>
  )
}

function Team() {
  const p = [[287, 150, 28], [196, 214, 22], [378, 214, 22], [236, 262, 18], [338, 262, 18]]
  return (
    <g>
      <g stroke={W} strokeWidth="2.5" opacity=".5" fill="none">
        <path d="M287 150L196 214M287 150L378 214M196 214L236 262M378 214L338 262M236 262L338 262M196 214L378 214" />
      </g>
      {p.map(([x, y, r], i) => (
        <g key={i} className="scn-orb" style={{ animationDelay: `${i * 0.35}s` }}>
          <circle cx={x} cy={y} r={r + 6} fill={W} opacity=".18" />
          <circle cx={x} cy={y} r={r} fill={W} opacity=".95" />
          <circle cx={x} cy={y - r * 0.2} r={r * 0.34} fill="var(--scn-s1)" />
          <path d={`M${x - r * 0.62} ${y + r * 0.7}q${r * 0.62} -${r * 0.9} ${r * 1.24} 0`} fill="var(--scn-s1)" />
        </g>
      ))}
      <rect x="146" y="96" width="70" height="22" rx="11" fill={W} opacity=".25" />
      <rect x="156" y="104" width="38" height="6" rx="3" fill={W} />
    </g>
  )
}

function Tooth() {
  return (
    <g>
      <circle cx="287" cy="186" r="92" fill="url(#scnGlow)" opacity=".2" />
      <path d="M287 106c-16-14-52-12-58 18-4 22 10 34 14 56 4 24 4 66 20 66 14 0 10-40 24-40s10 40 24 40c16 0 16-42 20-66 4-22 18-34 14-56-6-30-42-32-58-18z" fill={W} />
      <path d="M255 132q10-10 24-6" stroke="var(--scn-bot)" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".6" />
      <g className="scn-orb"><path d="M372 120l5 14 14 5-14 5-5 14-5-14-14-5 14-5z" fill={W} /></g>
      <g className="scn-orb" style={{ animationDelay: '.7s' }}><path d="M190 238l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill={W} opacity=".9" /></g>
      <path d="M170 160q40-30 80-20" stroke={W} strokeWidth="3" strokeDasharray="5 6" fill="none" opacity=".6" />
    </g>
  )
}

function Funnel() {
  return (
    <g>
      <path d="M170 100h232l-60 78v70l-40 22v-92z" fill={W} opacity=".92" />
      <path d="M170 100h232l-12 16H182z" fill="var(--scn-bot)" />
      <path d="M196 140h180l-30 36H226z" fill="var(--scn-bot)" opacity=".6" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} className="scn-orb" cx={196 + i * 40} cy={88 + (i % 2) * 8} r="7" fill={W} style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      <rect x="352" y="204" width="76" height="52" rx="10" fill={W} opacity=".2" />
      <rect x="362" y="216" width="36" height="8" rx="4" fill={W} />
      <rect x="362" y="232" width="54" height="6" rx="3" fill={W} opacity=".5" />
    </g>
  )
}

function Chat() {
  return (
    <g>
      <rect x="152" y="98" width="150" height="48" rx="16" fill={W} opacity=".92" />
      <rect x="166" y="112" width="96" height="7" rx="3.5" fill="var(--scn-s1)" />
      <rect x="166" y="126" width="64" height="7" rx="3.5" fill="var(--scn-s1)" opacity=".5" />
      <rect x="272" y="160" width="150" height="48" rx="16" fill="var(--scn-bot)" />
      <rect x="286" y="174" width="96" height="7" rx="3.5" fill={W} />
      <rect x="286" y="188" width="70" height="7" rx="3.5" fill={W} opacity=".6" />
      <rect x="152" y="222" width="120" height="44" rx="16" fill={W} opacity=".92" />
      {[0, 1, 2].map((i) => <circle key={i} className="scn-orb" cx={188 + i * 22} cy="244" r="6" fill="var(--scn-s1)" style={{ animationDelay: `${i * 0.25}s` }} />)}
      <g opacity=".9"><rect x="344" y="226" width="78" height="52" rx="8" fill={W} opacity=".25" /><path d="M344 232l39 26 39-26" stroke={W} strokeWidth="3" fill="none" strokeLinecap="round" /></g>
    </g>
  )
}

function Code() {
  return (
    <g>
      <rect x="146" y="96" width="288" height="182" rx="10" fill="var(--scn-face)" opacity=".7" />
      <path d="M170 150l-24 22 24 22M404 150l24 22-24 22" stroke={W} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity=".0" />
      {[[0, 60, 1], [1, 100, 2], [2, 70, 2], [3, 120, 3], [4, 54, 3], [5, 90, 2], [6, 40, 1], [7, 110, 2]].map(([i, w, ind]) => (
        <rect key={i} className="scn-code-line" x={164 + ind * 16} y={110 + i * 20} width={w} height="7" rx="3.5" fill={i % 3 === 0 ? 'var(--scn-orb)' : W} opacity={i % 3 === 0 ? 0.95 : 0.7} style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
      <path d="M372 150l-26 24 26 24M398 150l26 24-26 24M392 146l-14 56" stroke={W} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  )
}

function Roadmap() {
  const pts = [[168, 244], [240, 200], [312, 218], [380, 146]]
  return (
    <g>
      <path d="M168 244L240 200 312 218 380 146" stroke={W} strokeWidth="4" strokeDasharray="8 8" fill="none" opacity=".7" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="20" fill={W} opacity=".2" />
          <circle cx={x} cy={y} r="11" fill={W} />
          <rect x={x - 26} y={y + 24} width="52" height="6" rx="3" fill={W} opacity=".6" />
        </g>
      ))}
      <path d="M380 146v-34l30 10-30 12" fill="var(--scn-orb)" stroke={W} strokeWidth="3" strokeLinejoin="round" />
      <rect x="146" y="98" width="86" height="22" rx="11" fill={W} opacity=".25" />
      <rect x="156" y="106" width="46" height="6" rx="3" fill={W} />
    </g>
  )
}

const MAP = { robot: Robot, dashboard: Dashboard, phone: Phone, web: Web, shield: Shield, team: Team, tooth: Tooth, funnel: Funnel, chat: Chat, code: Code, roadmap: Roadmap }

export default function SceneScreen({ variant }) {
  const View = MAP[variant] || Robot
  return <View />
}
