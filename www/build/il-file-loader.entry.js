import { r as registerInstance, a as createEvent, h } from './index-b342e128.js';

const ilFileLoaderCss = "@import url(\"https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500;600;700;800&display=swap\"); *{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.il-file-loader{margin-bottom:1rem;position:relative}.il-file-loader .il-label{margin-bottom:0.5rem;display:inline-block;font-weight:500;font-size:16px;text-transform:capitalize}.il-file-loader .file-loader{width:100%;height:500px}.il-file-loader .il-button-wrapper .il-btn-primary{height:25px;padding:0px 12px;margin:10px 4px}.il-file-loader .il-button-wrapper .il-btn-primary:disabled{cursor:not-allowed;pointer-events:stroke;opacity:0.5}.il-file-loader .multi-check{display:inline-block;position:relative;padding-left:35px;margin-right:22px;margin-top:10px;cursor:pointer;font-size:18px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.il-file-loader .multi-check.disabled{opacity:0.6;cursor:not-allowed;pointer-events:none}.il-file-loader .multi-check .form-check-input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.il-file-loader .multi-check .form-check-input.disabled,.il-file-loader .multi-check .form-check-input:disabled{opacity:0.6;cursor:not-allowed;pointer-events:none}.il-file-loader .multi-check .form-check-input:checked~.checkmark{background-color:#4caf50}.il-file-loader .multi-check .form-check-input:checked~.checkmark:after{display:block}.il-file-loader .multi-check .checkmark{position:absolute;top:0;left:0;height:22px;width:22px;border-radius:4px;background-color:#eee}.il-file-loader .multi-check .checkmark:after{content:\"\";position:absolute;display:none}.il-file-loader .multi-check .checkmark:after{left:7px;top:3px;width:5px;height:10px;border:solid #fff;border-width:0 3px 3px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}";

const IlFileLoader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.valueChanged = createEvent(this, "valueChanged", 7);
    this.fileResponseList = undefined;
    this.label = undefined;
    this.required = undefined;
    this.readOnly = undefined;
    this.error = undefined;
    this.tooltip = undefined;
    this.isShowCheckbox = undefined;
    this.checkboxText = undefined;
    this.selectedValue = undefined;
    this.selectedIndex = 0;
  }
  handleSubmit(action) {
    if (action === 'previous') {
      this.selectedIndex = this.selectedIndex > 0 ? --this.selectedIndex : this.selectedIndex;
    }
    else if (action === 'next') {
      this.selectedIndex = this.selectedIndex == this.fileResponseList.length - 1 ? this.selectedIndex : ++this.selectedIndex;
    }
  }
  handleOptionClick() {
    this.valueChanged.emit(!this.selectedValue);
  }
  render() {
    return (h("div", { class: "il-file-loader" }, h("p", null, h("span", { class: "label" }, this.label, this.required ? h("span", { class: "il-required" }, "*") : null), this.tooltip ? h("il-tooltip", { tooltip: this.tooltip }) : null), h("embed", { class: "file-loader", src: this.fileResponseList[this.selectedIndex].fileUrl }), h("div", { class: "il-button-wrapper" }, h("button", { class: "il-btn-primary", disabled: this.selectedIndex == 0, onClick: () => this.handleSubmit('previous') }, "\u2190"), h("span", null, this.selectedIndex + 1, "/", this.fileResponseList.length), h("button", { class: "il-btn-primary", disabled: this.selectedIndex == this.fileResponseList.length - 1, onClick: () => this.handleSubmit('next') }, "\u2192")), this.isShowCheckbox ? (h("label", { class: `multi-check ${this.readOnly ? "disabled" : ""}` }, h("input", { class: "form-check-input", type: "checkbox", disabled: this.readOnly, checked: this.selectedValue || false, onChange: () => this.handleOptionClick() }), this.checkboxText, h("span", { class: "checkmark" }))) : null, this.error ? h("p", { class: "il-error" }, this.error) : null));
  }
};
IlFileLoader.style = ilFileLoaderCss;

export { IlFileLoader as il_file_loader };

//# sourceMappingURL=il-file-loader.entry.js.map