import { Component, Prop, State, h, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'il-combobox',
  styleUrl: 'il-combobox.scss',
})
export class IlCombobox {
    @Prop() options: {
      label: string;
      value: string;
      id: string;
    }[] =[];
    @Prop() value: string;
    @Prop() label: string;
    @Prop() error: string | undefined;
    @Prop() readOnly: boolean;
    @Prop() placeholder: string;
    @Prop() required: Boolean;
    @Prop() tooltip: String;
    @Prop() isDefault: Object;
    @State() isOpen = false;
    @State() dropdown;
    @Event() valueChanged: EventEmitter<string>; // Event emitted when the value changes
    @State() inputValue: string;
    @State() newOption: {label: string, value: string, id: string};

    async componentDidLoad() {
      if(this.isDefault && !this.value) {
        this.handleSelect({ label: this.isDefault?.["answerLabel"], value: this.isDefault?.["answerId"] })
      }
    };

    @Listen('click', { target: 'window' })
    handleClickOutside(event: MouseEvent) {
      if (!this.isOpen || this.dropdown.contains(event.target as Node)) {
        return;
      }
      this.isOpen = false;
    }

    handleSelect(option: {label: string, value : string}) {
      this.valueChanged.emit(option.value);
      this.isOpen = false;
    }

    setInputValue(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      this.inputValue = inputElement.value;
    }

    handleBlur(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      this.valueChanged.emit(inputElement.value);
    }

    toggleDropdown() {
      this.isOpen = !this.isOpen;
    }

    renderOptions() {
      const selectedData: any = this.options.find(option => option.value == this.value) || {};
      if (this.isOpen) {
        return (
          <ul class="select-items">
            {this.options.length
              ? this.options.map(option => (
                option?.label && <li class={`${selectedData.value == option.value ? 'selected' : 'option'}`} onClick={() => this.handleSelect(option)}>
                  {option.label}
                </li>
              ))
              : null}
          </ul>
        );
      }

      if (!this.options.length) {
        return (
          <ul class="select-items">
            <li class="option">No Options Found!</li>
          </ul>
        );
      }
    }

    render() {
      const selectedData = this.options.find(option => option.value == this.value) || this.value;
      return (
        <div class="il-select-combo" ref={el => (this.dropdown = el)}>
          <p>
            <span class="label">
              {this.label}
              {this.required ? <span class="il-required">*</span> : null}
            </span>
            {this.tooltip ? <il-tooltip tooltip={this.tooltip}></il-tooltip> : null}
          </p>
          {
            this.readOnly ?
              <input
                class="il-control"
                type='text'
                value={typeof selectedData == "string" ? selectedData : selectedData?.label || ''}
                {...this.readOnly && { disabled: true }}
              /> :
              <div class="select-trigger" onClick={() => this.toggleDropdown()}>
                <input 
                class="il-control" 
                type="text" 
                value={typeof selectedData == "string" ? selectedData : selectedData?.label || ''} 
                onInput={this.setInputValue.bind(this)}
                placeholder={this.placeholder || "Select an Option"}
                onBlur={this.handleBlur.bind(this)}
                />
                <div class="select-icon">{this.isOpen ? '▲' : '▼'}</div>
              </div>}
          {this.renderOptions()}
          {this.error ? <p class="il-error">{this.error}</p> : null}
        </div>

      );
    }

  }
