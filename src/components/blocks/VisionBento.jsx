import { useEffect, useState } from 'react'
import Icon from '@/components/ui/Icon'
import MagicBento from '@/components/motion/MagicBento'
import '@/styles/visionbento.css'

const useSiteTheme = () => {
  const read = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  const [theme, setTheme] = useState(read)
  useEffect(() => {
    const mo = new MutationObserver(() => setTheme(read()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])
  return theme
}

/** Vision, mission and values as a spotlight bento. mission: [[bold, text]], values: [[icon, title, text]] */
export default function VisionBento({ mission, values }) {
  const theme = useSiteTheme()
  const items = [
    {
      id: 'vision',
      colSpan: 2,
      rowSpan: 2,
      content: (
        <div className="vb vb-vis">
          <span className="vb-ico"><Icon name="spark" /></span>
          <p className="eyebrow">Our vision</p>
          <h3>To be the most trusted partner for turning ideas into intelligent businesses.</h3>
          <p className="vb-p">A world where every organisation, whatever its size or location, runs on technology built around its best ideas and strengthened by AI.</p>
        </div>
      ),
    },
    {
      id: 'mission',
      colSpan: 2,
      rowSpan: 2,
      content: (
        <div className="vb">
          <span className="vb-ico"><Icon name="flag" /></span>
          <p className="eyebrow">Our mission</p>
          <h3>Put ideas at the core, and build the technology around them.</h3>
          <ul className="vb-list">
            {mission.map(([b, t]) => (
              <li key={b}><Icon name="check" /><span><b>{b}</b> {t}</span></li>
            ))}
          </ul>
        </div>
      ),
    },
    ...values.map(([ic, b, s]) => ({
      id: b,
      content: (
        <div className="vb vb-val">
          <span className="vb-ico sm"><Icon name={ic} /></span>
          <b>{b}</b>
          <small>{s}</small>
        </div>
      ),
    })),
  ]
  return (
    <MagicBento
      className="vmb"
      items={items}
      columns={4}
      rowHeight={150}
      gap={12}
      radius={20}
      theme={theme}
      glowColor={theme === 'dark' ? '#A19DF4' : '#5B54C4'}
      enableBorderGlow
      enableSpotlight
      spotlightRadius={300}
      clickEffect
      enableStars={false}
      particleCount={24}
      enableTilt={false}
      enableMagnetism={false}
      textAutoHide
      intro
    />
  )
}
