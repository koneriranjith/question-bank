import { r as registerInstance, a as createEvent, h } from './index-b342e128.js';

const myMultiSelectCss = "@import url(\"https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500;600;700;800&display=swap\"); *{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.il-multi-select{margin-bottom:1rem;position:relative}.il-multi-select .multi-select-label{margin-bottom:10px;font-size:16px;font-weight:500}.il-multi-select .multi-select-trigger{position:relative;width:100%;min-height:50px;display:block;padding:0.444rem 0.75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:0.375rem;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out}.il-multi-select .multi-select-trigger .multi-select-icon{position:absolute;content:\"\";top:13px;right:13px;color:#aeaeae;font-size:17px;vertical-align:middle;display:inline-block}.il-multi-select .multi-select-trigger .multi-selected-list{display:inline-block;font-weight:500;min-width:0px;background-color:#eaedf3;border-radius:2px;box-sizing:border-box;padding:3px 6px 3px 6px;font-size:16px;margin:2px}.il-multi-select .multi-select-trigger .multi-selected-list .un-select-icon{margin-left:8px;font-size:13px;vertical-align:middle;padding:3px 6px 3px 6px}.il-multi-select .multi-select-trigger .multi-selected-list .un-select-icon:hover{cursor:pointer;background-color:#6d757d;color:#fff;padding:3px 6px 3px 6px}.il-multi-select .il-multi-dropdown{background-color:#fff;border-radius:0.375rem;list-style:none;width:100%;z-index:99;box-shadow:0 0 40px 5px rgba(0, 0, 0, 0.1);padding:7px 0px 7px 0px;overflow-y:scroll;max-height:200px;border:1px solid #ced4da;margin-top:5px}.il-multi-select .il-multi-dropdown .option{color:#000;padding:11px 16px;cursor:pointer;user-select:none;font-size:16px}.il-multi-select .il-multi-dropdown .option:hover{background-color:#f3f7fe}.il-multi-select .il-multi-dropdown .selected{background-color:#4caf50;color:#fff;padding:11px 16px;cursor:pointer;user-select:none;font-size:16px}.il-multi-select .il-multi-dropdown .multi-check-select{position:relative;padding-left:35px;margin-right:22px;cursor:pointer;font-size:18px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.il-multi-select .il-multi-dropdown .multi-check-select .multi-check-input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.il-multi-select .il-multi-dropdown .multi-check-select .multi-check-input:checked~.checkmark{background-color:#4caf50}.il-multi-select .il-multi-dropdown .multi-check-select .multi-check-input:checked~.checkmark:after{display:block}.il-multi-select .il-multi-dropdown .multi-check-select .checkmark:after{left:7px;top:3px;width:5px;height:10px;border:solid #fff;border-width:0 3px 3px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.il-multi-select .il-multi-dropdown .checkmark{position:absolute;top:0;left:0;height:22px;width:22px;border-radius:4px;background-color:#eee}.il-multi-select .il-multi-dropdown .checkmark:after{content:\"\";position:absolute;display:none}";

const MyMultiSelect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.valuesChanged = createEvent(this, "valuesChanged", 7);
    this.options = [];
    this.label = undefined;
    this.error = undefined;
    this.values = [];
    this.required = undefined;
    this.placeholder = undefined;
    this.tooltip = undefined;
    this.isOpen = false;
    this.dropdown = undefined;
  }
  handleClickOutside(event) {
    if (!this.isOpen || this.dropdown.contains(event.target)) {
      return;
    }
    this.isOpen = false;
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  handleSelect(option) {
    const selectedValues = [...this.values];
    const index = selectedValues.indexOf(option.value);
    if (index > -1) {
      selectedValues.splice(index, 1);
    }
    else {
      selectedValues.push(option.value);
    }
    this.valuesChanged.emit(selectedValues);
  }
  render() {
    return (h("div", { class: "il-multi-select", ref: el => (this.dropdown = el) }, h("p", null, h("span", { class: "label" }, this.label, this.required ? h("span", { class: "il-required" }, "*") : null), this.tooltip ? h("il-tooltip", { tooltip: this.tooltip }) : null), h("div", { class: "multi-select-trigger", onClick: () => this.toggleDropdown() }, h("div", { class: "multi-selected-options" }, this.values.length > 0 ? (this.values.map(value => {
      var _a;
      return (h("div", { class: "multi-selected-list" }, (_a = this.options.find(option => option.value == value)) === null || _a === void 0 ? void 0 :
        _a.label, h("span", { onClick: () => this.handleSelect(this.options.find(option => option.value == value)), class: "un-select-icon il-close" }, "\u2715")));
    })) : (h("span", { class: "placeholder" }, this.placeholder))), h("div", { class: "multi-select-icon" }, this.isOpen ? '▲' : '▼')), this.isOpen && (h("ul", { class: "il-multi-dropdown" }, this.options.map(option => (h("li", { class: "option ", onClick: () => this.handleSelect(option) }, h("label", { class: "multi-check-select" }, h("input", { class: "multi-check-input", type: "checkbox", checked: this.values.includes(option.value), onChange: () => { } }), option.label, h("span", { class: "checkmark" }))))))), this.error ? h("p", { class: "il-error" }, this.error) : null));
  }
};
MyMultiSelect.style = myMultiSelectCss;

export { MyMultiSelect as my_multi_select };

//# sourceMappingURL=my-multi-select.entry.js.map