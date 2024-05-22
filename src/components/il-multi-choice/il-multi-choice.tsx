import { Component, h, Event, EventEmitter, Prop } from '@stencil/core';

interface Option {
  label: string;
  value: string;
}

@Component({
  tag: 'il-multi-choice',
  styleUrl: 'il-multi-choice.scss',
})
export class IlMultiChoice {
  @Prop() options: InstanceType<typeof Option>[] = [];
  @Prop() selectedValue: any;
  @Prop() label: string;
  @Prop() required: Boolean;
  @Prop() isDefault: Object;
  @Prop() readOnly: boolean;
  @Prop() error: string | undefined;
  @Prop() tooltip: String;

  @Event() valueChanged: EventEmitter<string[]>; // Event emitted when selection changes

  private selectedOptions: string[] = [];

  async componentDidLoad() {
    if(this.isDefault && !this.selectedValue) {
      this.handleOptionClick({ label: this.isDefault?.["answerLabel"], value: this.isDefault?.["answerId"] })
    }
  };

  componentWillLoad() {
    this.selectedOptions = this.selectedValue.length ? this.selectedValue : [];
  }
  handleOptionClick(option: Option) {
    const value = option.value;
    const index = this.selectedOptions.indexOf(value);
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(value);
    }
    this.valueChanged.emit(this.selectedOptions);
  }

  render() {
    return (
      <div class="il-multi-check">
        <p>
          <span class="label">
            {this.label}
            {this.required ? <span class="il-required">*</span> : null}
          </span>
          {this.tooltip ? <il-tooltip tooltip={this.tooltip}></il-tooltip> : null}
        </p>
        {this.options.map(option => (
          <label class={`multi-check ${this.readOnly ? "disabled" : ""}`} >
            <input class="form-check-input" type="checkbox" disabled={this.readOnly} checked={this.selectedOptions.includes(option.value)} onChange={() => this.handleOptionClick(option)} />
            {option.label}
            <span class="checkmark"></span>
          </label>
        ))}
        {this.error ? <p class="il-error">{this.error}</p> : null}
      </div>
    );
  }
}
