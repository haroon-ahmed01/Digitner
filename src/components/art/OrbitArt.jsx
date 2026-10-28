import { useLocation } from 'react-router-dom'
import Icon from '@/components/ui/Icon'
import HeroPic from './HeroPic'
import { heroPicFor } from '@/data/heroPics'
import { image } from '@/utils/media'
import SceneScreen from './SceneScreens'
import { sceneVariant } from '@/utils/scene'

/** Four spots around the monitor where the topic chips float (left %, top %). */
const SPOTS = [[2, 62], [36, 2], [57, 76], [72, 4]]

/**
 * Hero illustration: a person showing an AI assistant on a monitor, in flat style.
 * Colours come from CSS tokens (styles/scene.css), so it restyles itself for light and dark.
 * Props keep the old orbit-art names so every page can use it unchanged:
 *   icon     centre icon shown on the screen        chips   [[label, icon]] floating tags
 *   caption  line under the picture                  metric  small badge ("50+ clients")
 */
export default function OrbitArt({ icon = 'spark', chips = [], caption, metric = 'AI', max = 4, variant }) {
  const { pathname } = useLocation()
  if (image(heroPicFor(pathname))) return <HeroPic caption={caption} />
  const list = chips.slice(0, Math.min(max, SPOTS.length))
  return (
    <div className="scene">
      <div className="scn" aria-hidden="true">
        <svg viewBox="0 0 760 420" role="img" focusable="false">
          <defs>
            <linearGradient id="scnScreen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--scn-s1)" />
              <stop offset="1" stopColor="var(--scn-s2)" />
            </linearGradient>
            <radialGradient id="scnGlow" cx=".5" cy=".5" r=".5">
              <stop offset="0" stopColor="#fff" stopOpacity=".9" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* arched window backdrop + skyline */}
          <rect x="30" y="24" width="700" height="336" rx="64" fill="var(--scn-bg)" />
          <g fill="var(--scn-city)">
            <rect x="70" y="190" width="70" height="170" rx="4" />
            <rect x="150" y="130" width="46" height="230" rx="4" />
            <rect x="590" y="150" width="56" height="210" rx="4" />
            <rect x="660" y="210" width="50" height="150" rx="4" />
            <rect x="520" y="230" width="46" height="130" rx="4" />
          </g>
          <path d="M255 24v336M505 24v336" stroke="var(--scn-bg)" strokeWidth="6" opacity=".6" />
          <g className="scn-cloud" fill="#fff" opacity=".7">
            <ellipse cx="150" cy="62" rx="34" ry="11" />
            <ellipse cx="560" cy="58" rx="30" ry="10" />
          </g>

          {/* monitor */}
          <rect x="112" y="64" width="350" height="244" rx="16" fill="var(--scn-frame)" />
          <rect x="126" y="78" width="322" height="214" rx="8" fill="url(#scnScreen)" />
          <path d="M262 308h50l14 40h-78z" fill="var(--scn-frame)" />
          <ellipse cx="287" cy="352" rx="78" ry="9" fill="var(--scn-frame)" />
          <ellipse cx="300" cy="372" rx="260" ry="9" fill="var(--scn-shadow)" />

          <SceneScreen variant={variant || sceneVariant(icon)} />

          {/* floating UI cards */}
          <g className="scn-float">
            <rect x="468" y="86" width="104" height="196" rx="10" fill="var(--scn-card)" stroke="var(--scn-line)" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <rect key={i} x="480" y={100 + i * 16} width={24 + ((i * 23) % 56)} height="5" rx="2.5" fill={i % 4 === 0 ? 'var(--scn-accent)' : 'var(--scn-line)'} />
            ))}
          </g>
          <g className="scn-float b">
            <rect x="500" y="64" width="64" height="30" rx="8" fill="var(--scn-card)" stroke="var(--scn-line)" />
            <path d="M522 72l-8 7 8 7M542 72l8 7-8 7M536 70l-6 18" stroke="var(--scn-accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
          <g className="scn-float c">
            <rect x="452" y="124" width="62" height="24" rx="10" fill="var(--scn-s1)" opacity=".9" />
            <rect x="462" y="133" width="30" height="5" rx="2.5" fill="#fff" opacity=".85" />
          </g>
          <g className="scn-float b">
            <circle cx="614" cy="116" r="12" fill="var(--scn-card)" stroke="var(--scn-line)" />
            <path d="M614 109v7M611 120h6" stroke="var(--scn-accent)" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="500" cy="228" r="16" fill="var(--scn-card)" stroke="var(--scn-line)" />
            <circle cx="500" cy="228" r="5" fill="none" stroke="var(--scn-accent)" strokeWidth="2.4" />
            <circle cx="588" cy="258" r="16" fill="var(--scn-card)" stroke="var(--scn-line)" />
            <path d="M588 266v-16M581 256l7-7 7 7" stroke="var(--scn-accent)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
          <path d="M572 96h28q16 0 16 16v-6M456 270h-34" stroke="var(--scn-accent)" strokeWidth="1.6" fill="none" opacity=".5" />
          <circle cx="634" cy="106" r="5" fill="var(--scn-accent)" />

          {/* person */}
          <g className="scn-person">
            <ellipse cx="640" cy="352" rx="96" ry="10" fill="var(--scn-shadow)" />
            <path d="M560 352h116q22 0 22-18v-16q0-14-18-14h-82q-38 0-38 24z" fill="var(--scn-pants)" />
            <path d="M600 200q-8-38 30-38h18q38 0 34 52l-6 96h-78z" fill="var(--scn-hood)" />
            <path d="M628 164q22 18 44 0" stroke="var(--scn-hood-d)" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M634 178v28M658 178v28" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            <path d="M606 212q-52 8-72 4" stroke="var(--scn-hood)" strokeWidth="26" strokeLinecap="round" fill="none" />
            <circle cx="526" cy="212" r="12" fill="var(--scn-skin)" />
            <path d="M520 202l-12-14M526 200l-3-18M533 202l5-16" stroke="var(--scn-skin)" strokeWidth="6" strokeLinecap="round" />
            <circle cx="650" cy="132" r="30" fill="var(--scn-skin)" />
            <path d="M620 128q-6-34 30-34 36 0 32 34-10-22-34-20-22 2-28 20z" fill="var(--scn-hair)" />
            <circle cx="640" cy="134" r="3" fill="#1B1A3A" />
            <circle cx="664" cy="134" r="3" fill="#1B1A3A" />
            <path d="M642 146q9 8 20 0" stroke="#1B1A3A" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        </svg>

        <span className="scn-ic"><Icon name={icon} /></span>
        <span className="scn-metric"><Icon name="spark" />{metric}</span>
        {list.map(([label, ic], i) => (
          <span className="scn-chip" key={label + i} style={{ left: `${SPOTS[i][0]}%`, top: `${SPOTS[i][1]}%`, '--i': i }}>
            <Icon name={ic} />
            {label}
          </span>
        ))}
      </div>
      {caption && <p className="cap">{caption}</p>}
    </div>
  )
}
