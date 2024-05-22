import type { Components, JSX } from "../types/components";

interface IlTooltip extends Components.IlTooltip, HTMLElement {}
export const IlTooltip: {
  prototype: IlTooltip;
  new (): IlTooltip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
