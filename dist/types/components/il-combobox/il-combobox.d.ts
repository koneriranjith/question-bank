import { EventEmitter } from '../../stencil-public-runtime';
export declare class IlCombobox {
  options: {
    label: string;
    value: string;
    id: string;
  }[];
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
  inputValue: string;
  newOption: {
    label: string;
    value: string;
    id: string;
  };
  componentDidLoad(): Promise<void>;
  handleClickOutside(event: MouseEvent): void;
  handleSelect(option: {
    label: string;
    value: string;
  }): void;
  setInputValue(event: Event): void;
  handleBlur(event: Event): void;
  toggleDropdown(): void;
  renderOptions(): any;
  render(): any;
}
