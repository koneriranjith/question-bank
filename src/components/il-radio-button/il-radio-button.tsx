import { Component, h, Event, EventEmitter, Prop } from '@stencil/core';

interface Option {
  label: string;
  value: string;
}

@Component({
  tag: 'il-radio-button',
  styleUrl: 'il-radio-button.scss',
})
export class IlRadioButton {
  @Prop() options: InstanceType<typeof Option>[] = [];
  @Prop() selectedValue: any;
  @Prop() label: string;
  @Prop() readOnly: boolean;
  @Prop() isDefault: Object;
  @Prop() error: string | undefined;
  @Prop() required: Boolean;
  @Prop() tooltip: String;

  @Event() valueChanged: EventEmitter<string>; // Event emitted when selection changes


  async componentDidLoad () {
    if(this.isDefault && !this.selectedValue) {
      this.handleOptionClick({ label: this.isDefault?.["answerLabel"], value: this.isDefault?.["answerId"] })
    }
  };
  // private selectedOption: string;

  // componentWillLoad() {
  //   this.selectedOption = this.selectedValue;
  // }
  handleOptionClick(option: Option) {
    const value = option.value;
    // this.selectedOption = value;
    this.valueChanged.emit(value);
  }

  render() {
    return (
      <div class="il-radio-button">
        <p>
          <span class="label">
            {this.label}
            {this.required ? <span class="il-required">*</span> : null}
          </span>
          {this.tooltip ? <il-tooltip tooltip={this.tooltip}></il-tooltip> : null}
        </p>
        {this.options.map(option => (
          <label class={`il-radio-check ${this.readOnly ? "disabled" : ""}`}>
            <input class="form-check-input" type="radio" disabled={this.readOnly} value={option.value} checked={this.selectedValue == option.value} onClick={() => this.handleOptionClick(option)} />
            {option.label}
            <span class="checkmark"></span>
          </label>
        ))}
        {this.error ? <p class="il-error">{this.error}</p> : null}
      </div>
    );
  }
}
