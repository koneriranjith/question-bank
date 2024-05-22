import type { Components, JSX } from "../types/components";

interface IlCombobox extends Components.IlCombobox, HTMLElement {}
export const IlCombobox: {
  prototype: IlCombobox;
  new (): IlCombobox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
