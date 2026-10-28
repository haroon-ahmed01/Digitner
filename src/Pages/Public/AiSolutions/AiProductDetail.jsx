import { useMemo, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/motion/Reveal'
import CounterBand from '@/components/motion/CounterBand'
import { View, PageHero, PageTyper, RouteOrbit, Showcase } from '@/components/blocks/Hero'
import { floatsFor } from '@/utils/floats'
import { StoryStrip, VideoPanel } from '@/components/blocks/Media'
import { CaseBlock, FaqBlock, Feats, Flow, WhoBlock } from '@/components/blocks/Content'
import { Shots } from '@/components/blocks/Screens'
import { useLiven } from '@/components/viz/useLiven'
import { BuySeiScreen, SmileScreen, VeloqueScreen } from '@/components/screens/AiDemos'
import { Crumbs, Sec, ShineTitle } from '@/components/screens/Shared'
import { PATHS } from '@/constant/routes'
import { AI_PRODUCTS } from '@/data/aiProducts'
import { PRODUCT_EXTRAS, CLIENT_STORIES } from '@/data/products'
import { CASE_SUMMARIES } from '@/data/cases'
import AText from '@/components/motion/AText'

/** Page content per AI product (copy from the prototype). */
const PAGES = {
  veloque: {
    shine: 'VeloqueAI',
    typer: ['Discover', ['AI tools', 'AI news', 'The Velo Signal', 'AI communities', 'the AI Operating Layer']],
    lede: 'Discover, evaluate and adopt the right AI, all in one place. Curated AI News, a structured Tools directory and The Velo Signal weekly newsletter: one reliable source for enthusiasts, businesses and AI companies.',
    primary: ['Visit veloque.ai', 'https://veloque.ai'],
    secondary: 'Become a member',
    store: ['globe', 'Use it on', 'The Web App', 'https://play.google.com/store/apps/details?id=com.atlasai.app&hl=en_IN'],
    video: 'Discover, connect and scale with AI',
    screen: <VeloqueScreen />,
    caseIcon: 'compass',
  },
  buysei: {
    shine: 'BuySei AI',
    typer: ['Know', ['who’s ready to buy AI', 'each profile’s AI stage', 'how to pitch every buyer', 'when to follow up']],
    lede: 'BuySei AI is buyer intelligence for companies that sell AI. It places every prospect on a four-stage AI Adoption model, so you pitch each person at the level they are actually at.',
    primary: ['Visit buysei.com', 'https://buysei.com'],
    secondary: 'Get a demo',
    store: ['chrome', 'Open', 'buysei.com', 'https://chromewebstore.google.com/detail/ejhakmhclmnfobdadcknjfdicgkcalbo?utm_source=item-share-cb'],
    video: 'From prospect list to AI readiness',
    screen: <BuySeiScreen />,
    caseIcon: 'chart',
  },
  smileview: {
    shine: 'SmileView AI',
    typer: ['Preview', ['new smiles', 'aligner results', 'cosmetic outcomes', 'every tooth, mapped']],
    lede: 'SmileView AI reads a single smile photo, maps every tooth and previews the result of aligners or cosmetic work, so patients see the outcome before they commit.',
    primary: ['Try SmileView AI', 'https://smile-ai.digitner.com'],
    secondary: 'Request a clinic demo',
    store: ['link', 'Works with', 'Digitner DentExa', 'https://smile-ai.digitner.com'],
    video: 'A smile preview in the first visit',
    screen: <SmileScreen />,
    caseIcon: 'tooth',
  },
}

const VELOQUE_FEATS = [['users', 'For students', 'Curated tools and news without the jargon, free to start, with student-friendly filters.'], ['growth', 'For professionals', 'Find tools for your role fast, compare ratings and pricing before you commit.'], ['grid', 'For teams & businesses', 'One trusted source to vet, standardise and share AI tool shortlists.'], ['shield', 'Veloque Verified', 'Human-reviewed listings with a trust badge across News, Tools and Newsletter.'], ['target', 'For AI founders', 'Reach high-intent buyers, earn reviews and a dofollow backlink, track listing analytics.'], ['present', 'Advertise', 'Featured listings, newsletter sponsorship and launch spotlights.'], ['code', 'Developer APIs', 'Tools, news and newsletter APIs, coming soon.'], ['wallet', 'Free for everyone', 'Full directory, daily news, newsletter and apps at no cost. Pro plans coming soon.'], ['phone', 'Web, iPhone & Android', 'Use it in the browser or on the free mobile apps.']]
const VELOQUE_FEATS2 = [['users', 'Communities', 'Founders join or create a Community and grow it with members.'], ['mic', 'Founder Spotlight', 'Interviews with AI founders on VeloqueTV (@VeloqueAITV).'], ['play', 'Veloque Lives', 'Live sessions where founders present to a global audience.'], ['calendar', 'Global AI events', 'Every major AI event, in one calendar.'], ['phone', 'Android & iOS apps', 'Discover tools and join Communities on the go.'], ['globe', 'Global visibility', 'Members are showcased on Veloque and other global platforms.'], ['flag', 'AI Hackathon', 'Open worldwide, with prizes, mentoring and investment for unique ideas.'], ['target', 'Leads & partnerships', 'Members already win leads and partnerships through the platform.']]
const PILLARS = [['AI News', 'A daily, editorially curated feed of launches and industry shifts, each story summarised.'], ['AI Tools', '13,598+ tools across 92 categories, with ratings, pricing and reviews at a glance.'], ['Newsletter', 'The Velo Signal: a weekly 5-minute PDF briefing with analysis and a funding radar.'], ['Communities', 'Founder Communities, Spotlight interviews and Veloque live sessions.']]
const LADDER = [['Curious', 25, 'Talking about AI, not using it yet. Lead with education.'], ['Explorer', 50, 'Testing tools in one team. Offer a focused pilot.'], ['Practitioner', 75, 'AI in daily work. Sell integration and scale.'], ['Native', 100, 'AI is core to the business. Partner on custom builds.']]
const BUYSEI_FLOW = [['target', 'Add prospects', 'Upload a list or browse with the Chrome extension.'], ['search', 'Read signals', 'BuySei reads public company, product and founder signals.'], ['chart', 'Get the stage', 'Each profile gets an adoption stage and readiness score.'], ['chat', 'Pitch right', 'Use the suggested opening for that stage.']]
const BUYSEI_FEATS = [['chrome', 'Chrome extension', 'BuySeiAI · AI Readiness Intelligence, on the Chrome Web Store.'], ['wallet', 'Pay per profile', 'Credits per profile, with the cost shown before you run it.'], ['shield', 'Consent-first', 'Built on a DPDP-aligned signal and consent framework.']]
const SMILE_FLOW = [['phone', 'Take a photo', 'One smile photo from a phone or clinic camera.'], ['tooth', 'Detect teeth', 'AI finds and numbers every tooth.'], ['spark', 'Preview', 'See the aligner or cosmetic result.'], ['chat', 'Share', 'Send the preview to the patient.']]
const SMILE_FEATS = [['layers', 'Stage-by-stage view', 'Show how teeth move through each aligner stage.'], ['users', 'Built for clinics', 'Simple enough for the front desk, accurate enough for the dentist.'], ['link', 'Works with DentExa', 'Previews save straight to the patient record in Digitner DentExa.']]
const VELOQUE_STATS = [['13,598+', 'AI tools indexed'], ['92', 'Categories'], ['3,691+', 'Free tools'], ['2', 'Apps: iPhone & Android']]
const VELOQUE_ICONS = ['search', 'grid', 'wallet', 'phone']

const Head = ({ title, children }) => (
  <div className="head"><h2><AText>{title}</AText></h2>{children && <p>{children}</p>}</div>
)

function AiProduct({ ai }) {
  const id = ai.id
  const pg = PAGES[id]
  const x = PRODUCT_EXTRAS[id]
  const stories = CLIENT_STORIES[id]
  const ref = useRef(null)
  useLiven(ref)
  const words = useMemo(() => pg.typer[1], [pg])

  return (
    <View style={{ '--c': ai.c }}>
      <Seo title={`${ai.n}: ${ai.t}`} description={pg.lede} path={PATHS.aiProduct(id)} />
      <PageHero
        floats={floatsFor(id)}
        art={<RouteOrbit route={id} />}
        title={
          <>
            <Crumbs items={[['AI Solutions', PATHS.ai], [ai.n]]} />
            <ShineTitle name={pg.shine} />
            <PageTyper prefix={pg.typer[0]} words={words} />
          </>
        }
        lede={pg.lede}
      >
        <div className="row">
          <a className="btn primary" style={{ background: ai.c }} href={pg.primary[1]} target="_blank" rel="noopener noreferrer">{pg.primary[0]} <Icon name="ext" /></a>
          <Link className="btn ghost" to={PATHS.contact}>{pg.secondary}</Link>
        </div>
        <div className="stores">
          <a className="store" href={pg.store[3]} target="_blank" rel="noopener noreferrer">
            <Icon name={pg.store[0]} />
            <span><small>{pg.store[1]}</small>{pg.store[2]}</span>
          </a>
        </div>
      </PageHero>
      {id === 'veloque' && <CounterBand stats={VELOQUE_STATS} icons={VELOQUE_ICONS} />}
      <Showcase title="Try it live">{pg.screen}</Showcase>

      <section>
        <Reveal style={{ maxWidth: 980, margin: '0 auto' }}>
          <VideoPanel label={ai.n} title={pg.video} />
        </Reveal>
      </section>

      {id === 'veloque' && (
        <>
          <section style={{ paddingTop: 0 }}>
            <Head title="One operating layer for AI">Everything professionals rely on to stay ahead in AI, in one place.</Head>
            <div className="pillars">
              {PILLARS.map(([t, d], i) => (
                <Reveal className="pillar" data-n={i + 1} key={t}><h3>{t}</h3><p>{d}</p></Reveal>
              ))}
            </div>
          </section>
          <Sec n="01" title="Features" desc="For teams looking for AI, and for founders who build it."><div className="feats"><Feats items={VELOQUE_FEATS} /></div></Sec>
          <Sec n="+" title="Community & growth"><div className="feats"><Feats items={VELOQUE_FEATS2} /></div></Sec>
        </>
      )}

      {id === 'buysei' && (
        <>
          <section style={{ paddingTop: 0 }}>
            <Head title="The AI Adoption Stage Model">Our proprietary model reads public signals and places each company on one of four stages.</Head>
            <Reveal className="ladder">
              {LADDER.map(([t, w, d]) => (
                <div className="rung" key={t}><div className="lv"><span style={{ width: `${w}%` }} /></div><h3>{t}</h3><p>{d}</p></div>
              ))}
            </Reveal>
          </section>
          <section style={{ paddingTop: 0 }}>
            <Head title="How BuySei works">Built for founders, sales teams and agencies selling AI.</Head>
            <div className="flow"><Flow items={BUYSEI_FLOW} /></div>
          </section>
          <Sec n="01" title="Features"><div className="feats"><Feats items={BUYSEI_FEATS} /></div></Sec>
        </>
      )}

      {id === 'smileview' && (
        <>
          <section style={{ paddingTop: 0 }}>
            <Head title="From photo to preview">Four steps, done chairside in a few minutes.</Head>
            <div className="flow"><Flow items={SMILE_FLOW} /></div>
          </section>
          <Sec n="01" title="Features"><div className="feats"><Feats items={SMILE_FEATS} /></div></Sec>
        </>
      )}

      <div ref={ref}>
        {x.who && <section style={{ paddingTop: 0 }}><WhoBlock who={x.who} intro={x.intro} /></section>}
        <Sec n="02" title="App screens" desc="What it looks like on the web and on your phone."><Shots id={id} app={ai.n} /></Sec>
        <Sec n="03" title={stories ? 'Success stories' : 'Case study'} desc={stories ? `Companies growing with ${ai.n}.` : ''}>
          <StoryStrip keys={stories} />
          {stories && <div style={{ height: 22 }} />}
          <CaseBlock c={CASE_SUMMARIES[id]} icon={pg.caseIcon} />
        </Sec>
        <Sec n="04" title="FAQ"><FaqBlock faq={x.faq} /></Sec>
      </div>

      {id === 'veloque' && (
        <section style={{ paddingTop: 0 }}>
          <Reveal className="alliance"><span style={{ color: 'var(--v)' }}>Veloque AI</span><i>×</i><span>SKYLAX</span><i>×</i><span>NAGENT</span></Reveal>
          <p className="muted" style={{ textAlign: 'center', marginTop: 12 }}>Strategic partnership: Veloque, the AI discovery and intelligence platform, with NAGENT as the execution layer for the autonomous enterprise.</p>
        </section>
      )}
    </View>
  )
}

export default function AiProductDetail() {
  const { aiId } = useParams()
  const ai = AI_PRODUCTS.find((a) => a.id === aiId)
  if (!ai || !PAGES[aiId]) return <Navigate to={PATHS.ai} replace />
  return <AiProduct key={aiId} ai={ai} />
}
