import type { Components, JSX } from "../types/components";

interface IlAddress extends Components.IlAddress, HTMLElement {}
export const IlAddress: {
  prototype: IlAddress;
  new (): IlAddress;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
