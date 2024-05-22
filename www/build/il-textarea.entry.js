import { r as registerInstance, a as createEvent, h } from './index-b342e128.js';

const ilTextareaCss = "@import url(\"https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500;600;700;800&display=swap\"); *{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.il-textarea{margin-bottom:1rem;position:relative}.il-textarea .label{margin-bottom:0.5rem;display:inline-block;font-weight:500;font-size:16px;text-transform:capitalize}.il-textarea .il-textarea-control{width:100%;display:block;padding:0.775rem 0.75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:0.375rem;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out}.il-textarea .il-textarea-control.disabled,.il-textarea .il-textarea-control:disabled{opacity:0.6;cursor:not-allowed;pointer-events:none}.il-textarea .il-textarea-control:focus-visible{outline:1px solid #ced4da}";

const IlTextarea = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.valueChanged = createEvent(this, "valueChanged", 7);
    this.valueBlur = createEvent(this, "valueBlur", 7);
    this.label = undefined;
    this.value = undefined;
    this.error = undefined;
    this.required = undefined;
    this.readOnly = undefined;
    this.placeholder = undefined;
    this.tooltip = undefined;
  }
  onInputChangeValue(event) {
    this.value = event.target.value;
    this.valueChanged.emit(this.value);
  }
  onInputBlurValue(event) {
    this.value = event.target.value;
    this.valueBlur.emit(this.value);
  }
  render() {
    return (h("div", { class: "il-textarea" }, h("p", null, h("span", { class: "label" }, this.label, this.required ? h("span", { class: "il-required" }, "*") : null), this.tooltip ? h("il-tooltip", { tooltip: this.tooltip }) : null), h("textarea", Object.assign({ class: "il-textarea-control", value: this.value || '', placeholder: this.placeholder, onBlur: this.onInputBlurValue.bind(this), onInput: this.onInputChangeValue.bind(this) }, this.readOnly && { disabled: true })), this.error ? h("p", { class: "il-error" }, this.error) : null));
  }
};
IlTextarea.style = ilTextareaCss;

export { IlTextarea as il_textarea };

//# sourceMappingURL=il-textarea.entry.js.map