import type { Components, JSX } from "../types/components";

interface IlInput extends Components.IlInput, HTMLElement {}
export const IlInput: {
  prototype: IlInput;
  new (): IlInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
