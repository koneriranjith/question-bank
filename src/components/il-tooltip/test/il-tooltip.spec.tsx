import { newSpecPage } from '@stencil/core/testing';
import { IlTooltip } from '../il-tooltip';

describe('il-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IlTooltip],
      html: `<il-tooltip></il-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <il-tooltip>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </il-tooltip>
    `);
  });
});
