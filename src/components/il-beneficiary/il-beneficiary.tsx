import { Component, Prop, State, h, EventEmitter, Event } from '@stencil/core';
import { arrayToString, getSVG, stringToArray } from '../../utils/utils';

@Component({
  tag: 'il-beneficiary',
  styleUrl: 'il-beneficiary.scss',
})
export class IlBeneficiary {
  @Prop({ reflect: true, mutable: true }) label: string;
  @Prop({ reflect: true, mutable: true }) value: string;
  @Prop() tooltip: String;
  @Prop() error: string | undefined;
  @Prop() required: boolean;
  @Prop() customColumns: Array<object>;
  @Prop() maxLength: number = 1000;
  @Prop() minLength: number;
  @Prop() questionId: number;
  @State() beneficiaries: number;
  @Prop() blurUpdateAnswerType: Array<string>;
  @Event() beneficiaryValueChanged: EventEmitter<object>;
  @Event() beneficiaryValueBlur: EventEmitter<object>;
  @State() formData: object;

  async componentDidLoad() {
    let count = 1;
    const formData = this.customColumns.reduce((acc, val) => {
      acc = { ...acc, [val['questionId']]: this.formData?.[val['questionId']] || val['answer'] ? JSON.parse(val['answer']) : [''] };
      if (val['answer'] && count < JSON.parse(val['answer']).length) {
        count = JSON.parse(val['answer']).length;
      }
      return acc;
    }, {});
    this.formData = { ...this.formData, ...formData };
    this.beneficiaries = count;
  }

  handleBeneficiaryChange = async (detail, question: object, index: number) => {
    this.formData[question['questionId']][index] = detail;
    if (!this.blurUpdateAnswerType?.includes(question['mstAnswerType'])) {
      const payload = {
        data: [
          {
            questionId: question['questionId'],
            answers: this.formData[question['questionId']],
          },
        ],
        count: this.beneficiaries,
      };
      this.beneficiaryValueChanged.emit(payload);
    }
  };
  handleBeneficiaryBlur = (detail, question: object, index: number) => {
    this.formData[question['questionId']][index] = detail;
    if (this.blurUpdateAnswerType?.includes(question['mstAnswerType'])) {
      const payload = {
        data: [
          {
            questionId: question['questionId'],
            answers: this.formData[question['questionId']],
          },
        ],
        count: this.beneficiaries,
      };
      this.beneficiaryValueBlur.emit(payload);
    }
  };

  renderField(question, index) {
    switch (question.mstAnswerType) {
      case 'shorttext':
        return (
          <il-input
            type={'text'}
            label={question.text}
            questionType={question.mstAnswerType}
            readOnly={question?.readOnly ?? false}
            mask={question.mask}
            value={this.formData?.[question['questionId']]?.[index] ?? ''}
            required={question.required}
            placeholder={question?.hintText}
            tooltip={question.informationText || ''}
            onValueChanged={ev => this.handleBeneficiaryChange(ev.detail, question, index)}
            onValueBlur={ev => {
              this.handleBeneficiaryBlur(ev.detail, question, index);
            }}
          ></il-input>
        );
      case 'longtext':
        return (
          <il-textarea
            label={question.text}
            value={this.formData?.[question['questionId']]?.[index] ?? ''}
            required={question.required}
            placeholder={question?.hintText}
            readOnly={question?.readOnly ?? false}
            tooltip={question.informationText || ''}
            onValueChanged={ev => this.handleBeneficiaryChange(ev.detail, question, index)}
            onValueBlur={ev => {
              this.handleBeneficiaryBlur(ev.detail, question, index);
            }}
          ></il-textarea>
        );
      case 'email':
        return (
          <il-input
            type={'text'}
            label={question.text}
            value={this.formData?.[question['questionId']]?.[index] ?? ''}
            required={question.required}
            placeholder={question?.hintText}
            readOnly={question?.readOnly ?? false}
            tooltip={question.informationText || ''}
            onValueChanged={ev => this.handleBeneficiaryChange(ev.detail, question, index)}
            onValueBlur={ev => {
              this.handleBeneficiaryBlur(ev.detail, question, index);
            }}
          ></il-input>
        );
      case 'number':
        return (
          <il-input
            type={'text'}
            questionType={question.mstAnswerType}
            mask={question.mask}
            label={question.text}
            readOnly={question?.readOnly ?? false}
            value={this.formData?.[question['questionId']]?.[index] ?? ''}
            required={question.required}
            placeholder={question?.hintText}
            tooltip={question.informationText || ''}
            onValueChanged={ev => this.handleBeneficiaryChange(ev.detail, question, index)}
            onValueBlur={ev => {
              this.handleBeneficiaryBlur(ev.detail, question, index);
            }}
          ></il-input>
        );
      case 'phonenumber':
        return (
          <il-input
            type={'text'}
            questionType={question.mstAnswerType}
            mask={question.mask}
            label={question.text}
            readOnly={question?.readOnly ?? false}
            value={this.formData?.[question['questionId']]?.[index] ?? ''}
            required={question.required}
            placeholder={question?.hintText}
            tooltip={question.informationText || ''}
            onValueChanged={ev => this.handleBeneficiaryChange(ev.detail, question, index)}
            onValueBlur={ev => {
              this.handleBeneficiaryBlur(ev.detail, question, index);
            }}
          ></il-input>
        );

      case 'Date':
        return (
          <il-datepicker
            // error={this.formErrorMessage?.[question?.questionId] ?? ''}
            label={question.text}
            readOnly={question?.readOnly ?? false}
            tooltip={question.informationText || ''}
            required={question.required}
            placeholder={question.hintText}
            dateFormat={question.dateFormat || "MM/dd/yyyy"}
            value={this.formData?.[question['questionId']]?.[index] ?? ''}
            onValueChanged={ev => this.handleBeneficiaryChange((ev.detail), question, index)}
            /* onValueBlur={ev => {
              this.handleBlur(format(new Date(ev.detail), question.dateFormat), question);
            }} */
          >

          </il-datepicker>
        );
      case 'multichoice':
        return (
          <il-multi-choice
            label={question.text}
            tooltip={question.informationText || ''}
            required={question.required}
            readOnly={question.readOnly || false}
            options={question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId }))}
            onValueChanged={ev => this.handleBeneficiaryChange(arrayToString(ev.detail), question, index)}
            selectedValue={stringToArray(this.formData?.[question['questionId']]?.[index] || (question.answerResponse.filter((val) => val.isDefault)?.[0]?.["answerId"])?.toString()) || []}
          ></il-multi-choice>
        );
      case 'Dropdown':
        return (
          <il-dropdown
            label={question.text}
            tooltip={question.informationText || ''}
            required={question.required}
            readOnly={question.readOnly || false}
            options={question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId }))}
            value={this.formData?.[question['questionId']]?.[index] || question.answerResponse.filter((val) => val.isDefault)?.[0]?.["answerId"] || []}
            placeholder={question.hintText || "Select an option"}
            onValueChanged={ev => this.handleBeneficiaryChange(ev.detail, question, index)}
          ></il-dropdown>
        );

      case 'Radio':
        return (
          <il-radio-button
            label={question.text}
            tooltip={question.informationText || ''}
            required={question.required}
            readOnly={question.readOnly || false}
            options={question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId }))}
            onValueChanged={ev => this.handleBeneficiaryChange(ev.detail, question, index)}
            selectedValue={this.formData?.[question['questionId']]?.[index] || question.answerResponse.filter((val) => val.isDefault)?.[0]?.["answerId"] || []}
          ></il-radio-button>
        );

      case 'password':
        return (
          <il-input
            type={'password'}
            label={question.text}
            value={this.formData?.[question['questionId']]?.[index] ?? ''}
            required={question.required}
            placeholder={question?.hintText}
            readOnly={question?.readOnly ?? false}
            tooltip={question.informationText || ''}
            onValueChanged={ev => this.handleBeneficiaryChange(ev.detail, question, index)}
            onValueBlur={ev => {
              this.handleBeneficiaryBlur(ev.detail, question, index);
            }}
          ></il-input>
        );

      default:
        return null;
    }
  }

  render() {

    return (
      <div class="il-input">
        <div class="il-input-inner">
          <p class="il-label">{this.label}</p>
          {this.required ? <span class="il-required">*</span> : null}
          {this.tooltip ? <il-tooltip tooltip={this.tooltip}></il-tooltip> : null}
        </div>
        <div class="inner-elements">
          {Array.from(Array(this.beneficiaries)).map((_, index) => (
            <div>
              <div class="inner-bene">
                <div class="inner-bene-elements">
                  {this.customColumns.map(item => (
                    <div class={`question-field question-field-${item['questionId']}`}> {this.renderField(item, index)}</div>
                  ))}
                </div>
                {this.error ? <p class="il-error">{this.error}</p> : null}
                {this.beneficiaries > 1 ? (
                  <span
                    class="icon il-beneficiary-remove"
                    onClick={() => {
                      const formData = { ...this.formData };
                      this.customColumns.map(item => {
                        formData[item['questionId']].splice(index, 1);
                      });
                      this.formData = { ...formData, ...this.formData };
                      this.beneficiaries -= 1;
                      const payload = {
                        data: Object.keys(this.formData).map(item => ({
                          questionId: item,
                          answers: this.formData[item],
                        })),
                        count: this.beneficiaries,
                      };
                      this.beneficiaryValueChanged.emit(payload);
                    }}
                    innerHTML={getSVG('remove_circle_icon')}
                  ></span>
                ) : null}
              </div>

              {index + 1 === this.beneficiaries && this.beneficiaries < this.maxLength ? (
                <span
                  class="il-beneficiary-addmore"
                  onClick={() => {
                    const formData = { ...this.formData };
                    this.customColumns.map(item => {
                      formData[item['questionId']][this.beneficiaries] = '';
                    });
                    this.formData = { ...formData, ...this.formData };
                    this.beneficiaries += 1;
                  }}
                >
                  Add Beneficiary
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
