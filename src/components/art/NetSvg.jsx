/** The animated "neural" web inside the logo mark: n nodes on a ring, spokes to the centre. */
export default function NetSvg({ nodes = 10, seed = 0 }) {
  const n = Math.max(5, Math.min(16, nodes))
  const pts = Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n + (i % 2 ? 0.1 : 0)
    const r = [90, 98, 84, 94][(i + seed) % 4]
    return [100 + Math.cos(a) * r, 100 + Math.sin(a) * r]
  })
  const f = (v) => v.toFixed(1)
  return (
    <svg className="neural" viewBox="0 0 200 200" aria-hidden="true">
      {pts.map((p, i) => {
        const q = pts[(i + 1) % n]
        const r2 = pts[(i + Math.floor(n / 2)) % n]
        return (
          <g key={`c${i}`}>
            <line x1={f(p[0])} y1={f(p[1])} x2={f(q[0])} y2={f(q[1])} className="syn2" />
            {i % 3 === 0 && <line x1={f(p[0])} y1={f(p[1])} x2={f(r2[0])} y2={f(r2[1])} className="syn3" />}
          </g>
        )
      })}
      {pts.map((p, i) => (
        <line key={`s${i}`} x1="100" y1="100" x2={f(p[0])} y2={f(p[1])} className="syn" style={{ animationDelay: `${(i * 0.2).toFixed(2)}s` }} />
      ))}
      {pts.map((p, i) => (
        <circle key={`n${i}`} cx={f(p[0])} cy={f(p[1])} r={i % 2 ? 3.2 : 4.4} className="nd" style={{ animationDelay: `${(i * 0.2).toFixed(2)}s` }} />
      ))}
    </svg>
  )
}
