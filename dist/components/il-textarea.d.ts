import type { Components, JSX } from "../types/components";

interface IlTextarea extends Components.IlTextarea, HTMLElement {}
export const IlTextarea: {
  prototype: IlTextarea;
  new (): IlTextarea;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
