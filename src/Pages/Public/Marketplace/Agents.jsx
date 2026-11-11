import { useState } from 'react'
import { Ic } from './icons'
import W from './Words'
import { cx } from './util'
import { useMkt } from './ctx'

/** Agents page: category filter, agent cards and the two scrolling name rows. */
export default function Agents() {
  const { D } = useMkt()
  const [cat, setCat] = useState('All')
  const list = D.AG.filter((a) => cat === 'All' || a.cat === cat)
  const chip = (a) => (
    <span className={cx('mchip')} key={a.p}>
      <span className={cx('ic')}><Ic n={a.ic} s={18} /></span>
      <b>{a.p}</b>
      <i>{a.m}</i>
    </span>
  )
  const row1 = D.AG.map(chip)
  const row2 = D.AG.slice().reverse().map(chip)
  return (
    <section id="s-agents">
      <div className={cx('wrap')}>
        <div className={cx('sh row')}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className={cx('eyebrow')}><span><Ic n="store" s={15} /></span>The marketplace</span>
            <W>Your growth stack<span className={cx('d')}>,</span> <span className={cx('soft')}>one agent at a time.</span></W>
          </div>
          <div className={cx('filters')}>
            {D.CATS.map((c) => (
              <button key={c} type="button" className={cx('chip', c === cat && 'on')} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>
        <div className={cx('agents')}>
          {list.map((a, i) => (
            <div className={cx('ag')} key={cat + a.n} style={{ animation: `mk-fadeup2 .5s ${i * 0.04}s both` }}>
              <div className={cx('top')}>
                <span className={cx('ic')}><Ic n={a.ic} s={22} /></span>
                <span className={cx('tag', a.st === 'Beta' && 'acc')}>{a.st}</span>
              </div>
              <div>
                <h3>{a.n}</h3>
                <span className={cx('persona')}>{a.p} · {a.m}</span>
              </div>
              <p>{a.d}</p>
              <div className={cx('foot')}>
                <span className={cx('mono')}>{a.c ? a.c + ' credits/mo' : 'Included'}</span>
                <span className={cx('mono')}>{a.cat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 56 }}>
        <div className={cx('marq')} aria-hidden="true">
          <div className={cx('mrow')}>{row1}{row1}</div>
          <div className={cx('mrow rev')}>{row2}{row2}</div>
        </div>
      </div>
    </section>
  )
}
