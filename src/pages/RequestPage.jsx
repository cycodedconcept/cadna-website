import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import logo from '../assets/cadna-logo-white.png';
import { Icon } from '../components/Icon';
import styles from './RequestPage.module.css';
import growth from '../components/Growth.module.css';

const needs = [
  ['Business', 'Start or grow a business', 'Structuring, strategy, governance, expansion'],
  ['Financial', 'Explore capital solutions', 'Funding readiness, capital structuring, trade finance'],
  ['Education', 'Develop people and capability', 'Executive training, coaching, leadership'],
  ['Technology', 'Build or improve technology', 'Websites, applications, automation, AI integration'],
  ['Other', 'Explore a partnership or another need', 'Start with your ambition — we’ll help connect the dots'],
];
const steps = ['Your details', 'Your priorities', 'Your brief', 'Business context'];

export function RequestPage() {
  const [search] = useSearchParams();
  const [step, setStep] = useState(0);
  const [review, setReview] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(() => ({ name: '', email: '', phone: '', category: needs.some(([key]) => key === search.get('category')) ? search.get('category') : '', description: search.get('interest') ? `I would like to discuss ${search.get('interest')}.` : '', stage: '', budget: '', timeline: '', file: null }));
  const heading = useRef(null);
  const previousView = useRef({ step, review });
  useEffect(() => {
    if (previousView.current.step === step && previousView.current.review === review) return;
    previousView.current = { step, review };
    heading.current?.focus();
  }, [step, review]);
  const update = (key, value) => setData(previous => ({ ...previous, [key]: value }));
  const next = () => {
    let issue = '';
    if (step === 0 && !data.name.trim()) issue = 'Please enter your full name.';
    else if (step === 0 && !/^\S+@\S+\.\S+$/.test(data.email)) issue = 'Please enter a valid email address.';
    else if (step === 1 && !data.category) issue = 'Please select a priority.';
    else if (step === 2 && !data.description.trim()) issue = 'Please describe your business goal.';
    setError(issue);
    if (issue) return;
    if (step < 3) setStep(step + 1);
    else setReview(true);
  };
  const summary = [
    ['Name', data.name], ['Email', data.email], ['Phone', data.phone], ['Priority', data.category],
    ['Business goal', data.description], ['Business stage', data.stage], ['Budget', data.budget], ['Timeline', data.timeline],
    ...(data.file ? [['Supporting document', `${data.file.name} (attach separately)`]] : []),
  ].filter(([, value]) => value);
  const brief = `CADNA GROWTH CONVERSATION\n\n${summary.map(([label, value]) => `${label}: ${value}`).join('\n\n')}`;
  const emailHref = `mailto:concierge@cadnagsl.com?subject=${encodeURIComponent(`Growth conversation — ${data.category || 'Business enquiry'}`)}&body=${encodeURIComponent(brief)}`;
  function downloadBrief() {
    const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'cadna-growth-brief.txt'; document.body.append(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <main id="main-content" className={styles.shell}>
    <header><Link to="/" aria-label="CADNA home"><img src={logo} alt="CADNA GSL" /></Link><Link to="/">← BACK TO HOME</Link></header>
    {review ? <section className={styles.review}>
      <span className={styles.reviewIcon}><Icon name="check" size={30} /></span><span className={growth.eyebrow}>READY FOR A CONVERSATION</span>
      <h1 ref={heading} tabIndex={-1}>Your growth brief is ready.</h1><p>Review your details below. Open your email app to send your brief to CADNA, or download a copy to share. Nothing has been sent yet.</p>
      <dl className={styles.summary}>{summary.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      {data.file && <p className={styles.attachmentNote}>Attach <strong>{data.file.name}</strong> manually in your email app. The document has not been uploaded.</p>}
      <div className={styles.reviewActions}><a className={growth.primaryButton} href={emailHref}>Open email with my brief <span aria-hidden="true">↗</span></a><button className={growth.secondaryButton} type="button" onClick={downloadBrief}>Download brief</button><button type="button" className={styles.editBrief} onClick={() => setReview(false)}>← Edit my brief</button></div>
    </section> : <section className={styles.layout}>
      <aside><span>START A GROWTH CONVERSATION</span><h1>Your ambition.<br />Our starting point.</h1><p>Tell us where you are and what you want to achieve. Prepare a short brief to share with the CADNA team.</p><ol>{steps.map((label, index) => <li className={index === step ? styles.current : ''} aria-current={index === step ? 'step' : undefined} key={label}><b>0{index + 1}</b>{label}</li>)}</ol><p className={styles.contactHint}>Prefer to talk directly?<br /><a href="mailto:concierge@cadnagsl.com">concierge@cadnagsl.com</a></p></aside>
      <form noValidate onSubmit={event => { event.preventDefault(); next(); }} aria-label="Prepare your growth brief">
        <div className={styles.progress}><span aria-live="polite">STEP {step + 1} OF 4 · {steps[step]}</span><i style={{ width: `${(step + 1) * 25}%` }} /></div>
        {step === 0 && <fieldset><legend className="srOnly">Your details</legend><h2 ref={heading} tabIndex={-1}>Let’s start with you.</h2><p>Your preferred contact details</p><label>Full name <input autoComplete="name" required maxLength={120} value={data.name} onChange={event => update('name', event.target.value)} placeholder="Your full name" /></label><label>Email address <input autoComplete="email" type="email" required maxLength={180} value={data.email} onChange={event => update('email', event.target.value)} placeholder="you@company.com" /></label><label>Phone (optional)<input autoComplete="tel" type="tel" maxLength={40} value={data.phone} onChange={event => update('phone', event.target.value)} placeholder="+234" /></label></fieldset>}
        {step === 1 && <fieldset><legend className="srOnly">Your priorities</legend><h2 ref={heading} tabIndex={-1}>What would you like to move forward?</h2><p>Select your main priority</p><div className={styles.options}>{needs.map(([key, label, description]) => <button type="button" aria-pressed={data.category === key} className={data.category === key ? styles.selected : ''} key={key} onClick={() => update('category', key)}><i aria-hidden="true" /><span><b>{label}</b><small>{description}</small></span></button>)}</div></fieldset>}
        {step === 2 && <fieldset><legend className="srOnly">Your brief</legend><h2 ref={heading} tabIndex={-1}>Tell us about your ambition.</h2><p>What would progress look like for your business?</p><label>Describe your business goal<textarea rows="7" required maxLength={2000} value={data.description} onChange={event => update('description', event.target.value)} placeholder="Share the challenge, opportunity or idea you want to work on." /></label><label className={styles.file}>Supporting document (optional)<input type="file" accept="image/*,application/pdf" onChange={event => { const file = event.target.files?.[0]; if (file && file.size > 5 * 1024 * 1024) { setError('Choose a document smaller than 5 MB.'); event.target.value = ''; update('file', null); return; } setError(''); update('file', file || null); }} /><span>{data.file ? data.file.name : 'Image or PDF, up to 5 MB. Attach it separately when you email your brief.'}</span></label></fieldset>}
        {step === 3 && <fieldset><legend className="srOnly">Business context</legend><h2 ref={heading} tabIndex={-1}>A little context.</h2><p>Optional details to guide the conversation</p>{[
          ['stage', 'Business stage', ['Idea', 'Early stage', 'Growing business', 'Corporate / Institution']],
          ['budget', 'Indicative budget', ['To be discussed', 'Under ₦3M', '₦3M – ₦15M', '₦15M+']],
          ['timeline', 'Timeline', ['As soon as possible', 'Within a month', '1–3 months', 'Exploring options']],
        ].map(([key, label, options]) => <div className={styles.chips} key={key} role="group" aria-label={label}><span>{label}</span><div>{options.map(option => <button className={data[key] === option ? styles.selected : ''} type="button" aria-pressed={data[key] === option} onClick={() => update(key, data[key] === option ? '' : option)} key={option}>{option}</button>)}</div></div>)}</fieldset>}
        {error && <p className={styles.error} role="alert">{error}</p>}
        <div className={styles.controls}><button type="button" onClick={() => { setError(''); setStep(Math.max(0, step - 1)); }} disabled={step === 0}>← Back</button><button type="submit">{step === 3 ? 'Review my brief →' : 'Continue →'}</button></div><p className={styles.formNote}>Your details stay in this page until you choose to email or download your brief.</p>
      </form>
    </section>}
  </main>;
}
