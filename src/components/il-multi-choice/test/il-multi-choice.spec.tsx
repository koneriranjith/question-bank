import { newSpecPage } from '@stencil/core/testing';
import { IlMultiChoice } from '../il-multi-choice';

describe('il-multi-choice', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IlMultiChoice],
      html: `<il-multi-choice></il-multi-choice>`,
    });
    expect(page.root).toEqualHtml(`
      <il-multi-choice>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </il-multi-choice>
    `);
  });
});
