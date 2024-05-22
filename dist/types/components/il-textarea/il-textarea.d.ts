import { EventEmitter } from '../../stencil-public-runtime';
export declare class IlTextarea {
  label: string;
  value: string;
  error: string | undefined;
  required: Boolean;
  readOnly: boolean;
  placeholder: string;
  tooltip: String;
  valueChanged: EventEmitter<string>;
  valueBlur: EventEmitter<string>;
  private onInputChangeValue;
  private onInputBlurValue;
  render(): any;
}
