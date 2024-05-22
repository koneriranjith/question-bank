import { newSpecPage } from '@stencil/core/testing';
import { IlAddress } from '../il-address';

describe('il-address', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IlAddress],
      html: `<il-address></il-address>`,
    });
    expect(page.root).toEqualHtml(`
      <il-address>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </il-address>
    `);
  });
});
