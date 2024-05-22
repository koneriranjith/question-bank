import { EventEmitter } from '../../stencil-public-runtime';
export declare class IlFileLoader {
  fileResponseList: any;
  label: string;
  required: Boolean;
  readOnly: boolean;
  error: string | undefined;
  tooltip: String;
  isShowCheckbox: Boolean;
  checkboxText: string;
  selectedValue: any;
  selectedIndex: number;
  handleSubmit(action: any): void;
  valueChanged: EventEmitter<Boolean>;
  handleOptionClick(): void;
  render(): any;
}
