import type { Components, JSX } from "../types/components";

interface MyMultiSelect extends Components.MyMultiSelect, HTMLElement {}
export const MyMultiSelect: {
  prototype: MyMultiSelect;
  new (): MyMultiSelect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
