import { EventEmitter } from '../../stencil-public-runtime';
interface Option {
  label: string;
  value: string;
}
export declare class MyMultiSelect {
  options: InstanceType<typeof Option>[];
  label: string;
  error: string | undefined;
  values: string[];
  required: Boolean;
  placeholder: string;
  tooltip: String;
  isOpen: boolean;
  dropdown: any;
  valuesChanged: EventEmitter<string[]>;
  handleClickOutside(event: MouseEvent): void;
  toggleDropdown(): void;
  handleSelect(option: Option): void;
  render(): any;
}
export {};
