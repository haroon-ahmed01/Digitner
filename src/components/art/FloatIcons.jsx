import Icon from '@/components/ui/Icon'

const POS = [[6, 46], [12, 95], [56, 62], [78, 96], [90, 54], [34, 97], [90, 80]]

/** Soft floating icons behind a page hero. icons: icon names (max 7). */
export default function FloatIcons({ icons = [] }) {
  const list = [...new Set(icons)].slice(0, 7)
  if (!list.length) return null
  return (
    <div className="flo" aria-hidden="true">
      {list.map((ic, i) => (
        <span key={ic + i} style={{ top: `${POS[i][0]}%`, left: `${POS[i][1]}%`, '--t': `${6 + i * 1.3}s`, '--dl': `${i * 0.4}s` }}>
          <Icon name={ic} />
        </span>
      ))}
    </div>
  )
}
