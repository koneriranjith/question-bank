import { EventEmitter } from '../../stencil-public-runtime';
interface Option {
  label: string;
  value: string;
}
export declare class IlRadioButton {
  options: InstanceType<typeof Option>[];
  selectedValue: any;
  label: string;
  readOnly: boolean;
  isDefault: Object;
  error: string | undefined;
  required: Boolean;
  tooltip: String;
  valueChanged: EventEmitter<string>;
  componentDidLoad(): Promise<void>;
  handleOptionClick(option: Option): void;
  render(): any;
}
export {};
