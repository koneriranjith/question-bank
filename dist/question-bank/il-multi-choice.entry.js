import { r as registerInstance, a as createEvent, h } from './index-b342e128.js';

const ilMultiChoiceCss = "@import url(\"https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500;600;700;800&display=swap\"); *{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.il-multi-check{margin-bottom:1rem}.il-multi-check .multi-check{display:inline-block;position:relative;padding-left:35px;margin-right:22px;margin-top:10px;cursor:pointer;font-size:18px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.il-multi-check .multi-check.disabled{opacity:0.6;cursor:not-allowed;pointer-events:none}.il-multi-check .multi-check .form-check-input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.il-multi-check .multi-check .form-check-input.disabled,.il-multi-check .multi-check .form-check-input:disabled{opacity:0.6;cursor:not-allowed;pointer-events:none}.il-multi-check .multi-check .form-check-input:checked~.checkmark{background-color:#4caf50}.il-multi-check .multi-check .form-check-input:checked~.checkmark:after{display:block}.il-multi-check .multi-check .checkmark:after{left:7px;top:3px;width:5px;height:10px;border:solid #fff;border-width:0 3px 3px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.il-multi-check .checkmark{position:absolute;top:0;left:0;height:22px;width:22px;border-radius:4px;background-color:#eee}.il-multi-check .checkmark:after{content:\"\";position:absolute;display:none}";

const IlMultiChoice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.valueChanged = createEvent(this, "valueChanged", 7);
    this.selectedOptions = [];
    this.options = [];
    this.selectedValue = undefined;
    this.label = undefined;
    this.required = undefined;
    this.isDefault = undefined;
    this.readOnly = undefined;
    this.error = undefined;
    this.tooltip = undefined;
  }
  async componentDidLoad() {
    var _a, _b;
    if (this.isDefault && !this.selectedValue) {
      this.handleOptionClick({ label: (_a = this.isDefault) === null || _a === void 0 ? void 0 : _a["answerLabel"], value: (_b = this.isDefault) === null || _b === void 0 ? void 0 : _b["answerId"] });
    }
  }
  ;
  componentWillLoad() {
    this.selectedOptions = this.selectedValue.length ? this.selectedValue : [];
  }
  handleOptionClick(option) {
    const value = option.value;
    const index = this.selectedOptions.indexOf(value);
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    }
    else {
      this.selectedOptions.push(value);
    }
    this.valueChanged.emit(this.selectedOptions);
  }
  render() {
    return (h("div", { class: "il-multi-check" }, h("p", null, h("span", { class: "label" }, this.label, this.required ? h("span", { class: "il-required" }, "*") : null), this.tooltip ? h("il-tooltip", { tooltip: this.tooltip }) : null), this.options.map(option => (h("label", { class: `multi-check ${this.readOnly ? "disabled" : ""}` }, h("input", { class: "form-check-input", type: "checkbox", disabled: this.readOnly, checked: this.selectedOptions.includes(option.value), onChange: () => this.handleOptionClick(option) }), option.label, h("span", { class: "checkmark" })))), this.error ? h("p", { class: "il-error" }, this.error) : null));
  }
};
IlMultiChoice.style = ilMultiChoiceCss;

export { IlMultiChoice as il_multi_choice };

//# sourceMappingURL=il-multi-choice.entry.js.map