import { Link } from 'react-router-dom'
import { floatsFor } from '@/utils/floats'
import Seo from '@/components/seo/Seo'
import Icon from '@/components/ui/Icon'
import CounterBand from '@/components/motion/CounterBand'
import Reveal from '@/components/motion/Reveal'
import { CaseBlock, Clip, FaqBlock, Feats, PageHero, PageTyper, RouteOrbit, Showcase, Timeline, VideoPanel, View } from '@/components/blocks'
import { PATHS } from '@/constant/routes'
import { AI_PRODUCTS, AI_PRODUCT_INFO } from '@/data/aiProducts'
import AText from '@/components/motion/AText'

const STATS = [['3', 'Flagship AI products'], ['13,598+', 'AI tools indexed on VeloqueAI'], ['5', 'Agents at marketplace launch'], ['3', 'Web, iOS & Android, Chrome']]
const WHY = [
  ['layers', 'Products, not slideware', 'Three AI products already live, with apps and extensions in market.'],
  ['code', 'Built into your stack', 'AI added to the websites, CRMs and apps we build for you.'],
  ['shield', 'Privacy by design', 'Consent-first data handling and private hosting where needed.'],
  ['users', 'Human in the loop', 'AI drafts and decides with your team in control.'],
  ['growth', 'Measured outcomes', 'Every pilot has a clear metric before we start.'],
  ['bot', 'Ready agents (coming soon)', 'Hire agents from the upcoming Digitner AI Marketplace.'],
]
const HOW = [
  ['Discover', 'Find the AI use cases that save time or earn revenue.'],
  ['Pilot', 'Prove value fast with one focused pilot.'],
  ['Integrate', 'Connect AI to your CRM, apps and data.'],
  ['Scale', 'Roll out, train teams and measure results.'],
]
const OUT = ['AI use-case shortlist', 'Working pilot', 'Integrated workflows', 'Adoption dashboard']
const CHIPS = [['Lead Gen Agent', 'target'], ['Video Agent', 'play'], ['Poster Agent', 'image'], ['Rewards Agent', 'gift'], ['Free Credits Finder', 'search']]
const CASE = {
  lab: 'Success story',
  ind: 'AI startup on Digitner VeloqueAI',
  ch: 'A young AI company had a strong product but few people knew it existed.',
  so: 'It joined VeloqueAI, featured in Communities and live sessions, and was listed with a Veloque Verified badge.',
  re: 'The founder won a partnership and new leads through the platform.',
}
const FAQ = [
  ['Can I use these products on their own?', 'Yes. Each AI product works standalone, or we integrate it into a platform we build for you.'],
  ['How do I start with AI in my business?', 'Book an AI consultation. We find the right use case and build a working pilot first.'],
  ['Is my data safe?', 'We design for privacy, follow consent-first practices and can host privately.'],
  ['What is the AI Marketplace?', 'Launching soon: a place to hire ready AI agents and run them from one workspace with one credit balance. Join the waitlist for early access.'],
]

export default function AiSolutions() {
  return (
    <View>
      <Seo
        title="AI Solutions"
        description="Veloque AI, BuySei AI and SmileView AI: three flagship AI products from Digitner, plus the AI Marketplace of ready agents."
        path="/ai-solutions"
      />
      <PageHero
        eyebrow="AI Solutions"
        title={
          <h1 className="ptitle">
            <span className="pw">Digitner</span>{' '}
            <em className="shine">
              {[...'AI Solutions'].map((ch, k) => (
                <span key={k} style={{ '--k': k }}>{ch}</span>
              ))}
            </em>
            <span className="pdot">.</span>
          </h1>
        }
        lede="Three flagship AI products built by Digitner, and a marketplace of ready AI agents. Use them on their own, or plug them into a platform we build for you."
        floats={floatsFor('ai')}
        art={<RouteOrbit route="ai" />}
      >
        <PageTyper prefix="Explore" words={['Digitner VeloqueAI', 'Digitner BuySei AI', 'Digitner SmileView AI', 'the AI Marketplace']} />
        <div className="row" style={{ marginTop: 22 }}>
          <Link className="btn primary" to={PATHS.contact}>Book an AI consultation</Link>
          <Link className="btn ghost" to={PATHS.marketplace}>Explore the AI Marketplace</Link>
        </div>
      </PageHero>
      <Showcase>
        <VideoPanel label="AI Solutions" title="AI built into how you work" base="agents" />
      </Showcase>
      <CounterBand stats={STATS} icons={['spark', 'search', 'bot', 'phone']} />

      <section>
        <div className="sechead"><h2><AText>Our AI products</AText></h2><p><AText sub>Each built for one job, each available today.</AText></p></div>
        {AI_PRODUCTS.map((a, i) => {
          const x = AI_PRODUCT_INFO[a.id]
          return (
            <Reveal as="article" className={`aiw${i % 2 ? ' rev' : ''}`} key={a.id}>
              <div className="aiv">
                <Clip base={x.v} />
                <span className="aib2"><Icon name={a.ic} /></span>
              </div>
              <div className="aic">
                <p className="eyebrow">AI product 0{i + 1}</p>
                <h3>{a.n}</h3>
                <p className="muted">{x.d}</p>
                <ul className="deliver">
                  {x.f.map((f) => (
                    <li key={f}><Icon name="check" /><span>{f}</span></li>
                  ))}
                </ul>
                <div className="row" style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Link className="btn primary" to={PATHS.aiProduct(a.id)}>Explore <Icon name="arrow" /></Link>
                  {x.l.map(([label, url]) => (
                    <a className="btn ghost" key={url} href={url} target="_blank" rel="noopener noreferrer">{label} <Icon name="ext" /></a>
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="sechead"><h2><AText>How we bring AI into your business</AText></h2><p><AText sub>A clear path from idea to measurable results.</AText></p></div>
        <Timeline group="consulting" how={HOW} out={OUT} />
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="sechead"><h2><AText>Why Digitner for AI</AText></h2></div>
        <div className="feats"><Feats items={WHY} /></div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <Reveal className="mkband">
          <div>
            <span className="since" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.25)', color: '#FFFFFF' }}><i />Coming soon</span>
            <h2><AText>Digitner AI Marketplace</AText></h2>
            <p>Hire ready AI agents for leads, video, posters, rewards and free credits. One workspace, one credit balance.</p>
            <Link className="btn" to={PATHS.marketplace}>Preview agents <Icon name="arrow" /></Link>
          </div>
          <div className="mkchips">
            {CHIPS.map(([label, ic], i) => (
              <span key={label} style={{ '--d': `${i * 0.15}s` }}><Icon name={ic} />{label}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="sechead"><h2><AText>Case study</AText></h2></div>
        <CaseBlock c={CASE} icon="compass" />
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="sechead"><h2><AText>FAQ</AText></h2></div>
        <FaqBlock faq={FAQ} />
      </section>
    </View>
  )
}
