import { Component, Prop, h, Event, EventEmitter, State } from '@stencil/core';
import { getSVG } from '../../utils/utils';
import IMask from 'imask';

@Component({
  tag: 'il-input',
  styleUrl: 'il-input.scss',
  assetsDirs: ['assets'],
})
export class IlInput {
  @Prop({ reflect: true, mutable: true }) label: string;
  @Prop({ reflect: true, mutable: true }) value: string;
  @Prop() type = 'text';
  @Prop() mask;
  @Prop() questionType: String;
  @Prop() tooltip: String;
  @Prop() error: string | undefined;
  @Prop() required: boolean;
  @Prop() readOnly: boolean;
  @Prop() placeholder: string;
  @Event() valueChanged: EventEmitter<string>;
  @Event() valueBlur: EventEmitter<string>;
  @State() showPassword: boolean = false;

  private setShowPassword() {
    this.showPassword = !this.showPassword;
  }

  private onInputChangeValue(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this.questionType === 'number') {
      if (this.mask) {
        const mask = this.mask.replaceAll('#', '0');
        const masked = IMask.createMask({
          mask: mask,
        });
        masked.resolve(inputElement.value);
        inputElement.value = masked.value;
        this.valueChanged.emit(masked.value);
      } else {
        const masked = IMask.createMask({
          mask: Number,
        });
        masked.resolve(inputElement.value);
        inputElement.value = masked.value;
        this.valueChanged.emit(masked.value);
      }
    } else if (this.questionType === 'shorttext' && this.mask) {
      const mask = this.mask.replaceAll('#', '*');
      const masked = IMask.createMask({
        mask: mask,
      });
      masked.resolve(inputElement.value);
      inputElement.value = masked.value;

      this.valueChanged.emit(masked.value);
    } else if (this.questionType === 'phonenumber' && this.mask) {
      const mask = this.mask.replaceAll('#', '*');
      const masked = IMask.createMask({
        mask: mask,
      });
      masked.resolve(inputElement.value);
      inputElement.value = masked.value;
      this.valueChanged.emit(masked.value);
    }
    else if (this.questionType === 'password' && this.mask) {
      const mask = this.mask.replaceAll('#', '*');
      const masked = IMask.createMask({
        mask: mask,
      });
      masked.resolve(inputElement.value);
      inputElement.value = masked.value;
      this.valueChanged.emit(masked.value);
    } else {
      this.valueChanged.emit(inputElement.value);
    }
  }

  private onInputBlurValue(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.value && this.questionType === 'Date') {
      inputElement.type = 'text';
    }

    // const value = (event.target as HTMLInputElement).value;
    this.valueBlur.emit(inputElement.value);
  }

  onDateFocusValue() {
    this.type = 'date';
  }

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
        <div class="input-control">
          <input
            class={`il-control`}
            type={this.showPassword ? 'text' : this.type}
            value={this.value}
            placeholder={this.placeholder}
            onBlur={this.onInputBlurValue.bind(this)}
            onInput={this.onInputChangeValue.bind(this)}
            {...(this.readOnly && { disabled: true })}
          />
          {this.type === 'password' ? (
            <span class="icon" onClick={() => this.setShowPassword()} innerHTML={this.showPassword ? getSVG('visibility') : getSVG('visibility_off')}></span>
          ) : null}
        </div>
        {this.error ? <p class="il-error">{this.error}</p> : null}
      </div>
    );
  }
}
