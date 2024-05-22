import { Component, Prop, h, Event, EventEmitter, State, Method, Watch, Listen } from '@stencil/core';

interface Option {
  label: string;
  value: string;
}

const fields = [
  { name: 'zipcode', lable: 'Zipcode', required: false, informationText: '' },
  // { name: 'country', lable: 'Country', required: false, informationText: '' },
  { name: 'address', lable: 'Address', required: false, informationText: '' },
  { name: 'city', lable: 'City', required: false, informationText: '' },
  { name: 'state', lable: 'State', required: false, informationText: '' },
];

@Component({
  tag: 'il-address',
  styleUrl: 'il-address.scss',
})
export class IlAddress {
  @Prop({ reflect: true, mutable: true }) label: string;
  @Prop({ reflect: true, mutable: true }) value: any;
  @Prop() tooltip: String;
  @Prop() error: string | undefined;
  @Prop() readOnly: boolean;
  @Prop() apiBaseUrl: string;
  @Prop() required: boolean;
  @Prop() carrierAuthorization: string;
  @Prop() placeholder: object = { address: 'Search ....' };

  @Watch('value')
  watchPropHandler(newValue: any) {
    if (newValue) {
      this.searchQuery = newValue.description || '';
    }
  }

  @State() dropdown;
  @State() options: Option[] = [];
  @State() searchQuery: string = '';
  @State() isOpen: boolean = false;

  @Event() valueChanged: EventEmitter<Object>; // Event emitted when the value changes
  @Event() valueBlur: EventEmitter<Object>;

  @Listen('click', { target: 'window' })
  handleClickOutside(event: MouseEvent) {
    if (!this.isOpen || this.dropdown.contains(event.target as Node)) {
      return;
    }
    this.valueBlur.emit({ ...this.value, description: this.searchQuery });
    this.isOpen = false;
  }

  componentDidLoad() {
    this.searchQuery = this.value.description || '';
  }

  handleSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
    this.debouncedMethod(inputElement.value);
  }

  private timeoutId: NodeJS.Timeout | undefined;

  @Method()
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
    } catch (error) {
      console.log('error', error);
    }
    return 42;
  }
  @Method()
  async debouncedMethod(searchText: any) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(async () => {
      this.valueChanged.emit({ ...this.value, description: searchText });
      const data = await this.getOptions(searchText);
      this.options = data;
    }, 300);
  }

  private onInputFocusValue() {
    this.isOpen = true;
  }

  handleSelect(option: Option) {
    const result: any = this.options.find((val: any) => option.value == val.description) || {};
    this.valueChanged.emit(result);
    this.searchQuery = option.value; // Clear the search query after selection
    this.isOpen = false;
  }

  handleFieldChange(ev, name) {
    ev.stopPropagation();
    let data = { ...this.value, [name]: ev.detail };
    this.valueChanged.emit(data);
  }

  // handleBlur(detail, name) {}

  render() {
    const filteredOptions = this.options
      .map((option: any) => ({ label: option.description, value: option.description }))
      .filter(option => option.label.toLowerCase().includes(this.searchQuery.toLowerCase()));
    return (
      <div class="il-address" ref={el => (this.dropdown = el)}>
        <div class="il-address-inner">
          {this.label ? <p class="il-label">{this.label}</p> : null}
          {this.required ? <span class="il-required">*</span> : null}
          {this.tooltip ? <il-tooltip tooltip={this.tooltip}></il-tooltip> : null}
        </div>

        <div class="il-search-box">
          <input
            class="il-search-control"
            type="text"
            value={this.searchQuery}
            placeholder={this.placeholder?.['address']}
            onFocus={() => this.onInputFocusValue()}
            onInput={event => this.handleSearchInput(event)}
            {...this.readOnly && { disabled: true }}
          />

          {this.isOpen && filteredOptions.length ? (
            <ul class="select-items">
              {filteredOptions.map(option => (
                <li class="option" onClick={() => this.handleSelect(option)}>
                  {option.label}
                </li>
              ))}
            </ul>
          ) : null}
          {this.error ? <p class="il-error">{this.error}</p> : null}
        </div>

        <div class="il-address-child-questions">
          {fields.map(val => {
            return (
              <il-input
                type={'text'}
                label={val.lable}
                value={this.value[val.name] || ''}
                error={''}
                readOnly={this.readOnly}
                placeholder={this.placeholder?.[val.name] ?? ''}
                required={val.required}
                tooltip={val.informationText || ''}
                onValueChanged={ev => {
                  this.handleFieldChange(ev, val.name);
                }}
              // onValueBlur={ev => {}}
              ></il-input>
            );
          })}
        </div>
      </div>
    );
  }
}
