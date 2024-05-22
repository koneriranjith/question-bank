import type { Components, JSX } from "../types/components";

interface IlMultiChoice extends Components.IlMultiChoice, HTMLElement {}
export const IlMultiChoice: {
  prototype: IlMultiChoice;
  new (): IlMultiChoice;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
