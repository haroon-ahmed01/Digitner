import { useCallback, useEffect, useState } from 'react'
import { DEMOS, DEMO_ORDER } from '@/data/academy'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

const reduced = prefersReducedMotion()

/**
 * One tab's content. With `animate` the prompt is typed, the AI "thinks", then the result appears; otherwise
 * everything is shown straight away. When a result is on screen and `auto` is on, `onNext` fires after 5 s.
 * The parent remounts this (via `key`) whenever the tab or mode changes, so the state always starts fresh.
 */
function DemoPane({ k, animate, auto, onNext }) {
  const d = DEMOS[k]
  const live = animate && !reduced
  const [n, setN] = useState(live ? 0 : d.p.length) // characters of the prompt typed so far
  const [phase, setPhase] = useState(live ? 'typing' : 'done') // typing | thinking | done

  useEffect(() => {
    if (!live) return
    let i = 0
    let timer
    const type = () => {
      i += 2
      setN(Math.min(i, d.p.length))
      if (i < d.p.length) timer = setTimeout(type, 22)
      else {
        setPhase('thinking')
        timer = setTimeout(() => setPhase('done'), 700)
      }
    }
    timer = setTimeout(type, 22)
    return () => clearTimeout(timer)
  }, [live, d.p])

  useEffect(() => {
    if (phase !== 'done' || !auto || reduced) return
    const timer = setTimeout(onNext, 5000)
    return () => clearTimeout(timer)
  }, [phase, auto, onNext])

  return (
    <>
      <div className="ac-prog" aria-hidden="true">
        {phase === 'done' && auto && !reduced && <i className="ac-run" />}
      </div>
      <div className="ac-pane" role="tabpanel" aria-labelledby={`ac-t-${k}`}>
        <div>
          <div className="ac-who">You type</div>
          <div className="ac-prompt">
            {d.p.slice(0, n)}
            {phase === 'typing' && <span className="ac-caret" />}
          </div>
        </div>
        <div>
          <div className="ac-who">AI gives you</div>
          {phase === 'done' ? (
            <div className="ac-out" dangerouslySetInnerHTML={{ __html: d.o }} />
          ) : (
            <div className="ac-out ac-thinking">{phase === 'thinking' ? 'Thinking…' : ''}</div>
          )}
        </div>
        {phase === 'done' && <span className="ac-saved">{d.s}</span>}
      </div>
    </>
  )
}

/**
 * "From prompt to result": plays the three example tabs one after another by itself.
 * Clicking a tab stops the auto-play and shows that tab straight away.
 */
export default function DemoCard() {
  const [view, setView] = useState({ k: 'ops', animate: false })
  const [auto, setAuto] = useState(true)

  const next = useCallback(
    () => setView((v) => ({ k: DEMO_ORDER[(DEMO_ORDER.indexOf(v.k) + 1) % DEMO_ORDER.length], animate: true })),
    [],
  )
  const pick = (key) => {
    setAuto(false)
    setView({ k: key, animate: false })
  }

  return (
    <div className="ac-card" aria-label="Example prompts from the programme">
      <div className="ac-tabs" role="tablist">
        {DEMO_ORDER.map((key) => (
          <button className="ac-tab" role="tab" type="button" aria-selected={view.k === key} id={`ac-t-${key}`} key={key} onClick={() => pick(key)}>
            {DEMOS[key].tab}
          </button>
        ))}
      </div>
      <DemoPane key={`${view.k}-${view.animate}`} k={view.k} animate={view.animate} auto={auto} onNext={next} />
    </div>
  )
}
