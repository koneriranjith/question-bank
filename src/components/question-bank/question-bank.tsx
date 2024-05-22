import { Component, h, Prop, State, Watch, Method, Fragment } from '@stencil/core';
import { arrayToString, stringToArray } from '../../utils/utils';

@Component({
  tag: 'question-bank',
  styleUrl: 'question-bank.scss',
})
export class QuestionBank {
  // component base class name 'question-bank'
  private baseClassName = 'question-bank';
  private blurUpdateAnswerType = ['shorttext', 'longtext', 'email', 'number', 'phonenumber', 'password'];
  // props
  @Prop() client: string;
  @Prop() apiBaseUrl: string;
  @Prop() applicationId: string;
  @Prop() carrierAuthorization: string;
  @Prop() userId: string;
  @Prop() formId: string;
  @Prop() singleForm: boolean;
  @Prop() isFormValidation: boolean;

  // state
  @State() isErrorInRequiredMessage: string;
  @State() questions: any[] = [];
  @State() error: string;
  @State() isStepForm: Boolean;
  @State() stepFormId: number;
  @State() formData: any = {};
  @State() formErrorMessage: any = {};
  @State() isLoading: boolean;

  // watch stepFormId for update the Form Data values
  @Watch('stepFormId')
  watchPropHandler(newValue: number, oldValue: number) {
    if (newValue && this.questions.length) {
      this.setFormData(newValue, this.questions);
    }
    console.log('oldValue', oldValue);
  }

  setnLevelFormData(acc, val) {
    if (this.formData[val.questionId] || val.answer) {
      acc = { ...acc, [val.questionId]: this.formData[val.questionId] || val.answer };
    }
    if (val.childAnswerNew && val.childAnswerNew.length) {
      val.childAnswerNew.forEach(innerval => {
        acc = this.setnLevelFormData(acc, innerval);
      });
    }
    return acc;
  }
  // update the form data values based on selected stepForm
  setFormData(stepFormId: number, questions: any) {
    let selectedQuestions = [];
    if (stepFormId) {
      selectedQuestions = questions.find((val: any) => val.sectionId == stepFormId).questionsResponse;
    } else {
      selectedQuestions = questions;
    }
    const formData = selectedQuestions.reduce((acc, val) => {
      return this.setnLevelFormData(acc, val);
    }, {});
    this.formData = { ...this.formData, ...formData };
  }

  // lifecycle hook componentDid called after render
  async componentDidLoad() {
    const { apiBaseUrl, applicationId, userId, formId } = this;
    this.isLoading = true;
    // required props validating before calling api
    if (!this.isErrorInRequiredMessage) {
      const reqPayload = {
        applicationId: applicationId,
        userId: userId,
      };

      try {
        // api call
        const rawResponse = await fetch(`${apiBaseUrl}/getAllQuestionDetailsByformId?formId=${formId}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Carrierauthorization': this.carrierAuthorization || '',
          },
          body: JSON.stringify(reqPayload),
        });
        const content = await rawResponse.json();
        if (content.status.code === 200) {
          let data = [];
          // single form render or step form render condition check based on (singleForm props)
          if (this.singleForm) {
            data = content.data.reduce((acc, item) => {
              acc = [...acc, ...item.questionsResponse];
              return acc;
            }, []);
          } else {
            data = content.data;
          }
          this.isStepForm = !!data[0].sectionName;
          if (this.isStepForm) {
            this.stepFormId = data[0].sectionId;
          }
          this.setFormData(this.stepFormId, data);

          this.questions = data;
        } else {
          this.error = 'Something went wrong!';
        }
        this.isLoading = false;
      } catch (error) {
        console.log('error', error);
        this.isLoading = false;
        this.error = 'Something went wrong!';
      }
    }
  }
  // componentWillLoad is lifecycle call before render method
  componentWillLoad() {
    const { apiBaseUrl, applicationId, userId, formId, client, carrierAuthorization } = this;
    // validating required props for this component
    if (!client) {
      this.isErrorInRequiredMessage = 'client';
    }
    if (!apiBaseUrl) {
      this.isErrorInRequiredMessage = `${this.isErrorInRequiredMessage ? ',' : ''} apiBaseUrl`;
    }
    if (!applicationId) {
      this.isErrorInRequiredMessage = `${this.isErrorInRequiredMessage ? ',' : ''} applicationId`;
    }
    if (!userId) {
      this.isErrorInRequiredMessage = `${this.isErrorInRequiredMessage ? ',' : ''} userId`;
    }
    if (!formId) {
      this.isErrorInRequiredMessage = `${this.isErrorInRequiredMessage ? ',' : ''} formId`;
    }
    if (!carrierAuthorization) {
      this.isErrorInRequiredMessage = `${this.isErrorInRequiredMessage ? ',' : ''} carrierAuthorization`;
    }

    this.isErrorInRequiredMessage = this.isErrorInRequiredMessage ? `Valid Props are required: ${this.isErrorInRequiredMessage} for this component ${client}` : '';
  }

  selectSection(id) {
    if (this.stepFormId !== id) {
      this.stepFormId = id;
    }
  }

  selectStepForm(id, index) {
    const stepFormIndex = this.questions.findIndex(val => this.stepFormId == val.sectionId);
    if (this.isFormValidation && stepFormIndex < index) {
      return;
    }
    this.selectSection(id);
  }

  @Method()
  async storeAnswerInQuestion(payload) {
    const { apiBaseUrl, applicationId } = this;
    const reqPayload = {
      applicationUserAnswerRequest: payload,
    };
    try {
      const rawResponse = await fetch(`${apiBaseUrl}/storeAnswerInQuestion?applicationid=${applicationId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Carrierauthorization': this.carrierAuthorization || '',
        },
        body: JSON.stringify(reqPayload),
      });
      const content = await rawResponse.json();
      return content.data;
    } catch (error) {
      console.log('error', error);
    }
    return 42;
  }

  private timeoutId: NodeJS.Timeout | undefined;

  // every question field on change debounce Method will be called, check for child addQuestion or removeQuestion
  @Method()
  async debouncedMethod(payload: any) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(async () => {
      const data = await this.storeAnswerInQuestion(payload);
      // updated the child Question based on answer
      this.updateChildQuestions(data);
    }, 30);
  }

  setChildQuestionsData(childAnswerNew, addCheckList, removeCheckList, val, addList, removeList) {
    if (addCheckList.includes(val.questionId)) {
      childAnswerNew = addList[val?.questionId];
    }
    if (removeCheckList.includes(val.questionId)) {
      childAnswerNew = childAnswerNew.filter(chiVal => {
        if (!removeList[val.questionId].includes(chiVal.questionId)) {
          return chiVal;
        }
      });
    }

    return childAnswerNew;
  }

  getnLevelChildQuestions(val, addCheckList, removeCheckList, addList, removeList) {
    let childAnswerNew = val['childAnswerNew'];
    if (addCheckList.includes(val.questionId) || removeCheckList.includes(val.questionId)) {
      childAnswerNew = this.setChildQuestionsData(childAnswerNew, addCheckList, removeCheckList, val, addList, removeList);
    } else {
      if (val?.childAnswerNew?.length > 0) {
        childAnswerNew = val?.childAnswerNew?.map(item => {
          return this.getnLevelChildQuestions(item, addCheckList, removeCheckList, addList, removeList);
        });
      }
    }
    return { ...val, childAnswerNew: childAnswerNew };
  }
  // mutating the question state with the child question data
  getUpdatedChildQuestionData(addList, removeList) {
    const addCheckList = addList && Object.keys(addList).length ? Object.keys(addList).map(val => Number(val)) : [];
    const removeCheckList = removeList && Object.keys(removeList).length ? Object.keys(removeList).map(val => Number(val)) : [];
    const [selectedQuestions, stepFormIndex]: any = this.getSelectedQuestions();

    if (this.isStepForm) {
      const questionsResponse = selectedQuestions.map(val => {
        return this.getnLevelChildQuestions(val, addCheckList, removeCheckList, addList, removeList);
      });
      return this.questions.map((val, index) => {
        if (index == stepFormIndex) {
          return { ...val, questionsResponse };
        }
        return val;
      });
    } else {
      return selectedQuestions.map(val => {
        return this.getnLevelChildQuestions(val, addCheckList, removeCheckList, addList, removeList);
      });
    }
  }

  // updating the child question data
  updateChildQuestions({ addList, removeList }) {
    this.questions = [...this.getUpdatedChildQuestionData(addList, removeList)];
  }

  handleChange(detail, question) {
    delete this.formErrorMessage?.[question.questionId];
    this.formData = { ...this.formData, [question.questionId]: detail || '' };
    if (question.mstAnswerType === 'beneficiary') {
      const payload = [
        {
          questionId: question.questionId,
          answerValue: null,
          customQuestionList: detail.data,
          totalCustomQuestionCount: detail.count,
        },
      ];
      this.debouncedMethod(payload);
    } else {
      if (!this.blurUpdateAnswerType?.includes(question?.mstAnswerType)) {
        this.debouncedMethod([{ questionId: question.questionId, answerValue: detail }]);
      }
    }
  }

  validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  validatePhoneNumber(phoneNumber) {
    // Regular expression for a valid phone number (supports various formats)
    const phoneRegex = /^(\+?(\d{1,2})?[-. ]?)?(\(?\d{3}\)?[-. ]?)?(\d{3}[-. ]?\d{4})$/;

    // Test the phoneNumber against the regular expression
    return phoneRegex.test(phoneNumber);
  }

  renderField(question) {
    switch (question.mstAnswerType) {
      case 'shorttext':
        return (
          <il-input
            type={'text'}
            questionType={question.mstAnswerType}
            label={question.text}
            mask={question.mask}
            readOnly={question?.readOnly ?? false}
            value={this.formData[question.questionId] || ''}
            error={this.formErrorMessage[question.questionId]}
            required={question.required}
            placeholder={question.hintText}
            tooltip={question.informationText || ''}
            onValueChanged={ev => this.handleChange(ev.detail, question)}
            onValueBlur={ev => {
              this.handleBlur(ev.detail, question);
            }}
          ></il-input>
        );
      case 'longtext':
        return (
          <il-textarea
            error={this.formErrorMessage[question.questionId]}
            label={question.text}
            required={question.required}
            tooltip={question.informationText || ''}
            readOnly={question?.readOnly ?? false}
            placeholder={question.hintText}
            value={this.formData[question.questionId] || ''}
            onValueChanged={ev => this.handleChange(ev.detail, question)}
            onValueBlur={ev => {
              this.handleBlur(ev.detail, question);
            }}
          ></il-textarea>
        );
      case 'address':
        return (
          <il-address
            api-base-url={this.apiBaseUrl}
            error={this.formErrorMessage[question.questionId]}
            required={question.required}
            label={question.text}
            readOnly={question.readOnly || false}
            placeholder={question.hintText ? JSON.parse(question.hintText) : {}}
            carrier-authorization={this.carrierAuthorization}
            value={this.formData[question.questionId] ? JSON.parse(this.formData[question.questionId]) : {}}
            tooltip={question.informationText || ''}
            onValueChanged={ev => this.handleChange(JSON.stringify(ev.detail), question)}
            onValueBlur={ev => {
              this.handleBlur(ev.detail, question);
            }}
          ></il-address>
        );
      case 'email':
        return (
          <il-input
            type={'text'}
            questionType={question.mstAnswerType}
            error={this.formErrorMessage[question.questionId]}
            label={question.text}
            tooltip={question.informationText || ''}
            readOnly={question?.readOnly ?? false}
            required={question.required}
            placeholder={question.hintText}
            value={this.formData[question.questionId] || ''}
            onValueChanged={ev => this.handleChange(ev.detail, question)}
            onValueBlur={ev => {
              this.handleBlur(ev.detail, question);
            }}
          ></il-input>
        );
      case 'number':
        return (
          <il-input
            type={'text'}
            questionType={question.mstAnswerType}
            mask={question.mask}
            error={this.formErrorMessage[question.questionId]}
            readOnly={question?.readOnly ?? false}
            label={question.text}
            tooltip={question.informationText || ''}
            required={question.required}
            placeholder={question.hintText}
            value={this.formData[question.questionId] || ''}
            onValueChanged={ev => this.handleChange(ev.detail, question)}
            onValueBlur={ev => {
              this.handleBlur(ev.detail, question);
            }}
          ></il-input>
        );
      case 'phonenumber':
        return (
          <il-input
            type={'text'}
            questionType={question.mstAnswerType}
            mask={question.mask}
            error={this.formErrorMessage[question.questionId]}
            readOnly={question?.readOnly ?? false}
            label={question.text}
            tooltip={question.informationText || ''}
            required={question.required}
            placeholder={question.hintText}
            value={this.formData[question.questionId] || ''}
            onValueChanged={ev => this.handleChange(ev.detail, question)}
            onValueBlur={ev => {
              this.handleBlur(ev.detail, question);
            }}
          ></il-input>
        );

      case 'Date':
        return (
          <il-datepicker
            error={this.formErrorMessage?.[question?.questionId] ?? ''}
            label={question.text}
            readOnly={question?.readOnly ?? false}
            tooltip={question.informationText || ''}
            required={question.required}
            placeholder={question.hintText}
            dateFormat={question.dateFormat || 'MM/DD/YYYY'}
            value={this.formData?.[question?.questionId] || ''}
            onValueChanged={ev => this.handleChange(ev.detail, question)}
            /*  onValueBlur={ev => {
             this.handleBlur(format(new Date(ev.detail), question.dateFormat), question);
           }} */
          ></il-datepicker>
        );
      case 'multichoice':
        return (
          <il-multi-choice
            label={question.text}
            tooltip={question.informationText || ''}
            error={this.formErrorMessage[question.questionId]}
            required={question.required}
            readOnly={question?.readOnly ?? false}
            isDefault={question.answerResponse.filter(val => val.isDefault)?.[0]}
            options={question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId }))}
            onValueChanged={ev => this.handleChange(arrayToString(ev.detail), question)}
            selectedValue={stringToArray(this.formData[question.questionId]) || []}
          ></il-multi-choice>
        );

      case 'notes':
        return (
          <il-notes
            label={question.text}
            checkboxText={question.checkboxText}
            isShowCheckbox={question.isShowCheckbox}
            notes={question.notes}
            readOnly={question.readOnly || false}
            tooltip={question.informationText || ''}
            error={this.formErrorMessage[question.questionId]}
            required={question.required}
            onValueChanged={ev => this.handleChange(ev.detail, question)}
            selectedValue={this.formData[question.questionId]}
          ></il-notes>
        );

      // case 'multichoice':
      //   return (
      //     <my-multi-select
      //       label={question.text}
      //       tooltip={question.informationText || ''}
      //       error={this.formErrorMessage[question.questionId]}
      //       required={this.formErrorMessage[question.required]}
      //       options={question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId }))}
      //       values={this.stringToArray(this.formData[question.questionId])}
      //       placeholder="Select options"
      //       onValuesChanged={ev => this.handleChange(this.arrayToString(ev.detail), question)}
      //     ></my-multi-select>
      //   );
      case 'Dropdown':
        return (
          <il-dropdown
            label={question.text}
            tooltip={question.informationText || ''}
            required={question.required}
            error={this.formErrorMessage[question.questionId]}
            readOnly={question.readOnly || false}
            isDefault={question.answerResponse.filter(val => val.isDefault)?.[0]}
            options={question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId }))}
            value={this.formData[question.questionId]}
            placeholder={question.hintText || 'Select an option'}
            onValueChanged={ev => this.handleChange(ev.detail, question)}
          ></il-dropdown>
        );

      case 'Radio':
        return (
          <il-radio-button
            label={question.text}
            tooltip={question.informationText || ''}
            required={question.required}
            readOnly={question.readOnly || false}
            isDefault={question.answerResponse.filter(val => val.isDefault)?.[0]}
            error={this.formErrorMessage[question.questionId]}
            options={question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId }))}
            onValueChanged={ev => this.handleChange(ev.detail, question)}
            selectedValue={this.formData[question.questionId] || []}
          ></il-radio-button>
        );
      case 'files':
        return (
          <il-file-loader
            fileResponseList={question.fileResponseList}
            label={question.text}
            required={question.required}
            readOnly={question.readOnly || false}
            error={this.formErrorMessage[question.questionId]}
            tooltip={question.informationText || ''}
            onValueChanged={ev => this.handleChange(ev.detail, question)}
            selectedValue={this.formData[question.questionId]}
            checkboxText={question.checkboxText}
            isShowCheckbox={question.isShowCheckbox}
          ></il-file-loader>
        );
      case 'password':
        return (
          <il-input
            type={'password'}
            questionType={question.mstAnswerType}
            label={question.text}
            value={this.formData[question.questionId] || ''}
            error={this.formErrorMessage[question.questionId]}
            readOnly={question?.readOnly ?? false}
            mask={question.mask}
            required={question.required}
            placeholder={question.hintText}
            tooltip={question.informationText || ''}
            onValueChanged={ev => this.handleChange(ev.detail, question)}
            onValueBlur={ev => {
              this.handleBlur(ev.detail, question);
            }}
          ></il-input>
        );
      case 'beneficiary':
        return (
          <il-beneficiary
            label={question.text}
            value={this.formData[question.questionId] || ''}
            error={this.formErrorMessage[question.questionId]}
            required={question.required}
            tooltip={question.informationText || ''}
            customColumns={question.customColumns || []}
            questionId={question.questionId}
            onBeneficiaryValueChanged={ev => this.handleChange(ev.detail, question)}
            onBeneficiaryValueBlur={ev => this.handleBlur(ev.detail, question)}
            blurUpdateAnswerType={this.blurUpdateAnswerType}
            maxLength={question?.maxLength}
            minLength={question?.minLength}
          ></il-beneficiary>
        );
      case 'combobox':
        return (
          <il-combobox
            label={question.text}
            tooltip={question.informationText || ''}
            required={question.required}
            error={this.formErrorMessage[question.questionId]}
            readOnly={question.readOnly || false}
            isDefault={question.answerResponse.filter(val => val.isDefault)?.[0]}
            options={question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId, id: 'old' }))}
            value={this.formData[question.questionId]}
            placeholder={question.hintText || 'Select an option'}
            onValueChanged={ev => this.handleChange(ev.detail, question)}
          />
        );
      default:
        return <p>--- not implemented yet --- {question.mstAnswerType}</p>;
    }
  }

  formValidation(val) {
    if (val.required && !this.formData[val.questionId]) {
      return val.errorMessage || "It's required field";
    } else if (val.mask && this.formData[val.questionId].length != val.mask.length) {
      return val.errorMessage || 'Incorrect mask format';
    } else if (val.minLength && this.formData[val.questionId].length < val.minLength) {
      return `Min length should be ${val.minLength}`;
    } else if (val.maxLength && this.formData[val.questionId].length > val.maxLength) {
      return `Max length should be ${val.maxLength}`;
    } else if (val.regexPattern && !RegExp(val.regexPattern).test(this.formData[val.questionId])) {
      return val.errorMessage || `Should be Valid format`;
    }
    // else if (val.mstAnswerType == 'email' && this.formData[val.questionId] && !this.validateEmail(this.formData[val.questionId] || '')) {
    //   return `Invalid email`;
    // }
    else if (val.mstAnswerType == 'phonenumber' && this.formData[val.questionId] && !this.validatePhoneNumber(this.formData[val.questionId] || '')) {
      return `Invalid Phone Number`;
    }
    if (val.mstAnswerType == 'address' && val.required) {
      const data = this.formData[val.questionId] ? JSON.parse(this.formData[val.questionId]) : {};
      if (!data.description) {
        return val.errorMessage || "It's required field";
      }
    }
  }

  handleBlur(detail, question) {
    const errorMessage = this.formValidation(question);
    if (!errorMessage) {
      if (this.blurUpdateAnswerType.includes(question.mstAnswerType)) {
        this.debouncedMethod([{ questionId: question.questionId, answerValue: detail }]);
      } else {
        if (question.mstAnswerType === 'beneficiary') {
          const payload = [
            {
              questionId: question.questionId,
              answerValue: null,
              customQuestionList: detail.data,
              totalCustomQuestionCount: detail.count,
            },
          ];
          this.debouncedMethod(payload);
        }
      }
    }

    if (errorMessage) {
      this.formErrorMessage = { ...this.formErrorMessage, [question.questionId]: errorMessage };
    }
  }

  // checking form validation
  isFormValid() {
    const results: any = this.getSelectedQuestions();
    const selectedQuestions = results[0];
    let isValid = true;
    let error = {};
    selectedQuestions.forEach(val => {
      const childAnswerNew = val.childAnswerNew && val.childAnswerNew.length ? val.childAnswerNew : [];
      let errorMessage = this.formValidation(val);
      if (errorMessage) {
        error = { ...error, [val.questionId]: errorMessage };
        isValid = false;
      }
      if (childAnswerNew.length) {
        childAnswerNew.forEach(childVal => {
          let childErrorMessage = this.formValidation(childVal);

          if (childErrorMessage) {
            error = { ...error, [childVal.questionId]: childErrorMessage };
            isValid = false;
          }
        });
      }
    });
    this.formErrorMessage = error;
    return isValid;
  }

  // submit form function with validation based on props (isFormValidation is true)
  handleSubmit(isStepForm, index) {
    if (this.isFormValidation) {
      const valid = this.isFormValid();
      if (!valid) {
        alert('required fields are empty !');
        return;
      }
    }

    let lastIndex = this.questions.length - 1;
    if (isStepForm && index != lastIndex) {
      let val = this.questions[++index];
      this.selectSection(val.sectionId);
      // console.log('we can submit the form', this.formData);
    } else {
      // console.log('we can submit the form', this.formData);
    }
  }

  // previous button action
  handlePrevious(index) {
    let val = this.questions[--index];
    this.selectSection(val.sectionId);
  }

  renderSubmitButton(index) {
    if (this.isLoading) {
      return null;
    }
    if (this.isStepForm) {
      //  if step form we are rendering button group based on index
      let lastIndex = this.questions.length - 1;
      if (index == 0) {
        return (
          <div class="il-button-wrapper">
            <button class="il-btn-primary" onClick={() => this.handleSubmit(this.isStepForm, index)}>
              Next
            </button>
          </div>
        );
      }
      return (
        <div class="il-button-wrapper">
          <button class="il-btn-secondary" onClick={() => this.handlePrevious(index)}>
            Previous
          </button>
          <button class="il-btn-primary" onClick={() => this.handleSubmit(this.isStepForm, index)}>
            {index != lastIndex ? 'Next' : 'Submit'}
          </button>
        </div>
      );
    } else {
      // single form we are rendering button
      return (
        <div class="il-button-wrapper">
          <button class="il-btn-primary" onClick={() => this.handleSubmit(this.isStepForm, index)}>
            Submit
          </button>
        </div>
      );
    }
  }
  // returns the selected step form questions with step index
  private getSelectedQuestions() {
    let selectedQuestions: any = [];
    let stepFormIndex: number | undefined;
    if (this.isStepForm && this.stepFormId) {
      stepFormIndex = this.questions.findIndex(val => val.sectionId == this.stepFormId);
      selectedQuestions = this.questions.find(val => val.sectionId == this.stepFormId).questionsResponse;
    } else {
      selectedQuestions = this.questions;
    }
    return [selectedQuestions, stepFormIndex];
  }

  // child question render function
  private renderChildQuestions(childAnswerNew) {
    if (childAnswerNew && childAnswerNew.length) {
      return childAnswerNew.map(val => (
        <div class="child-question">
          <div class={`question-field question-field-${val.questionId}`}>{this.renderField(val)}</div>
          {this.renderChildQuestions(val.childAnswerNew)}
        </div>
      ));
    }
    return null;
  }

  // questions render function
  private renderQuestions() {
    if (this.error) {
      return <p>{this.error}</p>;
    }
    const [selectedQuestions, stepFormIndex]: any = this.getSelectedQuestions();
    return (
      <div class={`${this.baseClassName}_container`}>
        <div class={`${this.baseClassName}_section`}>
          {this.questions.length && this.isStepForm ? (
            <div class={this.baseClassName + '-form_tabs '}>
              {this.questions.map((val, index) => {
                if (val.sectionName) {
                  return (
                    <button class={this.stepFormId == val.sectionId ? 'qb_active' : 'qb_nav-link'} onClick={() => this.selectStepForm(val.sectionId, index)}>
                      {val.sectionName}
                    </button>
                  );
                }
              })}
            </div>
          ) : null}
          <div class={`${this.baseClassName}_wrapper`}>
            {selectedQuestions.length
              ? selectedQuestions.map(val => {
                  return (
                    <Fragment>
                      <div class={`question-field question-field-${val.questionId}`}> {this.renderField(val)}</div>
                      {this.renderChildQuestions(val.childAnswerNew)}
                    </Fragment>
                  );
                })
              : 'loading!'}
          </div>
        </div>
        {this.renderSubmitButton(stepFormIndex)}
      </div>
    );
  }

  render() {
    const { baseClassName, client, isErrorInRequiredMessage } = this;
    return <div class={`${baseClassName} ${baseClassName}--${client}`}>{isErrorInRequiredMessage ? <p>{isErrorInRequiredMessage}</p> : this.renderQuestions()}</div>;
  }
}
