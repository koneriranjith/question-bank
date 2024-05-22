import { EventEmitter } from '../../stencil-public-runtime';
export declare class IlNotes {
  selectedValue: any;
  notes: string;
  isShowCheckbox: Boolean;
  checkboxText: string;
  readOnly: boolean;
  label: string;
  required: Boolean;
  error: string | undefined;
  tooltip: String;
  valueChanged: EventEmitter<Boolean>;
  handleOptionClick(): void;
  render(): any;
}
