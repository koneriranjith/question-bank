import { newSpecPage } from '@stencil/core/testing';
import { IlFileLoader } from '../il-file-loader';

describe('il-file-loader', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IlFileLoader],
      html: `<il-file-loader></il-file-loader>`,
    });
    expect(page.root).toEqualHtml(`
      <il-file-loader>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </il-file-loader>
    `);
  });
});
