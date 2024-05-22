import { r as registerInstance, a as createEvent, h } from './index-b342e128.js';

const ilAddressCss = "@import url(\"https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500;600;700;800&display=swap\"); *{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.il-address{background:rgba(76, 175, 80, 0.3607843137);padding:5px;border-radius:12px;margin:8px 0px}.il-address .il-label{margin-bottom:0.5rem;display:inline-block;font-weight:500;font-size:16px;text-transform:capitalize}.il-address .il-search-box{margin-bottom:1rem;position:relative}.il-address .il-search-box .select-label{margin-bottom:10px;font-size:16px;font-weight:500;text-transform:capitalize;display:inline-block}.il-address .il-search-box .il-search-control{position:relative;width:100%;max-height:50px;display:block;padding:0.775rem 0.75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:0.375rem;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out}.il-address .il-search-box .il-search-control.disabled,.il-address .il-search-box .il-search-control:disabled{opacity:0.6;cursor:not-allowed;pointer-events:none}.il-address .il-search-box .il-search-control:focus-visible{outline:1px solid #ced4da}.il-address .il-search-box .select-items{background-color:#fff;border-radius:0.375rem;list-style:none;position:absolute;width:100%;z-index:99;box-shadow:0 0 40px 5px rgba(0, 0, 0, 0.1);padding:7px 0px 7px 0px;overflow-y:scroll;max-height:200px;border:1px solid #ced4da;margin-top:5px}.il-address .il-search-box .select-items .option{color:#000;padding:11px 16px;cursor:pointer;user-select:none;font-size:16px}.il-address .il-search-box .select-items .option:hover{background-color:#f3f7fe}.il-address .il-search-box .select-items .selected{background-color:#c3e0c4;color:#000;padding:11px 16px;cursor:pointer;user-select:none;font-size:16px}";

const fields = [
  { name: 'zipcode', lable: 'Zipcode', required: false, informationText: '' },
  // { name: 'country', lable: 'Country', required: false, informationText: '' },
  { name: 'address', lable: 'Address', required: false, informationText: '' },
  { name: 'city', lable: 'City', required: false, informationText: '' },
  { name: 'state', lable: 'State', required: false, informationText: '' },
];
const IlAddress = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.valueChanged = createEvent(this, "valueChanged", 7);
    this.valueBlur = createEvent(this, "valueBlur", 7);
    this.label = undefined;
    this.value = undefined;
    this.tooltip = undefined;
    this.error = undefined;
    this.readOnly = undefined;
    this.apiBaseUrl = undefined;
    this.required = undefined;
    this.carrierAuthorization = undefined;
    this.placeholder = { address: 'Search ....' };
    this.dropdown = undefined;
    this.options = [];
    this.searchQuery = '';
    this.isOpen = false;
  }
  watchPropHandler(newValue) {
    if (newValue) {
      this.searchQuery = newValue.description || '';
    }
  }
  handleClickOutside(event) {
    if (!this.isOpen || this.dropdown.contains(event.target)) {
      return;
    }
    this.valueBlur.emit(Object.assign(Object.assign({}, this.value), { description: this.searchQuery }));
    this.isOpen = false;
  }
  componentDidLoad() {
    this.searchQuery = this.value.description || '';
  }
  handleSearchInput(event) {
    const inputElement = event.target;
    this.searchQuery = inputElement.value;
    this.debouncedMethod(inputElement.value);
  }
  async getOptions(text) {
    try {
      const rawResponse = await fetch(`${this.apiBaseUrl}/getAddressDetails?address=${text}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Carrierauthorization': this.carrierAuthorization || '',
        },
      });
      const content = await rawResponse.json();
      return content.data;
    }
    catch (error) {
      console.log('error', error);
    }
    return 42;
  }
  async debouncedMethod(searchText) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(async () => {
      this.valueChanged.emit(Object.assign(Object.assign({}, this.value), { description: searchText }));
      const data = await this.getOptions(searchText);
      this.options = data;
    }, 300);
  }
  onInputFocusValue() {
    this.isOpen = true;
  }
  handleSelect(option) {
    const result = this.options.find((val) => option.value == val.description) || {};
    this.valueChanged.emit(result);
    this.searchQuery = option.value; // Clear the search query after selection
    this.isOpen = false;
  }
  handleFieldChange(ev, name) {
    ev.stopPropagation();
    let data = Object.assign(Object.assign({}, this.value), { [name]: ev.detail });
    this.valueChanged.emit(data);
  }
  // handleBlur(detail, name) {}
  render() {
    var _a;
    const filteredOptions = this.options
      .map((option) => ({ label: option.description, value: option.description }))
      .filter(option => option.label.toLowerCase().includes(this.searchQuery.toLowerCase()));
    return (h("div", { class: "il-address", ref: el => (this.dropdown = el) }, h("div", { class: "il-address-inner" }, this.label ? h("p", { class: "il-label" }, this.label) : null, this.required ? h("span", { class: "il-required" }, "*") : null, this.tooltip ? h("il-tooltip", { tooltip: this.tooltip }) : null), h("div", { class: "il-search-box" }, h("input", Object.assign({ class: "il-search-control", type: "text", value: this.searchQuery, placeholder: (_a = this.placeholder) === null || _a === void 0 ? void 0 : _a['address'], onFocus: () => this.onInputFocusValue(), onInput: event => this.handleSearchInput(event) }, this.readOnly && { disabled: true })), this.isOpen && filteredOptions.length ? (h("ul", { class: "select-items" }, filteredOptions.map(option => (h("li", { class: "option", onClick: () => this.handleSelect(option) }, option.label))))) : null, this.error ? h("p", { class: "il-error" }, this.error) : null), h("div", { class: "il-address-child-questions" }, fields.map(val => {
      var _a, _b;
      return (h("il-input", { type: 'text', label: val.lable, value: this.value[val.name] || '', error: '', readOnly: this.readOnly, placeholder: (_b = (_a = this.placeholder) === null || _a === void 0 ? void 0 : _a[val.name]) !== null && _b !== void 0 ? _b : '', required: val.required, tooltip: val.informationText || '', onValueChanged: ev => {
          this.handleFieldChange(ev, val.name);
        } }));
    }))));
  }
  static get watchers() { return {
    "value": ["watchPropHandler"]
  }; }
};
IlAddress.style = ilAddressCss;

export { IlAddress as il_address };

//# sourceMappingURL=il-address.entry.js.map