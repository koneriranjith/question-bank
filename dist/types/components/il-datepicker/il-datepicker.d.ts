import { EventEmitter } from '../../stencil-public-runtime';
export declare class IlDatepicker {
  label: string;
  value: string;
  mask: any;
  tooltip: String;
  error: string | undefined;
  required: boolean;
  readOnly: boolean;
  dateFormat: String;
  placeholder: string;
  valueChanged: EventEmitter<string>;
  showPassword: boolean;
  isValid(dateString: string): boolean;
  private onInputChangeValue;
  private onInputFieldChangeValue;
  render(): any;
}
