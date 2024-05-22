import type { Components, JSX } from "../types/components";

interface IlDatepicker extends Components.IlDatepicker, HTMLElement {}
export const IlDatepicker: {
  prototype: IlDatepicker;
  new (): IlDatepicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
