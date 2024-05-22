import { newSpecPage } from '@stencil/core/testing';
import { IlCombobox } from '../il-combobox';

describe('il-combobox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IlCombobox],
      html: `<il-combobox></il-combobox>`,
    });
    expect(page.root).toEqualHtml(`
      <il-combobox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </il-combobox>
    `);
  });
});
