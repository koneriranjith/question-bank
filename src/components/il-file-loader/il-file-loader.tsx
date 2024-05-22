import { Component, State, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'il-file-loader',
  styleUrl: 'il-file-loader.scss',
})
export class IlFileLoader {
  @Prop() fileResponseList: any;
  @Prop() label: string;
  @Prop() required: Boolean;
  @Prop() readOnly: boolean;
  @Prop() error: string | undefined;
  @Prop() tooltip: String;
  @Prop() isShowCheckbox: Boolean;
  @Prop() checkboxText: string;
  @Prop() selectedValue: any;

  @State() selectedIndex: number = 0;

  handleSubmit(action) {
    if (action === 'previous') {
      this.selectedIndex = this.selectedIndex > 0 ? --this.selectedIndex : this.selectedIndex;
    } else if (action === 'next') {
      this.selectedIndex = this.selectedIndex == this.fileResponseList.length - 1 ? this.selectedIndex : ++this.selectedIndex;
    }
  }

  @Event() valueChanged: EventEmitter<Boolean>; // Event emitted when selection changes
  handleOptionClick() {
    this.valueChanged.emit(!this.selectedValue);
  }

  render() {
    return (
      <div class="il-file-loader">
        <p>
          <span class="label">
            {this.label}
            {this.required ? <span class="il-required">*</span> : null}
          </span>
          {this.tooltip ? <il-tooltip tooltip={this.tooltip}></il-tooltip> : null}
        </p>
        <embed class="file-loader" src={this.fileResponseList[this.selectedIndex].fileUrl} />
        <div class="il-button-wrapper">
          <button class="il-btn-primary" disabled={this.selectedIndex == 0} onClick={() => this.handleSubmit('previous')}>
            ←
          </button>
          <span>
            {this.selectedIndex + 1}/{this.fileResponseList.length}
          </span>
          <button class="il-btn-primary" disabled={this.selectedIndex == this.fileResponseList.length - 1} onClick={() => this.handleSubmit('next')}>
            →
          </button>
        </div>
        {this.isShowCheckbox ? (
          <label class={`multi-check ${this.readOnly ? "disabled" : ""}`}>
            <input class="form-check-input" type="checkbox" disabled={this.readOnly} checked={this.selectedValue || false} onChange={() => this.handleOptionClick()} />
            {this.checkboxText}
            <span class="checkmark"></span>
          </label>
        ) : null}
        {/* <iframe
          class="embed-responsive-item"
          src="https://d29x6p11e4scrv.cloudfront.net/applications/guardian_questionbank_documents/admin/752/07_25_2023_out1.pdf"
          width="500"
          height="400"
        ></iframe> */}
        {this.error ? <p class="il-error">{this.error}</p> : null}
      </div>
    );
  }
}
