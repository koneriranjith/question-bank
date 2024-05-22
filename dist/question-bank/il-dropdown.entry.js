import { r as registerInstance, a as createEvent, h } from './index-b342e128.js';

const ilDropdownCss = "@import url(\"https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500;600;700;800&display=swap\"); *{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.il-select{margin-bottom:1rem;position:relative}.il-select .select-label{margin-bottom:10px;font-size:16px;font-weight:500;text-transform:capitalize;display:inline-block}.il-select .il-control{width:100%;display:block;padding:0.775rem 0.75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:0.375rem;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out}.il-select .il-control:focus-visible{outline:1px solid #ced4da}.il-select .il-control.disabled,.il-select .il-control:disabled{opacity:0.6;cursor:not-allowed;pointer-events:none}.il-select .select-trigger{position:relative;width:100%;max-height:50px;display:block;padding:0.775rem 0.75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:0.375rem;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out}.il-select .select-trigger .select-icon{position:absolute;content:\"\";top:13px;right:13px;color:#aeaeae;font-size:14px;vertical-align:middle;display:inline-block}.il-select .select-items{background-color:#fff;border-radius:0.375rem;list-style:none;position:absolute;width:100%;z-index:99;box-shadow:0 0 40px 5px rgba(0, 0, 0, 0.1);padding:7px 0px 7px 0px;overflow-y:scroll;max-height:200px;border:1px solid #ced4da;margin-top:5px}.il-select .select-items .option{color:#000;padding:11px 16px;cursor:pointer;user-select:none;font-size:16px}.il-select .select-items .option:hover{background-color:#f3f7fe}.il-select .select-items .selected{background-color:#c3e0c4;color:#000;padding:11px 16px;cursor:pointer;user-select:none;font-size:16px}";

const IlDropdown = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.valueChanged = createEvent(this, "valueChanged", 7);
    this.options = [];
    this.value = undefined;
    this.label = undefined;
    this.error = undefined;
    this.readOnly = undefined;
    this.placeholder = undefined;
    this.required = undefined;
    this.tooltip = undefined;
    this.isDefault = undefined;
    this.isOpen = false;
    this.dropdown = undefined;
  }
  async componentDidLoad() {
    var _a, _b;
    if (this.isDefault && !this.value) {
      this.handleSelect({ label: (_a = this.isDefault) === null || _a === void 0 ? void 0 : _a["answerLabel"], value: (_b = this.isDefault) === null || _b === void 0 ? void 0 : _b["answerId"] });
    }
  }
  ;
  handleClickOutside(event) {
    if (!this.isOpen || this.dropdown.contains(event.target)) {
      return;
    }
    this.isOpen = false;
  }
  handleSelect(option) {
    this.valueChanged.emit(option.value);
    this.isOpen = false;
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  renderOptions() {
    const selectedData = this.options.find(option => option.value == this.value) || {};
    if (this.isOpen) {
      return (h("ul", { class: "select-items" }, this.options.length
        ? this.options.map(option => (h("li", { class: `${selectedData.value == option.value ? 'selected' : 'option'}`, onClick: () => this.handleSelect(option) }, option.label)))
        : null));
    }
    if (!this.options.length) {
      return (h("ul", { class: "select-items" }, h("li", { class: "option" }, "No Options Found!")));
    }
  }
  render() {
    const selectedData = this.options.find(option => option.value == this.value);
    return (h("div", { class: "il-select", ref: el => (this.dropdown = el) }, h("p", null, h("span", { class: "label" }, this.label, this.required ? h("span", { class: "il-required" }, "*") : null), this.tooltip ? h("il-tooltip", { tooltip: this.tooltip }) : null), this.readOnly ?
      h("input", Object.assign({ class: "il-control", type: 'text', value: (selectedData === null || selectedData === void 0 ? void 0 : selectedData.label) || '' }, this.readOnly && { disabled: true })) :
      h("div", { class: "select-trigger", onClick: () => this.toggleDropdown() }, h("div", { class: "selected-option" }, this.value ? (selectedData === null || selectedData === void 0 ? void 0 : selectedData.label) || this.placeholder : h("span", { class: "placeholder" }, this.placeholder || 'Select Option')), h("div", { class: "select-icon" }, this.isOpen ? '▲' : '▼')), this.renderOptions(), this.error ? h("p", { class: "il-error" }, this.error) : null));
  }
};
IlDropdown.style = ilDropdownCss;

export { IlDropdown as il_dropdown };

//# sourceMappingURL=il-dropdown.entry.js.map