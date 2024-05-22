import { EventEmitter } from '../../stencil-public-runtime';
export declare class IlInput {
  label: string;
  value: string;
  type: string;
  mask: any;
  questionType: String;
  tooltip: String;
  error: string | undefined;
  required: boolean;
  readOnly: boolean;
  placeholder: string;
  valueChanged: EventEmitter<string>;
  valueBlur: EventEmitter<string>;
  showPassword: boolean;
  private setShowPassword;
  private onInputChangeValue;
  private onInputBlurValue;
  onDateFocusValue(): void;
  render(): any;
}
