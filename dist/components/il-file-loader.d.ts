import type { Components, JSX } from "../types/components";

interface IlFileLoader extends Components.IlFileLoader, HTMLElement {}
export const IlFileLoader: {
  prototype: IlFileLoader;
  new (): IlFileLoader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
