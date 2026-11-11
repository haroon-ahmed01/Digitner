/** Path of a file under public/marketplace/ (images, clips, workspace apps). */
export const asset = (p) => `${import.meta.env.BASE_URL}marketplace/${p}`

/**
 * Class helper. Every class of this page carries an `mk-` prefix so nothing here can clash with the rest of the
 * site's CSS. cx('btn pri', on && 'on') -> "mk-btn mk-pri mk-on".
 */
export const cx = (...a) =>
  a
    .flat(9)
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => 'mk-' + t)
    .join(' ')

/** "Plan. Price. Travel." -> the full stops get the purple accent. */
export const dots = (s) => s.split(/(\.)/).map((p, i) => (p === '.' ? <span key={i} className="mk-d">.</span> : p))
