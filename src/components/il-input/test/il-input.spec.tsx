import { newSpecPage } from '@stencil/core/testing';
import { IlInput } from '../il-input';

describe('il-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IlInput],
      html: `<il-input></il-input>`,
    });
    expect(page.root).toEqualHtml(`
      <il-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </il-input>
    `);
  });
});
