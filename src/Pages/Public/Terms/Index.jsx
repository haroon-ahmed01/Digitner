import { floatsFor } from '@/utils/floats'
import Seo from '@/components/seo/Seo'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/motion/Reveal'
import { Band, PageHero, RouteOrbit, View } from '@/components/blocks'
import { PATHS } from '@/constant/routes'
import { SITE } from '@/data/site'
import { TERMS } from '@/data/terms'
import { scrollToY } from '@/utils/smoothScroll'
import AText from '@/components/motion/AText'

const goTo = (e, id) => {
  e.preventDefault()
  const el = document.getElementById(id)
  if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY - 90)
}

export default function Terms() {
  return (
    <View>
      <Seo title="Terms and Conditions" description="The terms that apply when you use Digitner's website, products, services, academy programs and coaching sessions." path="/terms" />
      <PageHero
        solo
        eyebrow="Legal"
        title={<h1><AText>Terms and </AText><em><AText delay={0.4}>Conditions</AText></em></h1>}
        lede={`${SITE.legalName} · Last updated October 2026`}
        floats={floatsFor('terms')}
        art={<RouteOrbit route="terms" />}
      />
      <section>
        <div className="legal">
          <nav className="ltoc" aria-label="Sections">
            <p className="eyebrow">On this page</p>
            <ol>
              {TERMS.map((t, i) => (
                <li key={t[0]}><a href={`#ts${i + 1}`} onClick={(e) => goTo(e, `ts${i + 1}`)}>{t[0]}</a></li>
              ))}
            </ol>
          </nav>
          <div className="lbody">
            <p className="lintro">
              Welcome to <b>{SITE.legalName}</b> (&quot;Digitner&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing or using our website, products, services, academy programs, or coaching sessions, you agree to be bound by these Terms and Conditions (&quot;Terms&quot;). Please read them carefully.
            </p>
            {TERMS.map(([title, intro, items, outro, icon], i) => (
              <Reveal as="article" className="lsec" id={`ts${i + 1}`} key={title}>
                <div className="lhd">
                  <span className="lnum">{i + 1}</span>
                  <span className="lic"><Icon name={icon} /></span>
                  <h2><AText>{title}</AText></h2>
                </div>
                {intro && <p>{intro}</p>}
                {items.length > 0 && (
                  <ul>
                    {items.map(([b, text], k) => (
                      <li key={k}>{b ? <><b>{b}:</b> </> : null}{text}</li>
                    ))}
                  </ul>
                )}
                {outro && <p>{outro}</p>}
              </Reveal>
            ))}
            <Band style={{ marginTop: 28 }} title="Have questions about our Terms?" text="Our team is here to help clarify any concerns you may have." to={PATHS.contact} label="Contact us" />
          </div>
        </div>
      </section>
    </View>
  )
}
