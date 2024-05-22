import { Component, h, Prop, Event, State, EventEmitter } from '@stencil/core';
import { format } from 'date-fns';

@Component({
  tag: 'il-datepicker',
  styleUrl: 'il-datepicker.scss',
})
export class IlDatepicker {
  @Prop({ reflect: true, mutable: true }) label: string;
  @Prop({ reflect: true, mutable: true }) value: string;
  @Prop() mask;
  @Prop() tooltip: String;
  @Prop() error: string | undefined;
  @Prop() required: boolean;
  @Prop() readOnly: boolean;
  @Prop() dateFormat: String;
  @Prop() placeholder: string;
  @Event() valueChanged: EventEmitter<string>;
  // @Event() valueBlur: EventEmitter<string>;
  @State() showPassword: boolean = false;


  isValid(dateString: string): boolean {
    const date = new Date(dateString);
    // Check if the date object is valid by comparing it to NaN
    return !isNaN(date.getTime()) && date.getFullYear() >= 1900 && date.getFullYear() <= 2100;
  }

  private onInputChangeValue(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this.isValid(inputElement.value)) {
      this.error = "";
      this.valueChanged.emit(format(new Date(inputElement.value), this.dateFormat.replace("DD","dd").replace("YYYY", "yyyy")));
    }
    else {
      this.error = "Invalid Date"
    }

  }

  private onInputFieldChangeValue(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value.replace(/\D/g, ''); // Remove non-digit characters

    if (inputValue.length > 8) {
      inputValue = inputValue.slice(0, 8);
    }
   

    // Format the date with slashes
    let formattedDate = '';
    let j=0;
    for (let i = 0; i < inputValue.length; i++) {
      if (!(/^[a-zA-Z0-9]+$/.test(this.dateFormat[j]))) {
        formattedDate += this.dateFormat[j];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        j++;
      }
      formattedDate += inputValue[i];
      j++;
    }
    inputElement.value = formattedDate;
    if (inputElement.value.length == 10 && this.isValid(inputElement.value)) {
      this.valueChanged.emit(format(new Date(inputElement.value), this.dateFormat.replace("DD","dd").replace("YYYY", "yyyy")));
      this.error = "";
    }
    else {
      this.error = "Invalid Date"
    }
  }

  /*  private onInputBlurValue(event: Event) {
     const inputElement = event.target as HTMLInputElement;
     this.valueBlur.emit(inputElement.value);
   } */

  render() {
    return (
      <div class="il-input">
        <p>
          <span class="label">
            {this.label}
            {this.required ? <span class="il-required">*</span> : null}
          </span>
          {this.tooltip ? <il-tooltip tooltip={this.tooltip}></il-tooltip> : null}
        </p>
        <div class="input-control date-control">
          <input type="text" class="il-control input-field" value={this.value} placeholder={this.placeholder}  onInput={this.onInputFieldChangeValue.bind(this)}
            {...(this.readOnly && { disabled: true })} />
          <input
            class="il-control date-field"
            type="date"
            value={format(new Date(this.value), "yyyy-MM-dd")}
            placeholder={this.placeholder}
            // onBlur={this.onInputBlurValue.bind(this)}
            onInput={this.onInputChangeValue.bind(this)}
            {...(this.readOnly && { disabled: true })}
          />
        </div>
        {this.error ? <p class="il-error">{this.error}</p> : null}
      </div>
    );
  }
}
