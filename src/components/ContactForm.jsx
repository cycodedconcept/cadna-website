import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { solutions } from '../data/growth';
import { site } from '../data/site';
import { prepareContact, validateContact } from '../utils/contact';
import { downloadText } from '../utils/download';
import styles from './ContactForm.module.css';
import growth from './Growth.module.css';

const initialValues = { name: '', email: '', company: '', phone: '', interest: '', message: '' };

export function ContactForm() {
  const id = useId();
  const form = useRef(null);
  const resultHeading = useRef(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [prepared, setPrepared] = useState(null);
  const [copying, setCopying] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => { if (prepared) resultHeading.current?.focus(); }, [prepared]);

  function update(event) {
    const { name, value } = event.target;
    setValues(previous => ({ ...previous, [name]: value }));
    setErrors(previous => ({ ...previous, [name]: undefined }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) { form.current.elements.namedItem(firstError)?.focus(); return; }
    setPrepared(prepareContact(values));
    setFeedback(null);
  }

  async function copyMessage() {
    setCopying(true);
    setFeedback(null);
    try {
      await navigator.clipboard.writeText(prepared.text);
      setFeedback({ message: 'Message copied. Paste it into your email to CADNA.' });
    } catch {
      setFeedback({ error: true, message: 'Copying is unavailable in this browser. Download your message or open your email app instead.' });
    } finally { setCopying(false); }
  }

  function field(name, label, { type = 'text', autoComplete, required = false, maxLength = 120 } = {}) {
    return <div className={styles.field}>
      <label htmlFor={`${id}-${name}`}>{label}{!required && <span> (optional)</span>}</label>
      <input id={`${id}-${name}`} name={name} type={type} autoComplete={autoComplete} required={required} maxLength={maxLength} value={values[name]} onChange={update} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${id}-${name}-error` : undefined} />
      {errors[name] && <span className={styles.error} id={`${id}-${name}-error`}>{errors[name]}</span>}
    </div>;
  }

  return <div id="contact-form" className={styles.panel}>
    {prepared ? <section aria-labelledby={`${id}-result`}>
      <span className={growth.eyebrow}>READY FOR YOUR EMAIL APP</span>
      <h2 id={`${id}-result`} ref={resultHeading} tabIndex={-1}>Your message is ready.</h2>
      <p>Nothing has been sent yet. Open your email app, review the message and send it to <strong>{site.email}</strong>.</p>
      <dl className={styles.review}>{[['Name', prepared.fields.name], ['Email', prepared.fields.email], ['Company', prepared.fields.company], ['Phone', prepared.fields.phone], ['Interest', prepared.fields.interest], ['Message', prepared.fields.message]].filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <a className={growth.primaryButton} href={prepared.emailHref}>Open email to send <span aria-hidden="true">↗</span></a>
      <div className={styles.alternatives}>
        <button type="button" onClick={copyMessage} disabled={copying} aria-busy={copying}>{copying ? 'Copying…' : 'Copy message'}</button>
        <button type="button" onClick={() => { try { downloadText(prepared.text, 'cadna-growth-conversation.txt'); } catch { setFeedback({ error: true, message: 'The download could not start. Copy your message or open your email app instead.' }); } }}>Download message</button>
        <button type="button" onClick={() => { setPrepared(null); setFeedback(null); requestAnimationFrame(() => form.current?.elements.namedItem('name')?.focus()); }}>Edit details</button>
      </div>
      {feedback && <p className={feedback.error ? styles.error : styles.feedback} role={feedback.error ? 'alert' : 'status'}>{feedback.message}</p>}
    </section> : <form ref={form} noValidate onSubmit={submit} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`}>What would you like to move forward?</h2>
      <p>Start with your goal. Only your name, email and message are required.</p>
      <div className={styles.fields}>
        {field('name', 'Name', { required: true, autoComplete: 'name' })}
        {field('email', 'Email', { required: true, type: 'email', autoComplete: 'email', maxLength: 180 })}
        {field('company', 'Company', { autoComplete: 'organization', maxLength: 180 })}
        {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel', maxLength: 40 })}
        <div className={`${styles.field} ${styles.full}`}><label htmlFor={`${id}-interest`}>Area of interest <span>(optional)</span></label><select id={`${id}-interest`} name="interest" value={values.interest} onChange={update}><option value="">Help me find the right starting point</option>{solutions.map(solution => <option key={solution.key}>{solution.title}</option>)}<option>Market access & partnerships</option><option>Growth diagnostic</option></select></div>
        <div className={`${styles.field} ${styles.full}`}><label htmlFor={`${id}-message`}>Your business goal</label><textarea id={`${id}-message`} name="message" required rows={5} maxLength={2000} value={values.message} onChange={update} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${id}-message-error` : undefined} placeholder="Where is your business today, and what would you like to achieve?" />{errors.message && <span className={styles.error} id={`${id}-message-error`}>{errors.message}</span>}</div>
      </div>
      {Object.values(errors).some(Boolean) && <p role="alert" className={styles.error}>Please check the highlighted fields before continuing.</p>}
      <p className={styles.notice}>This form prepares an email for you to send from your email app. Read our <Link to="/privacy">Privacy Policy</Link>.</p>
      <button type="submit" className={growth.primaryButton}>Prepare my message <span aria-hidden="true">→</span></button>
    </form>}
  </div>;
}
