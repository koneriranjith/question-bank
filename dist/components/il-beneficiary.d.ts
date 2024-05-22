import type { Components, JSX } from "../types/components";

interface IlBeneficiary extends Components.IlBeneficiary, HTMLElement {}
export const IlBeneficiary: {
  prototype: IlBeneficiary;
  new (): IlBeneficiary;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
