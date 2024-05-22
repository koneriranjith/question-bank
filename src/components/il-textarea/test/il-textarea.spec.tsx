import { newSpecPage } from '@stencil/core/testing';
import { IlTextarea } from '../il-textarea';

describe('il-textarea', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IlTextarea],
      html: `<il-textarea></il-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <il-textarea>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </il-textarea>
    `);
  });
});
