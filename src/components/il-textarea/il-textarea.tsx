import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'il-textarea',
  styleUrl: 'il-textarea.scss',
})
export class IlTextarea {
  @Prop({ reflect: true, mutable: true }) label: string;
  @Prop({ reflect: true, mutable: true }) value: string;
  @Prop() error: string | undefined;
  @Prop() required: Boolean;
  @Prop() readOnly: boolean;
  @Prop() placeholder: string;
  @Prop() tooltip: String;

  @Event() valueChanged: EventEmitter<string>;
  @Event() valueBlur: EventEmitter<string>;

  private onInputChangeValue(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChanged.emit(this.value);
  }

  private onInputBlurValue(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.valueBlur.emit(this.value);
  }

  render() {
    return (
      <div class="il-textarea">
        <p>
          <span class="label">
            {this.label}
            {this.required ? <span class="il-required">*</span> : null}
          </span>
          {this.tooltip ? <il-tooltip tooltip={this.tooltip}></il-tooltip> : null}
        </p>
        <textarea
          class="il-textarea-control"
          value={this.value || ''}
          placeholder={this.placeholder}
          onBlur={this.onInputBlurValue.bind(this)}
          onInput={this.onInputChangeValue.bind(this)}
          {...this.readOnly && { disabled: true }}
        ></textarea>
        {this.error ? <p class="il-error">{this.error}</p> : null}
      </div>
    );
  }
}
