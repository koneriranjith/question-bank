import type { Components, JSX } from "../types/components";

interface IlDropdown extends Components.IlDropdown, HTMLElement {}
export const IlDropdown: {
  prototype: IlDropdown;
  new (): IlDropdown;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
