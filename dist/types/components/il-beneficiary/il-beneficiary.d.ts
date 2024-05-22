import { EventEmitter } from '../../stencil-public-runtime';
export declare class IlBeneficiary {
  label: string;
  value: string;
  tooltip: String;
  error: string | undefined;
  required: boolean;
  customColumns: Array<object>;
  maxLength: number;
  minLength: number;
  questionId: number;
  beneficiaries: number;
  blurUpdateAnswerType: Array<string>;
  beneficiaryValueChanged: EventEmitter<object>;
  beneficiaryValueBlur: EventEmitter<object>;
  formData: object;
  componentDidLoad(): Promise<void>;
  handleBeneficiaryChange: (detail: any, question: object, index: number) => Promise<void>;
  handleBeneficiaryBlur: (detail: any, question: object, index: number) => void;
  renderField(question: any, index: any): any;
  render(): any;
}
