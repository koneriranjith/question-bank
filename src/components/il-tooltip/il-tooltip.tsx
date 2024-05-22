import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'il-tooltip',
  styleUrl: 'il-tooltip.scss',
})
export class IlTooltip {
  @Prop() tooltip: String;

  render() {
    return (
      <span class="il-tooltip-info">
        ⓘ
        <span class="tooltip-text">
          <span class="icon">◄</span>
          {this.tooltip}
        </span>
      </span>
    );
  }
}
