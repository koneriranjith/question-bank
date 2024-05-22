import { EventEmitter } from '../../stencil-public-runtime';
interface Option {
  label: string;
  value: string;
}
export declare class IlDropdown {
  options: InstanceType<typeof Option>[];
  value: string;
  label: string;
  error: string | undefined;
  readOnly: boolean;
  placeholder: string;
  required: Boolean;
  tooltip: String;
  isDefault: Object;
  isOpen: boolean;
  dropdown: any;
  valueChanged: EventEmitter<string>;
  componentDidLoad(): Promise<void>;
  handleClickOutside(event: MouseEvent): void;
  handleSelect(option: Option): void;
  toggleDropdown(): void;
  renderOptions(): any;
  render(): any;
}
export {};
