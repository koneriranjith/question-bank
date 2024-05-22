import { r as registerInstance, a as createEvent, h } from './index-b342e128.js';

const ilRadioButtonCss = "@import url(\"https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500;600;700;800&display=swap\"); *{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.il-radio-button{margin-bottom:20px}.il-radio-button .check-label{text-transform:capitalize}.il-radio-button .il-radio-label{margin-bottom:10px;font-size:16px;font-weight:500}.il-radio-button .il-radio-check{display:inline-block;position:relative;padding-left:35px;margin-right:22px;margin-top:10px;cursor:pointer;font-size:18px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.il-radio-button .il-radio-check.disabled{opacity:0.6;cursor:not-allowed;pointer-events:none}.il-radio-button .il-radio-check input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.il-radio-button .il-radio-check input.disabled,.il-radio-button .il-radio-check input:disabled{opacity:0.6;cursor:not-allowed;pointer-events:none}.il-radio-button .il-radio-check input:checked~.checkmark{background-color:#4caf50}.il-radio-button .il-radio-check input:checked~.checkmark:after{display:block}.il-radio-button .il-radio-check .checkmark:after{top:7px;left:7px;width:8px;height:8px;border-radius:50%;background:#fff}.il-radio-button .checkmark{position:absolute;top:0;left:0;height:22px;width:22px;background-color:#eee;border-radius:50%}.il-radio-button .checkmark:after{content:\"\";position:absolute;display:none}";

const IlRadioButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.valueChanged = createEvent(this, "valueChanged", 7);
    this.options = [];
    this.selectedValue = undefined;
    this.label = undefined;
    this.readOnly = undefined;
    this.isDefault = undefined;
    this.error = undefined;
    this.required = undefined;
    this.tooltip = undefined;
  }
  async componentDidLoad() {
    var _a, _b;
    if (this.isDefault && !this.selectedValue) {
      this.handleOptionClick({ label: (_a = this.isDefault) === null || _a === void 0 ? void 0 : _a["answerLabel"], value: (_b = this.isDefault) === null || _b === void 0 ? void 0 : _b["answerId"] });
    }
  }
  ;
  // private selectedOption: string;
  // componentWillLoad() {
  //   this.selectedOption = this.selectedValue;
  // }
  handleOptionClick(option) {
    const value = option.value;
    // this.selectedOption = value;
    this.valueChanged.emit(value);
  }
  render() {
    return (h("div", { class: "il-radio-button" }, h("p", null, h("span", { class: "label" }, this.label, this.required ? h("span", { class: "il-required" }, "*") : null), this.tooltip ? h("il-tooltip", { tooltip: this.tooltip }) : null), this.options.map(option => (h("label", { class: `il-radio-check ${this.readOnly ? "disabled" : ""}` }, h("input", { class: "form-check-input", type: "radio", disabled: this.readOnly, value: option.value, checked: this.selectedValue == option.value, onClick: () => this.handleOptionClick(option) }), option.label, h("span", { class: "checkmark" })))), this.error ? h("p", { class: "il-error" }, this.error) : null));
  }
};
IlRadioButton.style = ilRadioButtonCss;

export { IlRadioButton as il_radio_button };

//# sourceMappingURL=il-radio-button.entry.js.map