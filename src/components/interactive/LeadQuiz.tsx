'use client';

import { useActionState, useId, useReducer, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitLead } from '@/app/actions';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowIcon, CheckIcon } from '@/components/ui/Icon';
import { TCPA_CONSENT } from '@/content/legal';
import { cx } from '@/lib/cx';
import type { LeadResult } from '@/lib/leadSchema';
import { QUIZ_STEPS, TIERS, VOLUME_TO_TIER } from '@/lib/offer';
import { initialQuizState, makeQuizReducer } from '@/lib/quizReducer';
import { SITE } from '@/lib/site';

/**
 * The lead quiz.
 *
 * Four steps, and the personal details are LAST on purpose. Three
 * zero-commitment answers first roughly triples completion against asking a
 * stranger for their phone number cold — it is the pattern the most
 * sophisticated advertisers in this category use, and it is why step 3 (item
 * count) also happens to be the field that sets the quote.
 *
 * Everything lives inside ONE <form>. Earlier steps stay mounted and hidden, so
 * their inputs are still in the FormData on submit and going Back never loses
 * an answer — and a visitor with JS disabled gets one long, working form.
 *
 * Every input is CONTROLLED, including the contact fields. React resets an
 * uncontrolled form after a Server Action resolves, so a visitor who mistypes
 * their email — or just misses the consent box — would get their name, phone
 * and email wiped and have to type all three again. On the one form the whole
 * page exists to get submitted, that is not a tolerable failure mode.
 */

const LAST = QUIZ_STEPS.length; // step index of the contact details
/** Stable ids for the progress bars — the quiz steps plus the contact step. */
const STEP_IDS = [...QUIZ_STEPS.map((s) => s.id), 'contact'];
const reducer = makeQuizReducer(LAST);

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Sending…' : 'Request my free consultation'}
    </Button>
  );
}

export function LeadQuiz() {
  const [state, dispatch] = useReducer(reducer, initialQuizState);
  const [result, formAction] = useActionState<LeadResult | null, FormData>(submitLead, null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const uid = useId();

  const errors = result?.errors ?? {};
  const quotedTier = (() => {
    const volume = state.answers.volume?.[0];
    if (!volume) return null;
    return TIERS.find((t) => t.id === VOLUME_TO_TIER[volume]) ?? null;
  })();

  if (result?.ok) {
    return (
      <Card tone="surface">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-success-100 text-success-600">
          <CheckIcon />
        </span>
        <h3 className="mt-5 text-display-md">That’s with us.</h3>
        <p className="mt-3 max-w-prose text-body text-muted">
          We’ll be in touch within one business day. If you’d rather not wait, call or text{' '}
          <a
            href={`tel:${SITE.phone.e164}`}
            className="font-medium text-brand-600 underline underline-offset-4"
          >
            {SITE.phone.display}
          </a>{' '}
          and we’ll pick it up now.
        </p>
      </Card>
    );
  }

  const goNext = () => {
    dispatch({ type: 'next' });
    // Move the caret to the new step so keyboard and screen-reader users are
    // not left at the bottom of the form they just finished.
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  return (
    <Card as="form" tone="surface" action={formAction}>
      <div className="flex items-center justify-between gap-4">
        <p
          ref={headingRef}
          tabIndex={-1}
          className="text-eyebrow font-medium uppercase text-muted outline-none"
        >
          Step {state.step + 1} of {LAST + 1}
        </p>
        {quotedTier && state.step > 0 ? (
          <p className="text-[0.8125rem] font-medium text-brand-600">
            Looks like {quotedTier.name} · ${quotedTier.price}
          </p>
        ) : null}
      </div>

      {/* Progress. aria-hidden because the "Step n of m" line above already
          announces position; a second live region would double up. */}
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {STEP_IDS.map((id, i) => (
          <span
            key={id}
            className={cx(
              'h-1 flex-1 rounded-full transition-colors duration-300',
              i <= state.step ? 'bg-brand-600' : 'bg-line',
            )}
          />
        ))}
      </div>

      <div className="mt-8">
        {QUIZ_STEPS.map((step, i) => {
          const selected = state.answers[step.id] ?? [];
          const multi = step.kind === 'multi';
          return (
            <fieldset key={step.id} hidden={state.step !== i} className="border-0 p-0">
              <legend className="text-display-md">{step.legend}</legend>
              {step.help ? <p className="mt-3 text-meta text-muted">{step.help}</p> : null}

              <div className="mt-6 flex flex-wrap gap-2.5">
                {step.options.map((option) => {
                  const checked = selected.includes(option.value);
                  return (
                    <label
                      key={option.value}
                      className={cx(
                        'cursor-pointer rounded-ui border px-4 py-3 text-meta transition-colors',
                        checked
                          ? 'border-brand-600 bg-brand-600 text-white'
                          : 'border-line bg-surface hover:border-brand-600',
                        // The native control is the source of truth for focus
                        // and value; only its appearance is replaced.
                        'has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-600',
                      )}
                    >
                      <input
                        type={multi ? 'checkbox' : 'radio'}
                        name={step.id}
                        value={option.value}
                        checked={checked}
                        onChange={() =>
                          dispatch({ type: 'toggle', id: step.id, value: option.value, multi })
                        }
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center gap-3">
                {i > 0 ? (
                  <Button variant="ghost" size="md" onClick={() => dispatch({ type: 'back' })}>
                    Back
                  </Button>
                ) : null}
                <Button size="md" onClick={goNext}>
                  Continue
                  <ArrowIcon />
                </Button>
                <button
                  type="button"
                  onClick={goNext}
                  className="text-meta text-muted underline underline-offset-4 transition-colors hover:text-ink"
                >
                  Skip
                </button>
              </div>
            </fieldset>
          );
        })}

        <fieldset hidden={state.step !== LAST} className="border-0 p-0">
          <legend className="text-display-md">Where should we send it?</legend>
          <p className="mt-3 text-meta text-muted">
            Three fields. We use them to reach you about your consultation, nothing else.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field
              id={`${uid}-firstName`}
              name="firstName"
              label="First name"
              autoComplete="given-name"
              error={errors.firstName}
              value={state.fields.firstName ?? ''}
              onChange={(e) =>
                dispatch({ type: 'field', name: 'firstName', value: e.target.value })
              }
            />
            <Field
              id={`${uid}-phone`}
              name="phone"
              label="Phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              error={errors.phone}
              value={state.fields.phone ?? ''}
              onChange={(e) => dispatch({ type: 'field', name: 'phone', value: e.target.value })}
            />
            <div className="sm:col-span-2">
              <Field
                id={`${uid}-email`}
                name="email"
                label="Email"
                type="email"
                inputMode="email"
                autoComplete="email"
                error={errors.email}
                value={state.fields.email ?? ''}
                onChange={(e) => dispatch({ type: 'field', name: 'email', value: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`${uid}-message`} className="text-meta font-medium">
                Anything we should know? <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                rows={3}
                maxLength={2000}
                value={state.fields.message ?? ''}
                onChange={(e) =>
                  dispatch({ type: 'field', name: 'message', value: e.target.value })
                }
                className="mt-2 w-full rounded-ui border border-line bg-ground px-4 py-3 text-[1rem] outline-none transition-colors focus:border-brand-600"
              />
            </div>
          </div>

          {/* Honeypot. Hidden from people and from assistive tech, but a bot
              filling every input will trip it. */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
            <label htmlFor={`${uid}-website`}>Website</label>
            <input
              id={`${uid}-website`}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* TCPA prior express written consent. Unchecked by default, at body
              size, immediately above submit — all three are required for the
              consent to hold up. See content/legal.ts. */}
          <div className="mt-7 rounded-ui border border-line bg-ground p-4">
            <label className="flex cursor-pointer gap-3 text-[0.8125rem] leading-relaxed text-muted">
              <input
                type="checkbox"
                name="consent"
                checked={state.consent}
                onChange={(e) => dispatch({ type: 'consent', value: e.target.checked })}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-brand-600)]"
                aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
              />
              <span>{TCPA_CONSENT}</span>
            </label>
            {errors.consent ? (
              <p id={`${uid}-consent-error`} className="mt-2 pl-7 text-[0.8125rem] text-danger-600">
                {errors.consent}
              </p>
            ) : null}
          </div>

          {result && !result.ok && result.message ? (
            <p
              role="alert"
              className="mt-5 rounded-ui bg-danger-500/10 p-4 text-meta text-danger-600"
            >
              {result.message}
            </p>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button variant="ghost" size="md" onClick={() => dispatch({ type: 'back' })}>
              Back
            </Button>
            <SubmitButton />
          </div>
        </fieldset>
      </div>
    </Card>
  );
}

function Field({
  id,
  name,
  label,
  error,
  ...rest
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
} & React.ComponentPropsWithoutRef<'input'>) {
  return (
    <div>
      <label htmlFor={id} className="text-meta font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cx(
          'mt-2 w-full rounded-ui border bg-ground px-4 py-3 text-[1rem] outline-none transition-colors focus:border-brand-600',
          error ? 'border-danger-500' : 'border-line',
        )}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8125rem] text-danger-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
