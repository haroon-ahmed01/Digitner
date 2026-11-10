/** Static SVG diagrams for the AI Academy pages. Styles live in styles/academy.css (.ac-diagram, .ac-nsviz). */

/** Instructions + knowledge + skills feed an AI assistant, which drafts replies the owner approves. */
export function AgentDiagram() {
  return (
    <div className="ac-diagram">
      <svg viewBox="0 0 560 380" role="img" aria-labelledby="dg-t dg-d">
        <title id="dg-t">How the programme assistant works</title>
        <desc id="dg-d">Instructions, knowledge and skills feed an AI assistant, which drafts quotes, replies and reminders that the owner approves before sending.</desc>
        <path className="ac-wire" d="M150 70 C 210 70, 210 190, 240 190"/><path className="ac-flow" d="M150 70 C 210 70, 210 190, 240 190"/>
        <path className="ac-wire" d="M150 190 L 240 190"/><path className="ac-flow" d="M150 190 L 240 190"/>
        <path className="ac-wire" d="M150 310 C 210 310, 210 190, 240 190"/><path className="ac-flow" d="M150 310 C 210 310, 210 190, 240 190"/>
        <path className="ac-wire" d="M380 190 C 410 190, 410 90, 420 90"/><path className="ac-flow ac-out" d="M380 190 C 410 190, 410 90, 420 90"/>
        <path className="ac-wire" d="M380 190 L 420 190"/><path className="ac-flow ac-out" d="M380 190 L 420 190"/>
        <path className="ac-wire" d="M380 190 C 410 190, 410 290, 420 290"/><path className="ac-flow ac-out" d="M380 190 C 410 190, 410 290, 420 290"/>
        <g className="ac-node"><rect x="10" y="40" width="140" height="60" rx="10"/><text x="24" y="66">Instructions</text><text className="ac-sub" x="24" y="86">Job, tone, rules</text></g>
        <g className="ac-node"><rect x="10" y="160" width="140" height="60" rx="10"/><text x="24" y="186">Knowledge</text><text className="ac-sub" x="24" y="206">Prices, FAQs, terms</text></g>
        <g className="ac-node"><rect x="10" y="280" width="140" height="60" rx="10"/><text x="24" y="306">Skills</text><text className="ac-sub" x="24" y="326">Quotes, reminders</text></g>
        <g className="ac-node ac-hub"><rect x="240" y="150" width="140" height="80" rx="14"/><text x="258" y="184">Your AI</text><text x="258" y="202">assistant</text><text className="ac-sub" x="258" y="220">Free Gem / Project</text></g>
        <g className="ac-node"><rect x="420" y="62" width="130" height="56" rx="10"/><text x="434" y="86">Quotation</text><text className="ac-sub" x="434" y="104">GST included</text></g>
        <g className="ac-node"><rect x="420" y="162" width="130" height="56" rx="10"/><text x="434" y="186">WhatsApp reply</text><text className="ac-sub" x="434" y="204">You approve</text></g>
        <g className="ac-node"><rect x="420" y="262" width="130" height="56" rx="10"/><text x="434" y="286">Reminder</text><text className="ac-sub" x="434" y="304">Day 3 · 7 · 15</text></g>
      </svg>
    </div>
  )
}

/** Three input metrics flowing into one North Star metric. */
export function NorthStarViz() {
  return (
    <div className="ac-nsviz" aria-hidden="true">
      <svg viewBox="0 0 420 340">
        <path className="ac-nsflow" d="M70 60 C 160 60, 170 170, 210 170"/><path className="ac-nsflow ac-f2" d="M70 170 L 210 170"/><path className="ac-nsflow ac-f3" d="M70 280 C 160 280, 170 170, 210 170"/>
        <path className="ac-nsflow ac-f4" d="M250 170 L 340 170"/>
        <g className="ac-nsin"><rect x="0" y="38" width="140" height="44" rx="22"/><text x="70" y="65">ICP leads / week</text></g>
        <g className="ac-nsin ac-i2"><rect x="0" y="148" width="140" height="44" rx="22"/><text x="70" y="175">Conversion rate</text></g>
        <g className="ac-nsin ac-i3"><rect x="0" y="258" width="140" height="44" rx="22"/><text x="70" y="285">Repeat purchases</text></g>
        <g className="ac-nsstar" transform="translate(230 170)"><circle className="ac-nshalo" r="46"/><path d="M0 -34 L9 -11 L34 -11 L14 4 L21 30 L0 15 L-21 30 L-14 4 L-34 -11 L-9 -11 Z"/></g>
        <g className="ac-nsout"><rect x="300" y="146" width="112" height="48" rx="12"/><text x="356" y="166">North Star</text><text className="ac-sm" x="356" y="183">Repeat customers</text></g>
      </svg>
    </div>
  )
}
