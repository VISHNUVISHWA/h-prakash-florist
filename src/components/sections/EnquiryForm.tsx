'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, Copy, Loader2, RotateCcw } from 'lucide-react';
import { budgetRanges, eventTypes } from '@/data/content';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { cn } from '@/lib/utils';

type Values = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  date: string;
  location: string;
  budget: string;
  message: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { name: '', phone: '', email: '', eventType: '', date: '', location: '', budget: '', message: '' };

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';
  const digits = v.phone.replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, '');
  if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a valid 10-digit Indian mobile number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (!v.eventType) e.eventType = 'Please choose an event type.';
  if (!v.date) e.date = 'Please choose your event date.';
  else if (v.date < todayISO()) e.date = 'The event date can’t be in the past.';
  if (v.location.trim().length < 2) e.location = 'Please enter the event location.';
  if (v.message.trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).';
  return e;
}

function whatsappPreview(v: Values) {
  const date = v.date ? new Date(v.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  return [
    `Hello H Prakash Florist 🌸`,
    ``,
    `I'd like to enquire about floral decoration.`,
    `• Name: ${v.name.trim()}`,
    `• Event: ${v.eventType}`,
    `• Date: ${date}`,
    `• Location: ${v.location.trim()}`,
    v.budget ? `• Budget: ${v.budget}` : null,
    ``,
    v.message.trim(),
  ]
    .filter((l) => l !== null)
    .join('\n');
}

function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-[0.66rem] font-medium uppercase tracking-[0.18em] text-charcoal/70">
      {children}
      {optional ? <span className="ml-1 normal-case tracking-normal text-charcoal/70">(optional)</span> : <span className="text-wine"> *</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p id={id} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-[#a3243b]">
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function EnquiryForm({ defaultEventType, note, compact }: { defaultEventType?: string; note?: string; compact?: boolean }) {
  const uid = useId();
  const [values, setValues] = useState<Values>(() => ({ ...empty, eventType: defaultEventType ?? '', message: note ?? '' }));
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');
  const [copied, setCopied] = useState(false);
  const [minDate, setMinDate] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMinDate(todayISO()), []);
  useEffect(() => {
    if (status === 'done') successRef.current?.focus();
  }, [status]);

  const set = (key: keyof Values, val: string) => {
    const next = { ...values, [key]: val };
    setValues(next);
    if (touched[key]) setErrors(validate(next));
  };
  const blur = (key: keyof Values) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(empty).map((k) => [k, true])));
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus('submitting');
    window.setTimeout(() => setStatus('done'), 900);
  };

  const reset = () => {
    setValues({ ...empty, eventType: defaultEventType ?? '' });
    setTouched({});
    setErrors({});
    setStatus('idle');
    setCopied(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(whatsappPreview(values));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const err = (key: keyof Values) => (touched[key] ? errors[key] : undefined);
  const field = (key: keyof Values) => ({
    id: `${uid}-${key}`,
    name: key,
    value: values[key],
    onBlur: () => blur(key),
    'aria-invalid': err(key) ? true : undefined,
    'aria-describedby': err(key) ? `${uid}-${key}-err` : undefined,
  });

  if (status === 'done') {
    return (
      <motion.div
        ref={successRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="outline-none"
        role="status"
      >
        <span className="grid size-14 place-items-center rounded-full bg-sage/20 text-burgundy">
          <Check aria-hidden className="size-6" strokeWidth={1.6} />
        </span>
        <p className="display mt-5 text-4xl text-burgundy">Thank you, {values.name.trim().split(' ')[0]}.</p>
        <div className="mt-4 rounded-xl border border-gold/50 bg-gold-soft/30 p-4 text-sm leading-relaxed text-charcoal/80">
          <strong className="font-medium text-burgundy">This is a simulated submission.</strong> This website is a frontend demo, so your enquiry has{' '}
          <strong className="font-medium">not</strong> been sent to H Prakash Florist and no data has left your browser.
        </div>

        <div className="mt-6">
          <p className="flex items-center gap-2 text-[0.66rem] font-medium uppercase tracking-[0.18em] text-charcoal/70">
            <WhatsAppIcon className="size-4 text-sage" /> WhatsApp message preview
          </p>
          <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl bg-cream p-4 font-sans text-[0.82rem] leading-relaxed text-charcoal/85">
            {whatsappPreview(values)}
          </pre>
          <p className="mt-2 text-xs text-charcoal/70">The business’s WhatsApp number will be added once it has been verified.</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={copy} className="btn btn-primary">
            {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" strokeWidth={1.5} />}
            {copied ? 'Copied' : 'Copy Message'}
          </button>
          <button type="button" onClick={reset} className="btn btn-outline">
            <RotateCcw aria-hidden className="size-4" strokeWidth={1.5} /> New Enquiry
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {copied ? 'Message copied to clipboard' : ''}
        </p>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={cn('grid gap-x-8 gap-y-6 sm:grid-cols-2', compact && 'gap-y-5')}>
      <div>
        <FieldLabel htmlFor={`${uid}-name`}>Full Name</FieldLabel>
        <input {...field('name')} onChange={(e) => set('name', e.target.value)} autoComplete="name" className="field" placeholder="Your name" />
        <FieldError id={`${uid}-name-err`} message={err('name')} />
      </div>
      <div>
        <FieldLabel htmlFor={`${uid}-phone`}>Mobile Number</FieldLabel>
        <input
          {...field('phone')}
          onChange={(e) => set('phone', e.target.value)}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className="field"
          placeholder="+91 98XXX XXXXX"
        />
        <FieldError id={`${uid}-phone-err`} message={err('phone')} />
      </div>
      <div>
        <FieldLabel htmlFor={`${uid}-email`}>Email Address</FieldLabel>
        <input {...field('email')} onChange={(e) => set('email', e.target.value)} type="email" autoComplete="email" className="field" placeholder="you@example.com" />
        <FieldError id={`${uid}-email-err`} message={err('email')} />
      </div>
      <div>
        <FieldLabel htmlFor={`${uid}-eventType`}>Event Type</FieldLabel>
        <select {...field('eventType')} onChange={(e) => set('eventType', e.target.value)} className={cn('field appearance-none pr-6', !values.eventType && 'text-charcoal/45')} style={{ backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '16px', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234B0F1C' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
          <option value="" disabled>
            Select an occasion
          </option>
          {eventTypes.map((t) => (
            <option key={t} value={t} className="text-charcoal">
              {t}
            </option>
          ))}
        </select>
        <FieldError id={`${uid}-eventType-err`} message={err('eventType')} />
      </div>
      <div>
        <FieldLabel htmlFor={`${uid}-date`}>Event Date</FieldLabel>
        <input {...field('date')} onChange={(e) => set('date', e.target.value)} type="date" min={minDate} className={cn('field', !values.date && 'text-charcoal/45')} />
        <FieldError id={`${uid}-date-err`} message={err('date')} />
      </div>
      <div>
        <FieldLabel htmlFor={`${uid}-location`}>Event Location</FieldLabel>
        <input {...field('location')} onChange={(e) => set('location', e.target.value)} autoComplete="address-level2" className="field" placeholder="Venue / area, city" />
        <FieldError id={`${uid}-location-err`} message={err('location')} />
      </div>
      <div className="sm:col-span-2">
        <FieldLabel htmlFor={`${uid}-budget`} optional>
          Approximate Budget
        </FieldLabel>
        <select {...field('budget')} onChange={(e) => set('budget', e.target.value)} className={cn('field appearance-none pr-6', !values.budget && 'text-charcoal/45')} style={{ backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '16px', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234B0F1C' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
          <option value="">Select a range</option>
          {budgetRanges.map((b) => (
            <option key={b} value={b} className="text-charcoal">
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <FieldLabel htmlFor={`${uid}-message`}>Message / Decoration Requirements</FieldLabel>
        <textarea
          {...field('message')}
          onChange={(e) => set('message', e.target.value)}
          rows={compact ? 3 : 4}
          className="field resize-none"
          placeholder="Theme, colours, flowers you love, venue details…"
        />
        <FieldError id={`${uid}-message-err`} message={err('message')} />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-charcoal/70 sm:max-w-xs">
          Demo form: submissions are simulated and nothing is sent.
        </p>
        <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
          {status === 'submitting' ? <Loader2 aria-hidden className="size-4 animate-spin" /> : null}
          {status === 'submitting' ? 'Preparing…' : 'Request a Consultation'}
          {status !== 'submitting' && <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />}
        </button>
      </div>
    </form>
  );
}
