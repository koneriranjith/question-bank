import type { Components, JSX } from "../types/components";

interface QuestionBank extends Components.QuestionBank, HTMLElement {}
export const QuestionBank: {
  prototype: QuestionBank;
  new (): QuestionBank;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
