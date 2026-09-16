/**
 * State for the lead quiz.
 *
 * Kept out of the component so the step/answer logic can be tested directly —
 * "Back must never lose an answer" is a conversion guarantee, not a detail.
 */

export interface QuizState {
  step: number;
  answers: Record<string, string[]>;
  fields: Record<string, string>;
  consent: boolean;
}

export type QuizAction =
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'goto'; step: number }
  | { type: 'toggle'; id: string; value: string; multi: boolean }
  | { type: 'field'; name: string; value: string }
  | { type: 'consent'; value: boolean };

export const initialQuizState: QuizState = { step: 0, answers: {}, fields: {}, consent: false };

/** `last` is the index of the final step, so the reducer can clamp navigation. */
export function makeQuizReducer(last: number) {
  return function quizReducer(state: QuizState, action: QuizAction): QuizState {
    switch (action.type) {
      case 'next':
        return { ...state, step: Math.min(state.step + 1, last) };
      case 'back':
        return { ...state, step: Math.max(state.step - 1, 0) };
      case 'goto':
        return { ...state, step: Math.min(Math.max(action.step, 0), last) };
      case 'toggle': {
        const current = state.answers[action.id] ?? [];
        if (!action.multi) {
          return { ...state, answers: { ...state.answers, [action.id]: [action.value] } };
        }
        const next = current.includes(action.value)
          ? current.filter((v) => v !== action.value)
          : [...current, action.value];
        return { ...state, answers: { ...state.answers, [action.id]: next } };
      }
      case 'field':
        return { ...state, fields: { ...state.fields, [action.name]: action.value } };
      case 'consent':
        return { ...state, consent: action.value };
      default:
        return state;
    }
  };
}
