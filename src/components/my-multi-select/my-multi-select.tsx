import { Component, h, Prop, State, Event, Listen, EventEmitter } from '@stencil/core';

interface Option {
  label: string;
  value: string;
}

@Component({
  tag: 'my-multi-select',
  styleUrl: 'my-multi-select.scss',
})
export class MyMultiSelect {
  @Prop() options: InstanceType<typeof Option>[] = [];
  @Prop() label: string;
  @Prop() error: string | undefined;
  @Prop() values: string[] = [];
  @Prop() required: Boolean;
  @Prop() placeholder: string;
  @Prop() tooltip: String;

  @State() isOpen = false;
  @State() dropdown;

  @Event() valuesChanged: EventEmitter<string[]>; // Event emitted when the values change

  @Listen('click', { target: 'window' })
  handleClickOutside(event: MouseEvent) {
    if (!this.isOpen || this.dropdown.contains(event.target as Node)) {
      return;
    }
    this.isOpen = false;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  handleSelect(option: Option) {
    const selectedValues = [...this.values];
    const index = selectedValues.indexOf(option.value);
    if (index > -1) {
      selectedValues.splice(index, 1);
    } else {
      selectedValues.push(option.value);
    }
    this.valuesChanged.emit(selectedValues);
  }

  render() {
    return (
      <div class="il-multi-select" ref={el => (this.dropdown = el)}>
        <p>
          <span class="label">
            {this.label}
            {this.required ? <span class="il-required">*</span> : null}
          </span>
          {this.tooltip ? <il-tooltip tooltip={this.tooltip}></il-tooltip> : null}
        </p>
        <div class="multi-select-trigger" onClick={() => this.toggleDropdown()}>
          <div class="multi-selected-options">
            {this.values.length > 0 ? (
              this.values.map(value => (
                <div class="multi-selected-list">
                  {this.options.find(option => option.value == value)?.label}
                  <span onClick={() => this.handleSelect(this.options.find(option => option.value == value))} class="un-select-icon il-close">
                    ✕
                  </span>
                </div>
              ))
            ) : (
              <span class="placeholder">{this.placeholder}</span>
            )}
          </div>
          <div class="multi-select-icon">{this.isOpen ? '▲' : '▼'}</div>
        </div>
        {this.isOpen && (
          <ul class="il-multi-dropdown">
            {this.options.map(option => (
              <li class="option " onClick={() => this.handleSelect(option)}>
                <label class="multi-check-select">
                  <input class="multi-check-input" type="checkbox" checked={this.values.includes(option.value)} onChange={() => {}} />
                  {option.label}
                  <span class="checkmark"></span>
                </label>
              </li>
            ))}
          </ul>
        )}
        {this.error ? <p class="il-error">{this.error}</p> : null}
      </div>
    );
  }
}
