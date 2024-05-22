import { Component, h, Prop, State, Event, EventEmitter, Listen } from '@stencil/core';

interface Option {
  label: string;
  value: string;
}

@Component({
  tag: 'il-dropdown',
  styleUrl: 'il-dropdown.scss',
})
export class IlDropdown {
  @Prop() options: InstanceType<typeof Option>[] = [];
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

  handleSelect(option: Option) {
    this.valueChanged.emit(option.value);
    this.isOpen = false;
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
              <li class={`${selectedData.value == option.value ? 'selected' : 'option'}`} onClick={() => this.handleSelect(option)}>
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
    const selectedData = this.options.find(option => option.value == this.value);
    return (
      <div class="il-select" ref={el => (this.dropdown = el)}>
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
              value={ selectedData?.label || '' }
              
              {...this.readOnly && { disabled: true }}
            /> :
            <div class="select-trigger" onClick={() => this.toggleDropdown()}>
              <div class="selected-option">{this.value ? selectedData?.label || this.placeholder : <span class="placeholder">{this.placeholder || 'Select Option'}</span>}</div>
              <div class="select-icon">{this.isOpen ? '▲' : '▼'}</div>
            </div>}
        {this.renderOptions()}
        {this.error ? <p class="il-error">{this.error}</p> : null}
      </div>
    );
  }
}
