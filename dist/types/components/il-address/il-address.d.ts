import { EventEmitter } from '../../stencil-public-runtime';
interface Option {
  label: string;
  value: string;
}
export declare class IlAddress {
  label: string;
  value: any;
  tooltip: String;
  error: string | undefined;
  readOnly: boolean;
  apiBaseUrl: string;
  required: boolean;
  carrierAuthorization: string;
  placeholder: object;
  watchPropHandler(newValue: any): void;
  dropdown: any;
  options: Option[];
  searchQuery: string;
  isOpen: boolean;
  valueChanged: EventEmitter<Object>;
  valueBlur: EventEmitter<Object>;
  handleClickOutside(event: MouseEvent): void;
  componentDidLoad(): void;
  handleSearchInput(event: Event): void;
  private timeoutId;
  getOptions(text: any): Promise<any>;
  debouncedMethod(searchText: any): Promise<void>;
  private onInputFocusValue;
  handleSelect(option: Option): void;
  handleFieldChange(ev: any, name: any): void;
  render(): any;
}
export {};
