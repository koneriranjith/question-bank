import { newSpecPage } from '@stencil/core/testing';
import { IlDatepicker } from '../il-datepicker';

describe('il-datepicker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IlDatepicker],
      html: `<il-datepicker></il-datepicker>`,
    });
    expect(page.root).toEqualHtml(`
      <il-datepicker>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </il-datepicker>
    `);
  });
});
