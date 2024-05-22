import { r as registerInstance, a as createEvent, h } from './index-b342e128.js';
import { a as arrayToString, s as stringToArray, g as getSVG } from './utils-5b70b85e.js';

const ilBeneficiaryCss = "@import url(\"https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500;600;700;800&display=swap\"); *{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}:host{display:block}.il-beneficiary-addmore{cursor:pointer;color:#2ba84a}.inner-elements{border:1px solid #ced4da;border-radius:0.375rem;padding:20px}.inner-elements .inner-bene{border:1px solid #ced4da;border-top:7px solid #2ba84a;box-shadow:0 0 40px 5px rgba(0, 0, 0, 0.05);border-radius:10px;padding:10px;margin-bottom:20px;width:100%;display:flex}.inner-elements .inner-bene .il-beneficiary-remove{cursor:pointer;fill:#dc3545;width:7%;text-align:right}.inner-elements .inner-bene .inner-bene-elements{width:93%}";

const IlBeneficiary = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.beneficiaryValueChanged = createEvent(this, "beneficiaryValueChanged", 7);
    this.beneficiaryValueBlur = createEvent(this, "beneficiaryValueBlur", 7);
    this.handleBeneficiaryChange = async (detail, question, index) => {
      var _a;
      this.formData[question['questionId']][index] = detail;
      if (!((_a = this.blurUpdateAnswerType) === null || _a === void 0 ? void 0 : _a.includes(question['mstAnswerType']))) {
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
    this.handleBeneficiaryBlur = (detail, question, index) => {
      var _a;
      this.formData[question['questionId']][index] = detail;
      if ((_a = this.blurUpdateAnswerType) === null || _a === void 0 ? void 0 : _a.includes(question['mstAnswerType'])) {
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
    this.label = undefined;
    this.value = undefined;
    this.tooltip = undefined;
    this.error = undefined;
    this.required = undefined;
    this.customColumns = undefined;
    this.maxLength = 1000;
    this.minLength = undefined;
    this.questionId = undefined;
    this.beneficiaries = undefined;
    this.blurUpdateAnswerType = undefined;
    this.formData = undefined;
  }
  async componentDidLoad() {
    let count = 1;
    const formData = this.customColumns.reduce((acc, val) => {
      var _a;
      acc = Object.assign(Object.assign({}, acc), { [val['questionId']]: ((_a = this.formData) === null || _a === void 0 ? void 0 : _a[val['questionId']]) || val['answer'] ? JSON.parse(val['answer']) : [''] });
      if (val['answer'] && count < JSON.parse(val['answer']).length) {
        count = JSON.parse(val['answer']).length;
      }
      return acc;
    }, {});
    this.formData = Object.assign(Object.assign({}, this.formData), formData);
    this.beneficiaries = count;
  }
  renderField(question, index) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16;
    switch (question.mstAnswerType) {
      case 'shorttext':
        return (h("il-input", { type: 'text', label: question.text, questionType: question.mstAnswerType, readOnly: (_a = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _a !== void 0 ? _a : false, mask: question.mask, value: (_d = (_c = (_b = this.formData) === null || _b === void 0 ? void 0 : _b[question['questionId']]) === null || _c === void 0 ? void 0 : _c[index]) !== null && _d !== void 0 ? _d : '', required: question.required, placeholder: question === null || question === void 0 ? void 0 : question.hintText, tooltip: question.informationText || '', onValueChanged: ev => this.handleBeneficiaryChange(ev.detail, question, index), onValueBlur: ev => {
            this.handleBeneficiaryBlur(ev.detail, question, index);
          } }));
      case 'longtext':
        return (h("il-textarea", { label: question.text, value: (_g = (_f = (_e = this.formData) === null || _e === void 0 ? void 0 : _e[question['questionId']]) === null || _f === void 0 ? void 0 : _f[index]) !== null && _g !== void 0 ? _g : '', required: question.required, placeholder: question === null || question === void 0 ? void 0 : question.hintText, readOnly: (_h = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _h !== void 0 ? _h : false, tooltip: question.informationText || '', onValueChanged: ev => this.handleBeneficiaryChange(ev.detail, question, index), onValueBlur: ev => {
            this.handleBeneficiaryBlur(ev.detail, question, index);
          } }));
      case 'email':
        return (h("il-input", { type: 'text', label: question.text, value: (_l = (_k = (_j = this.formData) === null || _j === void 0 ? void 0 : _j[question['questionId']]) === null || _k === void 0 ? void 0 : _k[index]) !== null && _l !== void 0 ? _l : '', required: question.required, placeholder: question === null || question === void 0 ? void 0 : question.hintText, readOnly: (_m = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _m !== void 0 ? _m : false, tooltip: question.informationText || '', onValueChanged: ev => this.handleBeneficiaryChange(ev.detail, question, index), onValueBlur: ev => {
            this.handleBeneficiaryBlur(ev.detail, question, index);
          } }));
      case 'number':
        return (h("il-input", { type: 'text', questionType: question.mstAnswerType, mask: question.mask, label: question.text, readOnly: (_o = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _o !== void 0 ? _o : false, value: (_r = (_q = (_p = this.formData) === null || _p === void 0 ? void 0 : _p[question['questionId']]) === null || _q === void 0 ? void 0 : _q[index]) !== null && _r !== void 0 ? _r : '', required: question.required, placeholder: question === null || question === void 0 ? void 0 : question.hintText, tooltip: question.informationText || '', onValueChanged: ev => this.handleBeneficiaryChange(ev.detail, question, index), onValueBlur: ev => {
            this.handleBeneficiaryBlur(ev.detail, question, index);
          } }));
      case 'phonenumber':
        return (h("il-input", { type: 'text', questionType: question.mstAnswerType, mask: question.mask, label: question.text, readOnly: (_s = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _s !== void 0 ? _s : false, value: (_v = (_u = (_t = this.formData) === null || _t === void 0 ? void 0 : _t[question['questionId']]) === null || _u === void 0 ? void 0 : _u[index]) !== null && _v !== void 0 ? _v : '', required: question.required, placeholder: question === null || question === void 0 ? void 0 : question.hintText, tooltip: question.informationText || '', onValueChanged: ev => this.handleBeneficiaryChange(ev.detail, question, index), onValueBlur: ev => {
            this.handleBeneficiaryBlur(ev.detail, question, index);
          } }));
      case 'Date':
        return (h("il-datepicker", {
          // error={this.formErrorMessage?.[question?.questionId] ?? ''}
          label: question.text, readOnly: (_w = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _w !== void 0 ? _w : false, tooltip: question.informationText || '', required: question.required, placeholder: question.hintText, dateFormat: question.dateFormat || "MM/dd/yyyy", value: (_z = (_y = (_x = this.formData) === null || _x === void 0 ? void 0 : _x[question['questionId']]) === null || _y === void 0 ? void 0 : _y[index]) !== null && _z !== void 0 ? _z : '', onValueChanged: ev => this.handleBeneficiaryChange((ev.detail), question, index)
        }));
      case 'multichoice':
        return (h("il-multi-choice", { label: question.text, tooltip: question.informationText || '', required: question.required, readOnly: question.readOnly || false, options: question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId })), onValueChanged: ev => this.handleBeneficiaryChange(arrayToString(ev.detail), question, index), selectedValue: stringToArray(((_1 = (_0 = this.formData) === null || _0 === void 0 ? void 0 : _0[question['questionId']]) === null || _1 === void 0 ? void 0 : _1[index]) || ((_4 = ((_3 = (_2 = question.answerResponse.filter((val) => val.isDefault)) === null || _2 === void 0 ? void 0 : _2[0]) === null || _3 === void 0 ? void 0 : _3["answerId"])) === null || _4 === void 0 ? void 0 : _4.toString())) || [] }));
      case 'Dropdown':
        return (h("il-dropdown", { label: question.text, tooltip: question.informationText || '', required: question.required, readOnly: question.readOnly || false, options: question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId })), value: ((_6 = (_5 = this.formData) === null || _5 === void 0 ? void 0 : _5[question['questionId']]) === null || _6 === void 0 ? void 0 : _6[index]) || ((_8 = (_7 = question.answerResponse.filter((val) => val.isDefault)) === null || _7 === void 0 ? void 0 : _7[0]) === null || _8 === void 0 ? void 0 : _8["answerId"]) || [], placeholder: question.hintText || "Select an option", onValueChanged: ev => this.handleBeneficiaryChange(ev.detail, question, index) }));
      case 'Radio':
        return (h("il-radio-button", { label: question.text, tooltip: question.informationText || '', required: question.required, readOnly: question.readOnly || false, options: question.answerResponse.map(val => ({ label: val.answerLabel, value: val.answerId })), onValueChanged: ev => this.handleBeneficiaryChange(ev.detail, question, index), selectedValue: ((_10 = (_9 = this.formData) === null || _9 === void 0 ? void 0 : _9[question['questionId']]) === null || _10 === void 0 ? void 0 : _10[index]) || ((_12 = (_11 = question.answerResponse.filter((val) => val.isDefault)) === null || _11 === void 0 ? void 0 : _11[0]) === null || _12 === void 0 ? void 0 : _12["answerId"]) || [] }));
      case 'password':
        return (h("il-input", { type: 'password', label: question.text, value: (_15 = (_14 = (_13 = this.formData) === null || _13 === void 0 ? void 0 : _13[question['questionId']]) === null || _14 === void 0 ? void 0 : _14[index]) !== null && _15 !== void 0 ? _15 : '', required: question.required, placeholder: question === null || question === void 0 ? void 0 : question.hintText, readOnly: (_16 = question === null || question === void 0 ? void 0 : question.readOnly) !== null && _16 !== void 0 ? _16 : false, tooltip: question.informationText || '', onValueChanged: ev => this.handleBeneficiaryChange(ev.detail, question, index), onValueBlur: ev => {
            this.handleBeneficiaryBlur(ev.detail, question, index);
          } }));
      default:
        return null;
    }
  }
  render() {
    return (h("div", { class: "il-input" }, h("div", { class: "il-input-inner" }, h("p", { class: "il-label" }, this.label), this.required ? h("span", { class: "il-required" }, "*") : null, this.tooltip ? h("il-tooltip", { tooltip: this.tooltip }) : null), h("div", { class: "inner-elements" }, Array.from(Array(this.beneficiaries)).map((_, index) => (h("div", null, h("div", { class: "inner-bene" }, h("div", { class: "inner-bene-elements" }, this.customColumns.map(item => (h("div", { class: `question-field question-field-${item['questionId']}` }, " ", this.renderField(item, index))))), this.error ? h("p", { class: "il-error" }, this.error) : null, this.beneficiaries > 1 ? (h("span", { class: "icon il-beneficiary-remove", onClick: () => {
        const formData = Object.assign({}, this.formData);
        this.customColumns.map(item => {
          formData[item['questionId']].splice(index, 1);
        });
        this.formData = Object.assign(Object.assign({}, formData), this.formData);
        this.beneficiaries -= 1;
        const payload = {
          data: Object.keys(this.formData).map(item => ({
            questionId: item,
            answers: this.formData[item],
          })),
          count: this.beneficiaries,
        };
        this.beneficiaryValueChanged.emit(payload);
      }, innerHTML: getSVG('remove_circle_icon') })) : null), index + 1 === this.beneficiaries && this.beneficiaries < this.maxLength ? (h("span", { class: "il-beneficiary-addmore", onClick: () => {
        const formData = Object.assign({}, this.formData);
        this.customColumns.map(item => {
          formData[item['questionId']][this.beneficiaries] = '';
        });
        this.formData = Object.assign(Object.assign({}, formData), this.formData);
        this.beneficiaries += 1;
      } }, "Add Beneficiary")) : null))))));
  }
};
IlBeneficiary.style = ilBeneficiaryCss;

export { IlBeneficiary as il_beneficiary };

//# sourceMappingURL=il-beneficiary.entry.js.map