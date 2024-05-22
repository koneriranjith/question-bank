import { EventEmitter } from '../../stencil-public-runtime';
interface Option {
  label: string;
  value: string;
}
export declare class IlMultiChoice {
  options: InstanceType<typeof Option>[];
  selectedValue: any;
  label: string;
  required: Boolean;
  isDefault: Object;
  readOnly: boolean;
  error: string | undefined;
  tooltip: String;
  valueChanged: EventEmitter<string[]>;
  private selectedOptions;
  componentDidLoad(): Promise<void>;
  componentWillLoad(): void;
  handleOptionClick(option: Option): void;
  render(): any;
}
export {};
