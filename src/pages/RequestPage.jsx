import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import logo from '../assets/cadna-logo-white.webp';
import { Icon } from '../components/Icon';
import { serviceOptions, requestModes, requestStages, budgetOptions } from '../data/requests';
import { subscriptionPlans } from '../data/subscriptions';
import { legalDocuments } from '../data/legal';
import { downloadText } from '../utils/download';
import styles from './RequestPage.module.css';
import growth from '../components/Growth.module.css';

const needs = [
  ['Business', 'Start or grow a business', 'Structuring, strategy, governance, expansion'],
  ['Financial', 'Explore capital solutions', 'Funding readiness, capital structuring, trade finance'],
  ['Education', 'Develop people and capability', 'Executive training, coaching, leadership'],
  ['Technology', 'Build or improve technology', 'Websites, applications, automation, AI integration'],
  ['Other', 'Explore a partnership or another need', 'Market access, introductions and business opportunities'],
];
const steps = ['Your details', 'Your priorities', 'Your brief', 'Business context'];
const consentText = 'I confirm that the information in this request is accurate, that I am authorized to make this request, and that I accept the CADNA website Terms & Conditions and acknowledge the Privacy Policy.';

function Select({ label, value, options, onChange, required = false }) {
  return <label>{label}<select aria-label={label} required={required} value={value} onChange={event => onChange(event.target.value)}><option value="">{required ? 'Please select' : 'Select if applicable'}</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select></label>;
}

export function RequestPage() {
  const [search] = useSearchParams();
  const initialMode = Object.hasOwn(requestModes, search.get('mode')) ? search.get('mode') : 'conversation';
  const [mode, setMode] = useState(initialMode);
  const [step, setStep] = useState(0);
  const [review, setReview] = useState(false);
  const [error, setError] = useState('');
  const [signature, setSignature] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [record, setRecord] = useState(null);
  const [preparing, setPreparing] = useState(false);
  const [data, setData] = useState(() => {
    const category = Object.hasOwn(serviceOptions, search.get('category')) ? search.get('category') : '';
    const service = serviceOptions[category]?.includes(search.get('service')) ? search.get('service') : '';
    return { name: '', email: '', phone: '', position: '', company: '', country: '', website: '', industry: '', employees: '', category, services: service ? [service] : [], areas: category ? [category] : [], description: search.get('interest') ? `I would like to discuss ${search.get('interest')}.` : '', stage: '', budget: '', timeline: '', support: '', plan: subscriptionPlans.some(plan => plan.id === search.get('plan')) ? search.get('plan') : '', funding: '', file: null };
  });
  const heading = useRef(null);
  const previousView = useRef({ step, review });
  useEffect(() => {
    if (previousView.current.step === step && previousView.current.review === review) return;
    previousView.current = { step, review };
    heading.current?.focus();
  }, [step, review]);
  const update = (key, value) => setData(previous => ({ ...previous, [key]: value }));
  const toggleService = service => update('services', data.services.includes(service) ? data.services.filter(item => item !== service) : [...data.services, service]);
  const selectCategory = category => setData(previous => ({ ...previous, category, services: previous.services.filter(service => serviceOptions[category].includes(service)), areas: [...new Set([...previous.areas, category])] }));
  const next = () => {
    let issue = '';
    if (step === 0 && !data.name.trim()) issue = 'Please enter your full name.';
    else if (step === 0 && !/^\S+@\S+\.\S+$/.test(data.email.trim())) issue = 'Please enter a valid email address.';
    else if (step === 1 && !data.category) issue = 'Please select a main priority.';
    else if (step === 2 && !data.description.trim()) issue = 'Please describe your business goal.';
    else if (step === 2 && data.category === 'Financial' && data.funding && (!Number.isFinite(Number(data.funding)) || Number(data.funding) <= 0 || Number(data.funding) > 1e15)) issue = 'Please enter a positive funding amount up to ₦1,000,000,000,000,000.';
    setError(issue);
    if (issue) return;
    if (step < 3) setStep(step + 1);
    else setReview(true);
  };
  const selectedPlan = subscriptionPlans.find(plan => plan.id === data.plan);
  const summary = [
    ['Request type', requestModes[mode].label], ['Name', data.name.trim()], ['Email', data.email.trim()], ['Phone', data.phone], ['Position', data.position], ['Business', data.company], ['Country', data.country], ['Website', data.website], ['Industry', data.industry], ['Employees', data.employees], ['Main priority', data.category], ['Services', data.services.join(', ')], ['Additional support', data.areas.filter(area => area !== data.category).join(', ')],
    ['Business goal', data.description], ['Funding sought', data.category === 'Financial' && data.funding ? `₦${Number(data.funding).toLocaleString('en-NG')}` : ''], ['Business stage', data.stage], ['Indicative budget', data.budget], ['Timeline', data.timeline], ['Support required', data.support], ['Preferred plan', selectedPlan ? `${selectedPlan.name} — ${selectedPlan.billing}` : 'Let CADNA recommend'],
    ...(data.file ? [['Supporting document', `${data.file.name} (attach separately)`]] : []),
  ].filter(([, value]) => value);
  const brief = `CADNA SERVICE REQUEST\n\n${summary.map(([label, value]) => `${label}: ${value}`).join('\n\n')}\n\nQUOTATION: CADNA will assess this request and confirm the scope, timeline and fees. No service engagement or payment has been approved by preparing this request.`;
  const documentText = record ? `${record.brief}\n\nREQUEST ACKNOWLEDGMENT\nReference: ${record.reference}\nTyped name: ${record.name}\nRecorded at: ${record.timestamp}\n${consentText}\nTerms version: ${record.termsVersion}\nPrivacy version: ${record.privacyVersion}\nRecord SHA-256: ${record.digest}\n\nPrepared locally for sharing with CADNA. This is a request acknowledgment, not a signed quotation, invoice or service engagement.` : brief;
  const emailHref = `mailto:concierge@cadnagsl.com?subject=${encodeURIComponent(`${requestModes[mode].label} — ${data.company || data.name}`)}&body=${encodeURIComponent(documentText)}`;

  async function acknowledge() {
    setError('');
    if (!accepted) { setError('Please read and accept the website terms before preparing your acknowledgment.'); return; }
    if (signature.trim().toLocaleLowerCase() !== data.name.trim().toLocaleLowerCase()) { setError('Type your full name as entered in your contact details.'); return; }
    setPreparing(true);
    try {
      const receipt = { reference: `CADNA-REQ-${crypto.randomUUID()}`, name: signature.trim(), email: data.email.trim(), timestamp: new Date().toISOString(), termsVersion: legalDocuments.terms.version, privacyVersion: legalDocuments.privacy.version, consent: consentText, brief };
      const payload = JSON.stringify({ ...receipt, terms: legalDocuments.terms.content, privacy: legalDocuments.privacy.content });
      const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload));
      setRecord({ ...receipt, digest: Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('') });
    } catch { setError('The acknowledgment could not be prepared. Please try again in a secure browser session.'); }
    finally { setPreparing(false); }
  }
  function downloadBrief() {
    downloadText(documentText, `${record?.reference || 'cadna-service-request'}.txt`);
  }
  function editBrief() { setRecord(null); setAccepted(false); setSignature(''); setError(''); setReview(false); }

  return <main id="main-content" tabIndex={-1} className={styles.shell}>
    <header><Link to="/" aria-label="CADNA home"><img src={logo} alt="CADNA GSL" /></Link><Link to="/">← BACK TO HOME</Link></header>
    {review ? <section className={styles.review}>
      <span className={styles.reviewIcon}><Icon name="check" size={30} /></span><span className={growth.eyebrow}>{record ? 'READY TO SHARE' : 'REVIEW YOUR REQUEST'}</span>
      <h1 ref={heading} tabIndex={-1}>{record ? 'Your request is ready to share.' : 'Your next step, clearly defined.'}</h1><p>Review your details and prepare your acknowledgment. You can then email the request to CADNA or download a copy. Nothing has been sent yet.</p>
      <dl className={styles.summary}>{summary.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <div className={styles.quoteNote}><h2>Your tailored quotation</h2><p>CADNA will review your requirements, recommend a plan or one-time engagement, and confirm your scope, timeline and fees. Capital success fees, third-party costs and major implementation work are agreed separately.</p>{selectedPlan && <p><strong>{selectedPlan.name}:</strong> {selectedPlan.billing}. {selectedPlan.id === 'lite' ? 'Free access to selected resources; the team will confirm your access.' : 'Your annual quote will confirm the level of support.'}</p>}</div>
      {data.file && <p className={styles.attachmentNote}>Attach <strong>{data.file.name}</strong> manually in your email app. The document has not been uploaded.</p>}
      <div className={styles.acknowledgment}>
        <h2>Request acknowledgment</h2><p>This acknowledgment covers your request and the website terms. CADNA will provide service-specific agreements with your quotation.</p>
        {record ? <div role="status"><p><strong>{record.name}</strong> · {new Date(record.timestamp).toLocaleString('en-GB')}</p><p className={styles.reference}>{record.reference}</p><p>Your download includes this acknowledgment and its document reference.</p></div> : <>
          <p><Link to="/terms" target="_blank" rel="noopener noreferrer">Read Terms & Conditions ↗</Link> · <Link to="/privacy" target="_blank" rel="noopener noreferrer">Read Privacy Policy ↗</Link></p>
          <label>Type your full name<input autoComplete="name" maxLength={120} value={signature} onChange={event => setSignature(event.target.value)} placeholder={data.name} /></label>
          <label className={styles.consent}><input type="checkbox" checked={accepted} onChange={event => setAccepted(event.target.checked)} /><span>{consentText}</span></label>
          <button className={growth.primaryButton} type="button" disabled={preparing} onClick={acknowledge}>{preparing ? 'Preparing…' : 'Acknowledge & prepare request'}</button>
        </>}
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={styles.reviewActions}>{record && <><a className={growth.primaryButton} href={emailHref}>Open email with my request <span aria-hidden="true">↗</span></a><button className={growth.secondaryButton} type="button" onClick={downloadBrief}>Download request</button></>}<button type="button" className={styles.editBrief} onClick={editBrief}>← Edit my request</button></div>
    </section> : <section className={styles.layout}>
      <aside><span>{requestModes[mode].label.toUpperCase()}</span><h1>{requestModes[mode].heading}</h1><p>Share your priorities, business context and the support you need. CADNA will use your brief to shape the right next step.</p><ol>{steps.map((label, index) => <li className={index === step ? styles.current : ''} aria-current={index === step ? 'step' : undefined} key={label}><b>0{index + 1}</b>{label}</li>)}</ol><p className={styles.contactHint}>Prefer to talk directly?<br /><a href="mailto:concierge@cadnagsl.com">concierge@cadnagsl.com</a></p></aside>
      <form noValidate onSubmit={event => { event.preventDefault(); next(); }} aria-label="Prepare your service request">
        <div className={styles.progress}><span aria-live="polite">STEP {step + 1} OF 4 · {steps[step]}</span><i style={{ width: `${(step + 1) * 25}%` }} /></div>
        {step === 0 && <fieldset><legend className="srOnly">Your details</legend><h2 ref={heading} tabIndex={-1}>Let’s start with you.</h2><p>Your preferred contact details</p>
          <label>Full name<input autoComplete="name" required maxLength={120} value={data.name} onChange={event => update('name', event.target.value)} placeholder="Your full name" /></label>
          <label>Email address<input autoComplete="email" type="email" required maxLength={180} value={data.email} onChange={event => update('email', event.target.value)} placeholder="you@company.com" /></label>
          <label>Phone (optional)<input autoComplete="tel" type="tel" maxLength={40} value={data.phone} onChange={event => update('phone', event.target.value)} placeholder="+234" /></label>
          <label>Business / company name (optional)<input autoComplete="organization" maxLength={180} value={data.company} onChange={event => update('company', event.target.value)} /></label>
          <label>Job title / position (optional)<input autoComplete="organization-title" maxLength={120} value={data.position} onChange={event => update('position', event.target.value)} /></label>
          <label>Country (optional)<input autoComplete="country-name" maxLength={100} value={data.country} onChange={event => update('country', event.target.value)} /></label>
        </fieldset>}
        {step === 1 && <fieldset><legend className="srOnly">Your priorities</legend><h2 ref={heading} tabIndex={-1}>What would you like to move forward?</h2><p>Select your main priority, then choose any relevant services.</p>
          <label>Request type<select aria-label="Request type" value={mode} onChange={event => setMode(event.target.value)}>{Object.entries(requestModes).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select></label>
          <div className={styles.options}>{needs.map(([key, label, description]) => <button type="button" aria-pressed={data.category === key} className={data.category === key ? styles.selected : ''} key={key} onClick={() => selectCategory(key)}><i aria-hidden="true" /><span><b>{label}</b><small>{description}</small></span></button>)}</div>
          {data.category && <div className={styles.chips} role="group" aria-label="Select services"><span>Services (select all that apply)</span><div>{serviceOptions[data.category].map(service => <button type="button" aria-pressed={data.services.includes(service)} className={data.services.includes(service) ? styles.selected : ''} key={service} onClick={() => toggleService(service)}>{service}</button>)}</div></div>}
        </fieldset>}
        {step === 2 && <fieldset><legend className="srOnly">Your brief</legend><h2 ref={heading} tabIndex={-1}>Tell us about your ambition.</h2><p>What would progress look like for your business?</p><label>Describe your business goal<textarea rows="7" required maxLength={2000} value={data.description} onChange={event => update('description', event.target.value)} placeholder="Share the challenge, opportunity or idea you want to work on." /></label>
          {data.category === 'Financial' && <label>Funding sought in naira (optional)<input type="number" min="1" max="1000000000000000" inputMode="numeric" value={data.funding} onChange={event => update('funding', event.target.value)} placeholder="Amount you would like to discuss" /></label>}
          <label className={styles.file}>Supporting document (optional)<input type="file" accept="image/*,application/pdf" onChange={event => { const file = event.target.files?.[0]; if (file && file.size > 5 * 1024 * 1024) { setError('Choose a document smaller than 5 MB.'); event.target.value = ''; update('file', null); return; } setError(''); update('file', file || null); }} /><span>{data.file ? data.file.name : 'Image or PDF, up to 5 MB. Attach it separately when you email your request.'}</span></label>
        </fieldset>}
        {step === 3 && <fieldset><legend className="srOnly">Business context</legend><h2 ref={heading} tabIndex={-1}>A little context.</h2><p>Optional details to help shape your quotation</p>
          <Select label="Business stage" value={data.stage} options={requestStages} onChange={value => update('stage', value)} />
          <Select label="Industry / sector" value={data.industry} options={['Agriculture & Agribusiness', 'Finance & Investment', 'Technology', 'Logistics & Transportation', 'Real Estate & Construction', 'Education & Training', 'Healthcare', 'Manufacturing', 'Retail & Consumer', 'Professional Services', 'Energy', 'Hospitality & Tourism', 'Other']} onChange={value => update('industry', value)} />
          <Select label="Number of employees" value={data.employees} options={['1–5', '6–20', '21–50', '51–100', '100+']} onChange={value => update('employees', value)} />
          <label>Business website / social media (optional)<input maxLength={250} value={data.website} onChange={event => update('website', event.target.value)} placeholder="Your business URL" /></label>
          <Select label="Indicative budget" value={data.budget} options={budgetOptions} onChange={value => update('budget', value)} />
          <Select label="Timeline" value={data.timeline} options={['Exploring options', 'Normal delivery', 'Priority delivery', 'Accelerated delivery', 'Urgent / expedited']} onChange={value => update('timeline', value)} />
          <Select label="Level of support" value={data.support} options={['Let CADNA recommend', 'Advisory only', 'Advisory + coordination', 'Advisory + execution management', 'End-to-end concierge execution']} onChange={value => update('support', value)} />
          <label>Preferred plan<select aria-label="Preferred plan" value={data.plan} onChange={event => update('plan', event.target.value)}><option value="">Let CADNA recommend / bespoke project</option>{subscriptionPlans.map(plan => <option value={plan.id} key={plan.id}>{plan.name} — {plan.title}</option>)}</select></label>
          <div className={styles.chips} role="group" aria-label="Additional support areas"><span>Other areas where you need support</span><div>{needs.filter(([key]) => key !== data.category).map(([key]) => <button type="button" key={key} aria-pressed={data.areas.includes(key)} className={data.areas.includes(key) ? styles.selected : ''} onClick={() => update('areas', data.areas.includes(key) ? data.areas.filter(area => area !== key) : [...data.areas, key])}>{key}</button>)}</div></div>
        </fieldset>}
        {error && <p className={styles.error} role="alert">{error}</p>}
        <div className={styles.controls}><button type="button" onClick={() => { setError(''); setStep(Math.max(0, step - 1)); }} disabled={step === 0}>← Back</button><button type="submit">{step === 3 ? 'Review my request →' : 'Continue →'}</button></div><p className={styles.formNote}>Your details stay in this page until you choose to email or download your request. <Link to="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy ↗</Link></p>
      </form>
    </section>}
  </main>;
}
