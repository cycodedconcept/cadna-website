import { site } from '../data/site.js';

export function validateContact(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!values.message.trim()) errors.message = 'Tell us what you would like help with.';
  return errors;
}

export function prepareContact(values) {
  const fields = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]));
  const subject = `Growth conversation — ${fields.company || fields.name}`;
  const text = [
    'CADNA GROWTH CONVERSATION',
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    fields.company && `Company: ${fields.company}`,
    fields.phone && `Phone: ${fields.phone}`,
    fields.interest && `Area of interest: ${fields.interest}`,
    `Message:\n${fields.message}`,
  ].filter(Boolean).join('\n\n');
  return { fields, text, emailHref: `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}` };
}
