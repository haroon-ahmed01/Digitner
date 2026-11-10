import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BP_AGENDA, FORMATS } from '@/data/academy'
import { PATHS } from '@/constant/routes'
import Ms from './Ms'

/** Playbook formats: switch between the long workshop and the 1-hour quick start. */
export function FormatPicker() {
  const [f, setF] = useState('long')
  const d = FORMATS[f]
  return (
    <>
      <div className="ac-switch" role="group" aria-label="Choose format">
        {Object.entries(FORMATS).map(([key, v]) => (
          <button type="button" aria-pressed={f === key} key={key} onClick={() => setF(key)}>
            {v.switch}
          </button>
        ))}
      </div>
      <div className="ac-formats">
        <div className="ac-fmt-card">
          <span className="ac-big">{d.big}</span>
          <h3>{d.title}</h3>
          <p className="ac-muted">{d.desc}</p>
          <Link className="ac-btn" to={PATHS.academyRegister}>
            Book this format
          </Link>
        </div>
        <ol className="ac-agenda">
          {d.items.map(([time, head, text, tag]) => (
            <li key={time}>
              <time>{time}</time>
              <div>
                <b>
                  {tag && <span className="ac-fnTag">{tag}</span>}
                  {head}
                </b>
                <span>{text}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}

/** Blueprint agenda: 2-day workshop or 2-hour snapshot. */
export function BlueprintAgenda() {
  const [k, setK] = useState('days')
  return (
    <>
      <div className="ac-switch" role="group" aria-label="Choose Blueprint format">
        {Object.entries(BP_AGENDA).map(([key, v]) => (
          <button type="button" aria-pressed={k === key} key={key} onClick={() => setK(key)}>
            {v.switch}
          </button>
        ))}
      </div>
      <div className="ac-bpgrid">
        {BP_AGENDA[k].days.map((day) => (
          <div className="ac-bpday" key={day.h}>
            <h4>
              <Ms name={day.ic} />
              <span>{day.h}</span>
            </h4>
            <p className="ac-sub">{day.sub}</p>
            <ol className="ac-agenda">
              {day.items.map(([time, head, text, out]) => (
                <li key={time}>
                  <time>{time}</time>
                  <div>
                    <b>{head}</b>
                    <span>{text}</span>
                    {out && <em className="ac-out" style={{ fontStyle: 'normal' }}>
                        {out}
                      </em>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </>
  )
}
