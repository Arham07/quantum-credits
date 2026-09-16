import { describe, expect, it } from 'vitest';
import { initialQuizState, makeQuizReducer, type QuizState } from './quizReducer';

const reducer = makeQuizReducer(3);
const run = (state: QuizState, ...actions: Parameters<typeof reducer>[1][]) =>
  actions.reduce(reducer, state);

describe('quiz reducer', () => {
  it('clamps navigation at both ends', () => {
    expect(run(initialQuizState, { type: 'back' }).step).toBe(0);
    const atEnd = run(initialQuizState, ...Array(9).fill({ type: 'next' as const }));
    expect(atEnd.step).toBe(3);
  });

  it('keeps every answer when the visitor goes back', () => {
    const state = run(
      initialQuizState,
      { type: 'toggle', id: 'issues', value: 'collections', multi: true },
      { type: 'next' },
      { type: 'toggle', id: 'goal', value: 'home', multi: false },
      { type: 'back' },
    );
    expect(state.step).toBe(0);
    expect(state.answers.issues).toEqual(['collections']);
    expect(state.answers.goal).toEqual(['home']);
  });

  it('accumulates multi-select answers and toggles them off again', () => {
    let state = run(
      initialQuizState,
      { type: 'toggle', id: 'issues', value: 'collections', multi: true },
      { type: 'toggle', id: 'issues', value: 'late', multi: true },
    );
    expect(state.answers.issues).toEqual(['collections', 'late']);

    state = reducer(state, { type: 'toggle', id: 'issues', value: 'collections', multi: true });
    expect(state.answers.issues).toEqual(['late']);
  });

  it('replaces the previous choice on a single-select step', () => {
    const state = run(
      initialQuizState,
      { type: 'toggle', id: 'volume', value: '0-50', multi: false },
      { type: 'toggle', id: 'volume', value: '351+', multi: false },
    );
    expect(state.answers.volume).toEqual(['351+']);
  });

  it('retains typed contact details across navigation', () => {
    const state = run(
      initialQuizState,
      { type: 'field', name: 'email', value: 'dana@example.com' },
      { type: 'consent', value: true },
      { type: 'back' },
      { type: 'next' },
    );
    expect(state.fields.email).toBe('dana@example.com');
    expect(state.consent).toBe(true);
  });

  it('never mutates the state it was given', () => {
    const before = structuredClone(initialQuizState);
    reducer(initialQuizState, { type: 'toggle', id: 'issues', value: 'late', multi: true });
    expect(initialQuizState).toEqual(before);
  });
});
