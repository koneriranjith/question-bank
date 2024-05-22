import { r as registerInstance, h, F as Fragment } from './index-b342e128.js';
import { a as arrayToString, s as stringToArray } from './utils-5b70b85e.js';

const questionBankCss = "@import url(\"https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500;600;700;800&display=swap\"); *{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.question-bank{font-family:\"Karla\", sans-serif;position:relative;padding:40px 0;background-color:#f3f7fe}.question-bank .il-error,.question-bank .il-required{color:#ff0000}.question-bank .label{margin-bottom:0.5rem;display:inline-block;font-weight:500;font-size:16px;text-transform:capitalize}.question-bank .il-required{padding-right:7px;padding-left:4px}.question-bank .question-bank_container{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width: 576px){.question-bank .question-bank_container{max-width:540px}}@media (max-width: 992px){.question-bank .question-bank-form_tabs{flex-direction:column;border-radius:10px}.question-bank .question-bank-form_tabs .qb_nav-link,.question-bank .question-bank-form_tabs .qb_active{margin-bottom:5px}.question-bank .il-tooltip-info{margin-bottom:20px}}@media (min-width: 768px){.question-bank .questiion-bank_container{max-width:720px}}@media (min-width: 992px){.question-bank .question-bank_container{max-width:960px}}@media (min-width: 1200px){.question-bank .question-bank_container{max-width:1200px}}@media (min-width: 1400px){.question-bank .question-bank_container{max-width:1320px}}.question-bank .question-bank-form_tabs{border-radius:50px;background-color:#fff;padding:11px 16px;display:flex;margin-bottom:0;list-style:none;border:3px solid rgba(76, 175, 80, 0.36);justify-content:space-between;align-items:center;column-gap:10px}.question-bank .question-bank-form_tabs .qb_nav-link{border-radius:35px;width:100%;height:50px;font-weight:600;font-size:15px;transition:0.5s all ease;text-transform:capitalize;color:#2f3146;border:solid 2px transparent;background-color:#eaedf3;padding:0 3px;display:inline-block}.question-bank .question-bank-form_tabs .qb_active{background-color:#4caf50;border-radius:35px;width:100%;height:50px;font-weight:800;font-size:15px;transition:0.5s all ease;text-transform:capitalize;color:#fff;border:solid 2px transparent;padding:0 3px;display:inline-block}.question-bank .question-bank_wrapper{background:#fff;border-radius:10px;border-top:7px solid #4caf50;box-shadow:0 0 40px 5px rgba(0, 0, 0, 0.05);margin-top:2rem;padding:2rem}.question-bank .question-bank_wrapper .question-field{padding-right:15px;padding-left:15px}.question-bank .question-bank_wrapper .child-question{padding-left:20px}.question-bank .question-bank_wrapper .hydrated{margin-bottom:1.2rem}.question-bank .question-bank_wrapper .hydrated .row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px}.question-bank .il-button-wrapper .il-btn-primary{background-color:#4caf50;font-size:17px;color:#fff;font-weight:bold;border-radius:8px;transition:0.5s all ease;text-transform:uppercase;position:relative;overflow:hidden;display:inline-block;height:52px;border:none;margin-top:30px;padding:0px 50px}.question-bank .il-button-wrapper .il-btn-secondary{background-color:#6c757d;font-size:17px;color:#fff;font-weight:bold;border-radius:8px;transition:0.5s all ease;text-transform:uppercase;position:relative;overflow:hidden;display:inline-block;height:52px;border:none;margin-top:30px;padding:0px 50px;margin-right:13px}";

const QuestionBank = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // component base class name 'question-bank'
    this.baseClassName = 'question-bank';
    this.blurUpdateAnswerType = ['shorttext', 'longtext', 'email', 'number', 'phonenumber', 'password'];
    this.client = undefined;
    this.apiBaseUrl = undefined;
    this.applicationId = undefined;
    this.carrierAuthorization = undefined;
    this.userId = undefined;
    this.formId = undefined;
    this.singleForm = undefined;
    this.isFormValidation = undefined;
    this.isErrorInRequiredMessage = undefined;
    this.questions = [];
    this.error = undefined;
    this.isStepForm = undefined;
    this.stepFormId = undefined;
    this.formData = {};
    this.formErrorMessage = {};
    this.isLoading = undefined;
  }
  // watch stepFormId for update the Form Data values
  watchPropHandler(newValue, oldValue) {
    if (newValue && this.questions.length) {
      this.setFormData(newValue, this.questions);
    }
    console.log('oldValue', oldValue);
  }
  setnLevelFormData(acc, val) {
    if (this.formData[val.questionId] || val.answer) {
      acc = Object.assign(Object.assign({}, acc), { [val.questionId]: this.formData[val.questionId] || val.answer });
    }
    if (val.childAnswerNew && val.childAnswerNew.length) {
      val.childAnswerNew.forEach(innerval => {
        acc = this.setnLevelFormData(acc, innerval);
      });
    }
    return acc;
  }
  // update the form data values based on selected stepForm
  setFormData(stepFormId, questions) {
    let selectedQuestions = [];
    if (stepFormId) {
      selectedQuestions = questions.find((val) => val.sectionId == stepFormId).questionsResponse;
    }
    else {
      selectedQuestions = questions;
    }
    const formData = selectedQuestions.reduce((acc, val) => {
      return this.setnLevelFormData(acc, val);
    }, {});
    this.formData = Object.assign(Object.assign({}, this.formData), formData);
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
          }
          else {
            data = content.data;
          }
          this.isStepForm = !!data[0].sectionName;
          if (this.isStepForm) {
            this.stepFormId = data[0].sectionId;
          }
          this.setFormData(this.stepFormId, data);
          this.questions = data;
        }
        else {
          this.error = 'Something went wrong!';
        }
        this.isLoading = false;
      }
      catch (error) {
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
    }
    catch (error) {
      console.log('error', error);
    }
    return 42;
  }
  // every question field on change debounce Method will be called, check for child addQuestion or removeQuestion
  async debouncedMethod(payload) {
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
      childAnswerNew = addList[val === null || val === void 0 ? void 0 : val.questionId];
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
    var _a, _b;
    let childAnswerNew = val['childAnswerNew'];
    if (addCheckList.includes(val.questionId) || removeCheckList.includes(val.questionId)) {
      childAnswerNew = this.setChildQuestionsData(childAnswerNew, addCheckList, removeCheckList, val, addList, removeList);
    }
    else {
      if (((_a = val === null || val === void 0 ? void 0 : val.childAnswerNew) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        childAnswerNew = (_b = val === null || val === void 0 ? void 0 : val.childAnswerNew) === null || _b === void 0 ? void 0 : _b.map(item => {
          return this.getnLevelChildQuestions(item, addCheckList, removeCheckList, addList, removeList);
        });
      }
    }
    return Object.assign(Object.assign({}, val), { childAnswerNew: childAnswerNew });
  }
  // mutating the question state with the child question data
  getUpdatedChildQuestionData(addList, removeList) {
    const addCheckList = addList && Object.keys(addList).length ? Object.keys(addList).map(val => Number(val)) : [];
    const removeCheckList = removeList && Object.keys(removeList).length ? Object.keys(removeList).map(val => Number(val)) : [];
    const [selectedQuestions, stepFormIndex] = this.getSelectedQuestions();
    if (this.isStepForm) {
      const questionsResponse = selectedQuestions.map(val => {
        return this.getnLevelChildQuestions(val, addCheckList, removeCheckList, addList, removeList);
      });
      return this.questions.map((val, index) => {
        if (index == stepFormIndex) {
          return Object.assign(Object.assign({}, val), { questionsResponse });
        }
        return val;
      });
    }
    else {
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
    var _a, _b;
    (_a = this.formErrorMessage) === null || _a === void 0 ? true : delete _a[question.questionId];
    this.formData = Object.assign(Object.assign({}, this.formData), { [question.questionId]: detail || '' });
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
    else {
      if (!((_b = this.blurUpdateAnswerType) === null || _b === void 0 ? void 0 : _b.includes(question === null || question === void 0 ? void 0 : question.mstAnswerType))) {
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    switch (question.mstAnswerType) {
      case 'shorttext':
        return (h("il-input", { type: 'text', questionType: question.mstAnswerType, label: question.text, mask: question.mask, readOnly: (_a = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _a !== void 0 ? _a : false, value: this.formData[question.questionId] || '', error: this.formErrorMessage[question.questionId], required: question.required, placeholder: question.hintText, tooltip: question.informationText || '', onValueChanged: ev => this.handleChange(ev.detail, question), onValueBlur: ev => {
            this.handleBlur(ev.detail, question);
          } }));
      case 'longtext':
        return (h("il-textarea", { error: this.formErrorMessage[question.questionId], label: question.text, required: question.required, tooltip: question.informationText || '', readOnly: (_b = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _b !== void 0 ? _b : false, placeholder: question.hintText, value: this.formData[question.questionId] || '', onValueChanged: ev => this.handleChange(ev.detail, question), onValueBlur: ev => {
            this.handleBlur(ev.detail, question);
          } }));
      case 'address':
        return (h("il-address", { "api-base-url": this.apiBaseUrl, error: this.formErrorMessage[question.questionId], required: question.required, label: question.text, readOnly: question.readOnly || false, placeholder: question.hintText ? JSON.parse(question.hintText) : {}, "carrier-authorization": this.carrierAuthorization, value: this.formData[question.questionId] ? JSON.parse(this.formData[question.questionId]) : {}, tooltip: question.informationText || '', onValueChanged: ev => this.handleChange(JSON.stringify(ev.detail), question), onValueBlur: ev => {
            this.handleBlur(ev.detail, question);
          } }));
      case 'email':
        return (h("il-input", { type: 'text', questionType: question.mstAnswerType, error: this.formErrorMessage[question.questionId], label: question.text, tooltip: question.informationText || '', readOnly: (_c = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _c !== void 0 ? _c : false, required: question.required, placeholder: question.hintText, value: this.formData[question.questionId] || '', onValueChanged: ev => this.handleChange(ev.detail, question), onValueBlur: ev => {
            this.handleBlur(ev.detail, question);
          } }));
      case 'number':
        return (h("il-input", { type: 'text', questionType: question.mstAnswerType, mask: question.mask, error: this.formErrorMessage[question.questionId], readOnly: (_d = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _d !== void 0 ? _d : false, label: question.text, tooltip: question.informationText || '', required: question.required, placeholder: question.hintText, value: this.formData[question.questionId] || '', onValueChanged: ev => this.handleChange(ev.detail, question), onValueBlur: ev => {
            this.handleBlur(ev.detail, question);
          } }));
      case 'phonenumber':
        return (h("il-input", { type: 'text', questionType: question.mstAnswerType, mask: question.mask, error: this.formErrorMessage[question.questionId], readOnly: (_e = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _e !== void 0 ? _e : false, label: question.text, tooltip: question.informationText || '', required: question.required, placeholder: question.hintText, value: this.formData[question.questionId] || '', onValueChanged: ev => this.handleChange(ev.detail, question), onValueBlur: ev => {
            this.handleBlur(ev.detail, question);
          } }));
      case 'Date':
        return (h("il-datepicker", { error: (_g = (_f = this.formErrorMessage) === null || _f === void 0 ? void 0 : _f[question === null || question === void 0 ? void 0 : question.questionId]) !== null && _g !== void 0 ? _g : '', label: question.text, readOnly: (_h = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _h !== void 0 ? _h : false, tooltip: question.informationText || '', required: question.required, placeholder: question.hintText, dateFormat: question.dateFormat || 'MM/DD/YYYY', value: ((_j = this.formData) === null || _j === void 0 ? void 0 : _j[question === null || question === void 0 ? void 0 : question.questionId]) || '', onValueChanged: ev => this.handleChange(ev.detail, question) }));
      case 'multichoice':
        return (h("il-multi-choice", { label: question.text, tooltip: question.informationText || '', error: this.formErrorMessage[question.questionId], required: question.required, readOnly: (_k = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _k !== void 0 ? _k : false, isDefault: (_l = question.answerResponse.filter(val => val.isDefault)) === null || _l === void 0 ? void 0 : _l[0], options: question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId })), onValueChanged: ev => this.handleChange(arrayToString(ev.detail), question), selectedValue: stringToArray(this.formData[question.questionId]) || [] }));
      case 'notes':
        return (h("il-notes", { label: question.text, checkboxText: question.checkboxText, isShowCheckbox: question.isShowCheckbox, notes: question.notes, readOnly: question.readOnly || false, tooltip: question.informationText || '', error: this.formErrorMessage[question.questionId], required: question.required, onValueChanged: ev => this.handleChange(ev.detail, question), selectedValue: this.formData[question.questionId] }));
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
        return (h("il-dropdown", { label: question.text, tooltip: question.informationText || '', required: question.required, error: this.formErrorMessage[question.questionId], readOnly: question.readOnly || false, isDefault: (_m = question.answerResponse.filter(val => val.isDefault)) === null || _m === void 0 ? void 0 : _m[0], options: question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId })), value: this.formData[question.questionId], placeholder: question.hintText || 'Select an option', onValueChanged: ev => this.handleChange(ev.detail, question) }));
      case 'Radio':
        return (h("il-radio-button", { label: question.text, tooltip: question.informationText || '', required: question.required, readOnly: question.readOnly || false, isDefault: (_o = question.answerResponse.filter(val => val.isDefault)) === null || _o === void 0 ? void 0 : _o[0], error: this.formErrorMessage[question.questionId], options: question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId })), onValueChanged: ev => this.handleChange(ev.detail, question), selectedValue: this.formData[question.questionId] || [] }));
      case 'files':
        return (h("il-file-loader", { fileResponseList: question.fileResponseList, label: question.text, required: question.required, readOnly: question.readOnly || false, error: this.formErrorMessage[question.questionId], tooltip: question.informationText || '', onValueChanged: ev => this.handleChange(ev.detail, question), selectedValue: this.formData[question.questionId], checkboxText: question.checkboxText, isShowCheckbox: question.isShowCheckbox }));
      case 'password':
        return (h("il-input", { type: 'password', questionType: question.mstAnswerType, label: question.text, value: this.formData[question.questionId] || '', error: this.formErrorMessage[question.questionId], readOnly: (_p = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _p !== void 0 ? _p : false, mask: question.mask, required: question.required, placeholder: question.hintText, tooltip: question.informationText || '', onValueChanged: ev => this.handleChange(ev.detail, question), onValueBlur: ev => {
            this.handleBlur(ev.detail, question);
          } }));
      case 'beneficiary':
        return (h("il-beneficiary", { label: question.text, value: this.formData[question.questionId] || '', error: this.formErrorMessage[question.questionId], required: question.required, tooltip: question.informationText || '', customColumns: question.customColumns || [], questionId: question.questionId, onBeneficiaryValueChanged: ev => this.handleChange(ev.detail, question), onBeneficiaryValueBlur: ev => this.handleBlur(ev.detail, question), blurUpdateAnswerType: this.blurUpdateAnswerType, maxLength: question === null || question === void 0 ? void 0 : question.maxLength, minLength: question === null || question === void 0 ? void 0 : question.minLength }));
      case 'combobox':
        return (h("il-combobox", { label: question.text, tooltip: question.informationText || '', required: question.required, error: this.formErrorMessage[question.questionId], readOnly: question.readOnly || false, isDefault: (_q = question.answerResponse.filter(val => val.isDefault)) === null || _q === void 0 ? void 0 : _q[0], options: question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId, id: 'old' })), value: this.formData[question.questionId], placeholder: question.hintText || 'Select an option', onValueChanged: ev => this.handleChange(ev.detail, question) }));
      default:
        return h("p", null, "--- not implemented yet --- ", question.mstAnswerType);
    }
  }
  formValidation(val) {
    if (val.required && !this.formData[val.questionId]) {
      return val.errorMessage || "It's required field";
    }
    else if (val.mask && this.formData[val.questionId].length != val.mask.length) {
      return val.errorMessage || 'Incorrect mask format';
    }
    else if (val.minLength && this.formData[val.questionId].length < val.minLength) {
      return `Min length should be ${val.minLength}`;
    }
    else if (val.maxLength && this.formData[val.questionId].length > val.maxLength) {
      return `Max length should be ${val.maxLength}`;
    }
    else if (val.regexPattern && !RegExp(val.regexPattern).test(this.formData[val.questionId])) {
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
      }
      else {
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
      this.formErrorMessage = Object.assign(Object.assign({}, this.formErrorMessage), { [question.questionId]: errorMessage });
    }
  }
  // checking form validation
  isFormValid() {
    const results = this.getSelectedQuestions();
    const selectedQuestions = results[0];
    let isValid = true;
    let error = {};
    selectedQuestions.forEach(val => {
      const childAnswerNew = val.childAnswerNew && val.childAnswerNew.length ? val.childAnswerNew : [];
      let errorMessage = this.formValidation(val);
      if (errorMessage) {
        error = Object.assign(Object.assign({}, error), { [val.questionId]: errorMessage });
        isValid = false;
      }
      if (childAnswerNew.length) {
        childAnswerNew.forEach(childVal => {
          let childErrorMessage = this.formValidation(childVal);
          if (childErrorMessage) {
            error = Object.assign(Object.assign({}, error), { [childVal.questionId]: childErrorMessage });
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
    }
    else {
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
        return (h("div", { class: "il-button-wrapper" }, h("button", { class: "il-btn-primary", onClick: () => this.handleSubmit(this.isStepForm, index) }, "Next")));
      }
      return (h("div", { class: "il-button-wrapper" }, h("button", { class: "il-btn-secondary", onClick: () => this.handlePrevious(index) }, "Previous"), h("button", { class: "il-btn-primary", onClick: () => this.handleSubmit(this.isStepForm, index) }, index != lastIndex ? 'Next' : 'Submit')));
    }
    else {
      // single form we are rendering button
      return (h("div", { class: "il-button-wrapper" }, h("button", { class: "il-btn-primary", onClick: () => this.handleSubmit(this.isStepForm, index) }, "Submit")));
    }
  }
  // returns the selected step form questions with step index
  getSelectedQuestions() {
    let selectedQuestions = [];
    let stepFormIndex;
    if (this.isStepForm && this.stepFormId) {
      stepFormIndex = this.questions.findIndex(val => val.sectionId == this.stepFormId);
      selectedQuestions = this.questions.find(val => val.sectionId == this.stepFormId).questionsResponse;
    }
    else {
      selectedQuestions = this.questions;
    }
    return [selectedQuestions, stepFormIndex];
  }
  // child question render function
  renderChildQuestions(childAnswerNew) {
    if (childAnswerNew && childAnswerNew.length) {
      return childAnswerNew.map(val => (h("div", { class: "child-question" }, h("div", { class: `question-field question-field-${val.questionId}` }, this.renderField(val)), this.renderChildQuestions(val.childAnswerNew))));
    }
    return null;
  }
  // questions render function
  renderQuestions() {
    if (this.error) {
      return h("p", null, this.error);
    }
    const [selectedQuestions, stepFormIndex] = this.getSelectedQuestions();
    return (h("div", { class: `${this.baseClassName}_container` }, h("div", { class: `${this.baseClassName}_section` }, this.questions.length && this.isStepForm ? (h("div", { class: this.baseClassName + '-form_tabs ' }, this.questions.map((val, index) => {
      if (val.sectionName) {
        return (h("button", { class: this.stepFormId == val.sectionId ? 'qb_active' : 'qb_nav-link', onClick: () => this.selectStepForm(val.sectionId, index) }, val.sectionName));
      }
    }))) : null, h("div", { class: `${this.baseClassName}_wrapper` }, selectedQuestions.length
      ? selectedQuestions.map(val => {
        return (h(Fragment, null, h("div", { class: `question-field question-field-${val.questionId}` }, " ", this.renderField(val)), this.renderChildQuestions(val.childAnswerNew)));
      })
      : 'loading!')), this.renderSubmitButton(stepFormIndex)));
  }
  render() {
    const { baseClassName, client, isErrorInRequiredMessage } = this;
    return h("div", { class: `${baseClassName} ${baseClassName}--${client}` }, isErrorInRequiredMessage ? h("p", null, isErrorInRequiredMessage) : this.renderQuestions());
  }
  static get watchers() { return {
    "stepFormId": ["watchPropHandler"]
  }; }
};
QuestionBank.style = questionBankCss;

export { QuestionBank as question_bank };

//# sourceMappingURL=question-bank.entry.js.map