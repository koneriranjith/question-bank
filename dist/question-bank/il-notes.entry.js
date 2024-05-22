import { r as registerInstance, a as createEvent, h } from './index-b342e128.js';

const ilNotesCss = "@import url(\"https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500;600;700;800&display=swap\"); *{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.il-notes{margin-bottom:1rem;position:relative}.il-notes .notes{color:#6c757d;}.il-notes .check-label{margin-bottom:10px;font-size:16px;font-weight:500;text-transform:capitalize}.il-notes .multi-check{display:inline-block;position:relative;padding-left:35px;margin-right:22px;margin-top:10px;cursor:pointer;font-size:18px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.il-notes .multi-check.disabled{opacity:0.6;cursor:not-allowed;pointer-events:none}.il-notes .multi-check .form-check-input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.il-notes .multi-check .form-check-input.disabled,.il-notes .multi-check .form-check-input:disabled{opacity:0.6;cursor:not-allowed;pointer-events:none}.il-notes .multi-check .form-check-input:checked~.checkmark{background-color:#4caf50}.il-notes .multi-check .form-check-input:checked~.checkmark:after{display:block}.il-notes .multi-check .checkmark:after{left:7px;top:3px;width:5px;height:10px;border:solid #fff;border-width:0 3px 3px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.il-notes .checkmark{position:absolute;top:0;left:0;height:22px;width:22px;border-radius:4px;background-color:#eee}.il-notes .checkmark:after{content:\"\";position:absolute;display:none}";

const IlNotes = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.valueChanged = createEvent(this, "valueChanged", 7);
    this.selectedValue = undefined;
    this.notes = undefined;
    this.isShowCheckbox = undefined;
    this.checkboxText = undefined;
    this.readOnly = undefined;
    this.label = undefined;
    this.required = undefined;
    this.error = undefined;
    this.tooltip = undefined;
  }
  handleOptionClick() {
    this.valueChanged.emit(!this.selectedValue);
  }
  render() {
    return (h("div", { class: "il-notes" }, h("p", null, h("span", { class: "label" }, this.label, this.required ? h("span", { class: "il-required" }, "*") : null), this.tooltip ? h("il-tooltip", { tooltip: this.tooltip }) : null), this.notes ? h("p", { class: "notes", innerHTML: this.notes }) : null, this.isShowCheckbox ? (h("label", { class: `multi-check ${this.readOnly ? "disabled" : ""}` }, h("input", { class: "form-check-input", type: "checkbox", disabled: this.readOnly, checked: this.selectedValue || false, onChange: () => this.handleOptionClick() }), this.checkboxText, h("span", { class: "checkmark" }))) : null, this.error ? h("p", { class: "il-error" }, this.error) : null));
  }
};
IlNotes.style = ilNotesCss;

export { IlNotes as il_notes };

//# sourceMappingURL=il-notes.entry.js.map