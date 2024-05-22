import type { Components, JSX } from "../types/components";

interface IlRadioButton extends Components.IlRadioButton, HTMLElement {}
export const IlRadioButton: {
  prototype: IlRadioButton;
  new (): IlRadioButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
