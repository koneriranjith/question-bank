import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'il-notes',
  styleUrl: 'il-notes.scss',
})
export class IlNotes {
  @Prop() selectedValue: any;
  @Prop() notes: string;
  @Prop() isShowCheckbox: Boolean;
  @Prop() checkboxText: string;
  @Prop() readOnly: boolean;
  @Prop() label: string;
  @Prop() required: Boolean;
  @Prop() error: string | undefined;
  @Prop() tooltip: String;

  @Event() valueChanged: EventEmitter<Boolean>; // Event emitted when selection changes
  handleOptionClick() {
    this.valueChanged.emit(!this.selectedValue);
  }
  render() {
    return (
      <div class="il-notes">
        <p>
          <span class="label">
            {this.label}
            {this.required ? <span class="il-required">*</span> : null}
          </span>
          {this.tooltip ? <il-tooltip tooltip={this.tooltip}></il-tooltip> : null}
        </p>
        {this.notes ? <p class="notes" innerHTML={this.notes}></p> : null}
        {this.isShowCheckbox ? (
          <label class={`multi-check ${this.readOnly ? "disabled" : ""}`}>
            <input class="form-check-input" type="checkbox" disabled={this.readOnly} checked={this.selectedValue || false} onChange={() => this.handleOptionClick()} />
            {this.checkboxText}
            <span class="checkmark"></span>
          </label>
        ) : null}

        {this.error ? <p class="il-error">{this.error}</p> : null}
      </div>
    );
  }
}
