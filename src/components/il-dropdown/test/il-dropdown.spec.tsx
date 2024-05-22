import { newSpecPage } from '@stencil/core/testing';
import { IlDropdown } from '../il-dropdown';

describe('il-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IlDropdown],
      html: `<il-dropdown></il-dropdown>`,
    });
    expect(page.root).toEqualHtml(`
      <il-dropdown>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </il-dropdown>
    `);
  });
});
