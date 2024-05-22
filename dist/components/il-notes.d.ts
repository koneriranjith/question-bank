import type { Components, JSX } from "../types/components";

interface IlNotes extends Components.IlNotes, HTMLElement {}
export const IlNotes: {
  prototype: IlNotes;
  new (): IlNotes;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
