/**
 * All text for the Digitner AI Academy pages. Edit content here only.
 * Icon names are Material Symbols (see data/academyIcons.js).
 */
import { PATHS } from '@/constant/routes'

export const ACADEMY = {
  name: 'Digitner AI Academy',
  email: 'priya@digitner.com',
  places: 'digitner.com · Vellore · Bengaluru · Malaysia · Mexico',
  motto: ['Learn by ', 'doing', '.', 'AI built into your work.'],
}

/** Sub-navigation shown under the site header on every Academy page. */
export const ACADEMY_TABS = [
  { label: 'Overview', to: PATHS.academy, exact: true },
  { label: 'Programmes', to: PATHS.academyProgrammes },
  { label: 'AI Growth Blueprint', to: PATHS.academyBlueprint },
  { label: 'AI Business Playbook', to: PATHS.academyPlaybook },
  { label: 'Register', to: PATHS.academyRegister },
]

/** Words typed after "We teach" in the home hero. */
export const TYPED_WORDS = ['AI for business', 'prompts that work', 'agents with skills', 'AI for your team', 'automation, hands-on']

/** The six business functions orbiting the logo tile, then the AI chip's rotating sub-label. */
export const ORBIT_MODS = [
  { n: 'Operations', x: 50, y: 6, svg: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>' },
  { n: 'Sales', x: 88.1, y: 28, svg: '<path d="M4 18l6-6 4 4 6-8"/>' },
  { n: 'Marketing', x: 88.1, y: 72, svg: '<path d="M4 10v4l12 5V5L4 10z"/>' },
  { n: 'Customer service', x: 50, y: 94, svg: '<path d="M4 13v-1a8 8 0 0116 0v1"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/>' },
  { n: 'Finance', x: 11.9, y: 72, svg: '<path d="M7 5h10M7 9h10M9 5c4 0 6 2 6 4s-2 4-6 4l7 6"/>' },
  { n: 'HR', x: 11.9, y: 28, svg: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2"/><path d="M15 15c3 0 6 1.5 6 4"/>' },
]
export const AI_SUBS = ['Prompts', 'Agents', 'Skills', 'Mentors']

/** Scrolling strip of sample prompts under the hero. [function, prompt] */
export const PROMPTS = [
  ['Ops', 'Turn this voice note into action items with owners'],
  ['Sales', 'Write a quote for 20 racks with 18% GST, valid 15 days'],
  ['Marketing', '3 Pongal offer ideas for a saree shop'],
  ['Finance', 'Polite reminder: invoice #214, ₹45,000, 15 days overdue'],
  ['HR', 'Job post for a delivery executive in Coimbatore'],
  ['Service', 'Apology for late delivery, in English and Tamil'],
  ['Ops', "Reorder list from last month's sales sheet"],
  ['Marketing', 'Reply to a 2-star Google review, calm and short'],
  ['Sales', 'Score this lead: hot, warm or cold'],
]

/** "From prompt to result" demo. `o` is trusted static HTML. */
export const DEMOS = {
  ops: {
    tab: 'Operations',
    p: 'You run a small bakery in Coimbatore. Write a daily opening checklist for 2 staff. Max 10 items, grouped by area.',
    o: '<b>Opening checklist</b><ul><li>Oven: switch on, check temperature at 180°C</li><li>Counter: wipe glass, refill bread trays</li><li>Stock: note items below 5 units</li><li>Cash: count float, test UPI QR</li></ul>',
    s: 'Saves ~20 min a day',
  },
  sales: {
    tab: 'Sales',
    p: 'Write a polite WhatsApp follow-up for a lead who asked for a quote 3 days ago. Under 50 words. No pressure.',
    o: 'Hi Ramesh, just checking if you had a chance to look at the quote for 20 steel racks. Happy to adjust quantity or delivery date. Shall I hold this price till Friday?',
    s: 'Follow-up in 30 seconds',
  },
  mkt: {
    tab: 'Marketing',
    p: 'Create 3 Diwali posts for a hardware store in Hosur. Table: day, idea, caption under 30 words.',
    o: '<ul><li><b>Day 1:</b> Light up safely. LED strings and extension boards, 15% off this week.</li><li><b>Day 2:</b> Behind the counter: meet the team that keeps your home running.</li><li><b>Day 3:</b> Gift a toolkit. Combo packs from ₹799.</li></ul>',
    s: 'A week of content in 10 min',
  },
}
export const DEMO_ORDER = ['ops', 'sales', 'mkt']

/** The two live programmes. `img` is a file in src/assets/images. */
export const COURSES = [
  {
    id: 'blueprint',
    t: 'AI Growth Blueprint',
    s: 'ICP, personas, competitor analysis, your North Star metric, what will work for you, and a 90-day plan your team commits to',
    lv: 'Owners and leaders',
    d: '2-hour snapshot or 2-day workshop',
    st: 'Live workshop',
    to: PATHS.academyBlueprint,
    img: 'academy-blueprint.jpg',
    alt: 'Growth Blueprint board: ideal customer target, persona card, competitor map and North Star metric',
    feature: true,
  },
  {
    id: 'playbook',
    t: 'AI Business Playbook',
    s: 'Put AI to work across operations, sales, marketing, service, finance and HR',
    lv: 'Beginner',
    d: '1-hour or 3–4 hour workshop + locked PDF manual',
    st: 'Live workshop',
    to: PATHS.academyPlaybook,
    img: 'academy-playbook.jpg',
    alt: 'AI Business Playbook: a laptop showing a sales chat with an AI-drafted quotation and a content calendar',
  },
]

/* ------------------------------ AI Business Playbook ------------------------------ */
export const PLAYBOOK = {
  label: 'Programme details · formats · manual',
  title: 'AI Business Playbook',
  lede: 'Every lab ends with something live on your phone or laptop. You work on your own business, with your own data, from the first ten minutes.',
  meta: [
    ['For', 'Owners and managers of shops, workshops, clinics, traders and service firms'],
    ['Level', 'Beginner. If you use WhatsApp, you can do this.'],
    ['Bring', "Phone or laptop, price list, top 10 customer questions, last month's sales sheet"],
    ['Language', 'English, with Tamil, Hindi and Kannada prompt versions'],
  ],
  outcomesTitle: 'You leave with',
  outcomes: [
    ['checklist', 'Daily checklists and SOPs written for your business'],
    ['chat', 'WhatsApp quick replies, greeting and away messages set up'],
    ['request_quote', 'A quotation template with GST and payment terms'],
    ['campaign', 'A week of social posts and a Canva poster'],
    ['smart_toy', 'Your own AI assistant with 2 skills, built on a free tool'],
    ['menu_book', 'A personal prompt book and a 30-day plan'],
  ],
}

export const FUNCTIONS = {
  label: 'Covered by function',
  title: "Operations first, because that's where the hours go.",
  lede: 'We start where owners lose the most time, then move to bringing in money, then to being seen.',
  rows: [
    { m: 'Module 1', ic: 'settings', n: 'Operations', core: true, chips: ['Daily checklists & SOPs', 'Stock reorder from sales data', 'Voice note to action items', 'Vendor & purchase emails'] },
    { m: 'Module 2', ic: 'trending_up', n: 'Sales', core: true, chips: ['WhatsApp quick replies', 'Quotations in 2 minutes', "Follow-ups that don't nag", 'Hot, warm, cold lead scoring'] },
    { m: 'Module 3', ic: 'campaign', n: 'Marketing', core: true, chips: ['30-day content calendar', 'Canva posters', 'Google review replies', 'Festive offer ideas'] },
    { m: 'Module 4', ic: 'support_agent', n: 'Customer service', chips: ['Complaint replies', 'FAQ answers', 'Bilingual responses'] },
    { m: 'Module 5', ic: 'payments', n: 'Finance', chips: ['Payment reminders', 'Sales sheet insights', 'Break-even maths'] },
    { m: 'Module 6', ic: 'groups', n: 'HR', chips: ['Job posts', 'Onboarding checklists', 'Staff policies in plain words'] },
  ],
}

/** Playbook formats. items: [time, heading, detail, tag] */
export const FORMATS = {
  long: {
    switch: '3–4 hour workshop',
    big: '3–4 hrs',
    title: 'AI Business Playbook workshop',
    desc: 'The full workshop. You build your own AI assistant by the end.',
    items: [
      ['0:00–0:20', 'Setup', 'AI basics, safety rules, your business context paragraph', ''],
      ['0:20–1:00', 'Operations', 'SOPs, stock reorder, voice note to actions, vendor emails', 'Operations'],
      ['1:00–1:40', 'Sales', 'Quick replies, quotations, follow-ups, lead scoring', 'Sales'],
      ['1:40–1:50', 'Break', 'Chai and questions', ''],
      ['1:50–2:30', 'Marketing', 'Content calendar, Canva posters, review replies', 'Marketing'],
      ['2:30–3:00', 'Service, finance, HR', 'Complaints, payment reminders, sales insights, job posts', 'Support'],
      ['3:00–3:45', 'Build your agent', 'A free Gemini Gem or Claude Project with 2 skills', 'Agent'],
      ['3:45–4:00', 'Close', '30-day plan, certificate, Level 2 invitation', ''],
    ],
  },
  short: {
    switch: '1-hour quick start',
    big: '1 hr',
    title: 'AI for Your Business: Quick Start',
    desc: 'A fast, practical taster. Ideal for association meetings.',
    items: [
      ['0:00–0:05', 'Setup', 'Write your business context paragraph', ''],
      ['0:05–0:20', 'Operations', 'A daily checklist and voice note to action items', 'Operations'],
      ['0:20–0:35', 'Sales', 'WhatsApp quick replies and a 2-minute quotation', 'Sales'],
      ['0:35–0:50', 'Marketing', '3 social posts and a Canva poster', 'Marketing'],
      ['0:50–1:00', 'Quick wins', 'Payment reminder, job post, live agent demo', ''],
    ],
  },
}

export const MANUAL = {
  lock: 'Locked PDF',
  cover: ['Digitner AI Academy', 'AI Business Playbook', 'Practical manual', 'Labs · Prompts · Agents'],
  cta: 'Request the manual',
  label: 'Protected PDF · Available on request',
  title: 'The manual you keep on your desk.',
  lede: 'Every chapter follows the same pattern: the goal, the steps, copy-paste prompts, a check that it worked, and space for your notes. The manual is a locked PDF, shared only with registered participants and partners.',
  toc: [
    ['Start here', 'Safety rules and free tool setup'],
    ['How to prompt', 'The R-C-T-F-E formula and 8 prompt types'],
    ['Operations', 'SOPs, stock, vendors, meeting notes'],
    ['Sales', 'Quick replies, quotes, follow-ups, leads'],
    ['Marketing', 'Content calendar, Canva, reviews'],
    ['Customer service', 'Complaints and FAQs'],
    ['Finance', 'Reminders, insights, break-even'],
    ['HR', 'Hiring and onboarding'],
    ['Build your agent', 'Instructions template and skill recipes'],
    ['Your 30-day plan', 'Fill-in tracker and glossary'],
  ],
  accessTitle: 'How access works',
  access: [
    'Request the manual with your name, business and phone.',
    'We verify and send a protected PDF for your personal use.',
    'Workshop participants receive it as part of the session.',
  ],
}

export const AGENT = {
  label: 'The final lab',
  title: 'Build an AI assistant that knows your business.',
  lede: 'No coding. You give it rules, your price list and a few skills. It drafts the reply, you approve and send.',
  steps: [
    ['Write its instructions', 'Its job, its tone, what it must never do (like invent prices)'],
    ['Give it your knowledge', 'Price list, FAQs, terms, GST rules'],
    ['Add skills', 'Saved recipes for quotes, complaints and payment follow-ups'],
    ['Test with 5 real enquiries', 'Fix the instructions each time it slips'],
  ],
}

export const TOOLS = {
  label: "Tools you'll use",
  title: 'Free first. Paid only when it pays back.',
  list: [
    ['forum', 'Free', 'ChatGPT · Gemini · Claude', 'Writing, replies, analysis'],
    ['chat', 'Free', 'WhatsApp Business', 'Quick replies, catalogue'],
    ['palette', 'Free', 'Canva', 'Posters and social posts'],
    ['description', 'Free', 'NotebookLM', 'Learn from your documents'],
    ['travel_explore', 'Free', 'Perplexity', 'Research with sources'],
    ['smart_toy', 'Free', 'Gemini Gems · Claude Projects', 'Your first AI assistant'],
    ['hub', 'Level 2', 'Zapier · Make · n8n', 'Connect your apps'],
    ['sms', 'Level 2', 'WhatsApp Business API', 'Bots and broadcasts at scale'],
  ],
}

/* ------------------------------ AI Growth Blueprint ------------------------------ */
export const BLUEPRINT = {
  label: 'Live workshop · 2 hours or 2 days',
  title: 'AI Growth Blueprint',
  lede: 'A hands-on strategy workshop for owners and leadership teams. Use AI on your own data to find your best customers, understand them, and leave with real actions your team commits to, not a report on a shelf.',
  meta: [
    ['For', 'Owners, partners, and sales, marketing or operations leads'],
    ['Formats', '2-hour Blueprint Snapshot, or the 2-day Blueprint Workshop'],
    ['Bring', 'Customer list or sales sheet, top 10 customers, recent reviews and enquiries, your price list'],
    ['After', '30-day check-in to review progress and adjust the plan'],
  ],
  outcomesTitle: 'You leave with (2-day workshop)',
  outcomes: [
    ['account_tree', 'An AI-assisted business model canvas'],
    ['target', 'Your Ideal Customer Profile (ICP) and 3 persona cards'],
    ['compare', 'A competitor analysis grid: offers, pricing, reviews, gaps'],
    ['fact_check', 'An insight board, checked with real customer calls'],
    ['rule', 'A "what will work for you" scorecard of growth plays'],
    ['star', 'Your North Star metric and the 3 input metrics that drive it'],
    ['monitoring', 'A weekly metrics dashboard'],
    ['campaign', 'A sharper offer, pitch and scripts per persona'],
    ['checklist', 'A 90-day action plan with owners, deadlines and budgets'],
  ],
  coverLabel: 'What the Blueprint covers',
  coverTitle: 'Eight building blocks, one plan',
  cover: [
    ['account_tree', 'Business model', 'Map offers, segments, channels and revenue with AI'],
    ['target', 'ICP and personas', 'Who your best customers are, and why they buy'],
    ['compare', 'Competitor analysis', 'Offers, pricing, reviews and positioning of 3–5 rivals, and the gaps you can own'],
    ['fact_check', 'Validated insights', 'Reviews, enquiries and real customer calls'],
    ['rule', 'What will work for you', 'Score growth plays on fit, impact, effort and cost for your business'],
    ['star', 'North Star metric', 'The one number that shows you are creating value'],
    ['monitoring', 'Metrics and dashboard', '3 input metrics and a weekly view that keeps the team honest'],
    ['checklist', '90-day action plan', 'Owners, deadlines, budgets and a 30-day check-in'],
  ],
  star: {
    label: 'Your North Star',
    title: "One number that tells you if you're winning.",
    lede: 'In the workshop you choose a North Star metric: the single measure that shows customers are getting value and the business is growing. Then you pick the 3 input metrics your team can move every week.',
    head: ['Business', 'Example North Star'],
    rows: [
      ['Retail shop', 'Repeat customers per month'],
      ['Manufacturer', 'Orders from ideal-fit accounts per month'],
      ['Clinic', 'Patients completing their treatment plan'],
      ['Service firm', 'Clients retained each quarter'],
    ],
  },
  agendaLabel: 'Agenda',
  agendaTitle: 'Choose your format',
  notesTitle: 'Points to note',
  notes: [
    'Bring real data: your customer list, sales sheet, reviews and enquiries. Insights are only as good as the data.',
    'AI finds patterns fast, but every insight is checked with real customer calls before it becomes an action.',
    'Remove names and phone numbers before sharing customer data with any AI tool.',
    'Keep the ICP narrow. A tight ICP beats a broad one for sales and marketing.',
    'Every action leaves the room with one owner, one deadline and one metric.',
    'Bring the decision-makers. Plans stick when the people who approve budgets build them.',
    'Revisit personas and the plan every quarter; the 30-day check-in is part of the programme.',
  ],
}

/** Blueprint agendas. items: [time, heading, detail, output] */
export const BP_AGENDA = {
  days: {
    switch: '2-day workshop',
    days: [
      {
        h: 'Day 1 · Understand',
        ic: 'travel_explore',
        sub: 'From your data to validated insights',
        items: [
          ['9:30–10:15', 'Business model canvas with AI', 'Map offers, customer segments, channels and revenue streams', 'Output: business model canvas'],
          ['10:15–11:15', 'ICP lab', 'Analyse your customer list and sales sheet with AI to find your best-fit customers', 'Output: Ideal Customer Profile'],
          ['11:30–12:30', 'Persona and journey lab', 'Build 3 personas and map how each one finds, buys and returns', 'Output: persona cards + journey map'],
          ['12:30–1:15', 'Competitor analysis', 'Tear down 3–5 competitors: offers, pricing, reviews, positioning and gaps', 'Output: competitor grid'],
          ['2:00–3:15', 'Insight sprint', 'Mine reviews and enquiries with AI; check your pricing against the market', 'Output: insight board'],
          ['3:15–4:15', 'Customer validation calls', 'Call 2–3 real customers with AI-prepared questions to test the insights', 'Output: validated insights'],
          ['4:15–5:00', 'Day 1 wrap', 'What we learned, what surprised us, what we now believe', ''],
        ],
      },
      {
        h: 'Day 2 · Decide and act',
        ic: 'rocket_launch',
        sub: 'From insights to commitments',
        items: [
          ['9:30–10:15', 'Find your North Star', 'Choose the one metric that shows value and growth, plus 3 input metrics', 'Output: North Star + input metrics'],
          ['10:15–11:15', 'What will work for you', 'Score growth plays on fit, impact, effort and cost for your business', 'Output: fit scorecard + opportunity map'],
          ['11:30–12:30', 'Offer and pitch', 'Sharpen the value proposition; write pitch, WhatsApp and email scripts per persona', 'Output: offer + scripts'],
          ['12:30–1:15', 'Channels and content', 'Where each persona is reached, and a 30-day content plan', 'Output: 30-day plan'],
          ['2:00–2:45', 'Metrics and dashboard', 'Set targets and build a simple weekly dashboard around the North Star', 'Output: metrics dashboard'],
          ['2:45–4:00', '90-day action plan', 'Top actions with one owner, one deadline, one metric and a budget each', 'Output: 90-day plan'],
          ['4:00–5:00', 'Present and commit', 'Each team presents, gets mentor feedback and books the 30-day check-in', ''],
        ],
      },
    ],
  },
  snap: {
    switch: '2-hour snapshot',
    days: [
      {
        h: 'Blueprint Snapshot · 2 hours',
        ic: 'bolt',
        sub: 'A fast, focused version for busy owners',
        items: [
          ['0:00–0:10', 'Business snapshot', 'Offers, customers and where revenue comes from', ''],
          ['0:10–0:30', 'ICP with AI', 'Find patterns in your best customers', 'Output: draft ICP'],
          ['0:30–0:50', 'Two personas', 'Pains, goals, objections and channels', 'Output: 2 persona cards'],
          ['0:50–1:10', 'Competitor quick scan', '2–3 rivals analysed with AI: offers, pricing, reviews', 'Output: competitor snapshot'],
          ['1:10–1:30', 'North Star and metrics', 'Pick your North Star and 3 input metrics', 'Output: metrics sheet'],
          ['1:30–1:50', 'What will work for you', 'Choose the top 3 actions that fit your business', 'Output: action list'],
          ['1:50–2:00', 'Next steps', 'What to do this week, and when to go deeper', ''],
        ],
      },
    ],
  },
}

/* ------------------------------ Register ------------------------------ */
export const MANUAL_FORMAT = 'Manual (PDF) request'
export const REGISTER = {
  label: 'Register',
  title: 'Bring the workshop to your team or association.',
  lede: 'We run sessions for individual businesses, industry associations and chambers. Fill in the form and send your request. The team will get back to you.',
  formats: [
    'AI Growth Blueprint · 2-day workshop',
    'AI Growth Blueprint · 2-hour snapshot',
    'AI Business Playbook · 3–4 hour workshop',
    'AI Business Playbook · 1-hour quick start',
    'Not sure yet',
    MANUAL_FORMAT,
  ],
  sizes: ['1–5', '6–20', '21–50', '50+'],
}
