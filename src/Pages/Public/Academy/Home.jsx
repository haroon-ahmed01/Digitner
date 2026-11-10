import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import { View } from '@/components/blocks/Hero'
import HeroOrbit from '@/components/academy/HeroOrbit'
import DemoCard from '@/components/academy/DemoCard'
import { PromptBand, RunningTrack } from '@/components/academy/Strips'
import { PATHS } from '@/constant/routes'
import { TYPED_WORDS } from '@/data/academy'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

/** "AI for business" → deleted letter by letter → next phrase typed in, forever. Decorative. */
function TypedWord() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let wi = 0
    let timer
    const cycle = () => {
      const word = TYPED_WORDS[wi]
      let i = word.length
      const erase = () => {
        if (i >= 0) {
          el.textContent = word.slice(0, i--)
          timer = setTimeout(erase, 35)
          return
        }
        wi = (wi + 1) % TYPED_WORDS.length
        const next = TYPED_WORDS[wi]
        let j = 0
        const add = () => {
          el.textContent = next.slice(0, ++j)
          timer = setTimeout(j < next.length ? add : cycle, j < next.length ? 70 : 2200)
        }
        add()
      }
      erase()
    }
    timer = setTimeout(cycle, 2200)
    return () => clearTimeout(timer)
  }, [])
  return <b ref={ref}>{TYPED_WORDS[0]}</b>
}

export default function AcademyHome() {
  return (
    <View>
      <Seo
        title="Digitner AI Academy"
        description="Hands-on AI programmes for business owners and teams. Learn by doing, with mentors who build AI for real businesses every day. Live workshops: AI Growth Blueprint and AI Business Playbook."
        path={PATHS.academy}
      />

      <div className="ac-ground">
        <div className="ac-wrap ac-hero">
          <div className="ac-copy">
            <span className="ac-pill">
              <i />
              Now running · 2 live workshops for businesses
            </span>
            <h1 className="ac-h1">
              <span>
                <span className="ac-nw">
                  Learn<i className="ac-dot" />
                </span>{' '}
                <span className="ac-nw">
                  Practise<i className="ac-dot" />
                </span>{' '}
                <span className="ac-nw">
                  Grow<i className="ac-dot" />
                </span>
              </span>
              <span className="ac-grad">
                With AI Academy<i className="ac-dot" />
              </span>
            </h1>
            <p className="ac-typeline">
              We teach <TypedWord />
            </p>
            <p className="ac-lede">
              Digitner AI Academy is the hands-on learning arm of Digitner. Learn AI by using it on your own work, with practical programmes
              and mentors who build AI for real businesses every day.
            </p>
            <div className="ac-ctas">
              <Link className="ac-btn" to={PATHS.academyProgrammes}>
                Explore programmes <span aria-hidden="true">→</span>
              </Link>
              <Link className="ac-btn ac-ghost" to={PATHS.academyRegister}>
                Book a workshop
              </Link>
            </div>
          </div>
          <HeroOrbit />
        </div>
      </div>

      <PromptBand />

      <section id="running" className="ac-running">
        <div className="ac-wrap">
          <div className="ac-head ac-headrow">
            <div className="ac-stack">
              <span className="ac-label">Programmes</span>
              <h2>Running now.</h2>
              <p className="ac-lede">Two live workshops: find and win your best customers, and put AI to work across your business.</p>
            </div>
            <Link className="ac-btn ac-ghost" to={PATHS.academyProgrammes}>
              View all programmes <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <RunningTrack />
      </section>

      <section id="demo">
        <div className="ac-wrap ac-demo-grid">
          <div className="ac-head" style={{ margin: 0 }}>
            <span className="ac-label">See it in action</span>
            <h2>From prompt to result in seconds.</h2>
            <p className="ac-lede">
              This is what participants do in the room. They type a clear prompt about their own business and get something they can use
              straight away.
            </p>
          </div>
          <DemoCard />
        </div>
      </section>
    </View>
  )
}
