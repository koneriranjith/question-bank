import { newSpecPage } from '@stencil/core/testing';
import { IlNotes } from '../il-notes';

describe('il-notes', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IlNotes],
      html: `<il-notes></il-notes>`,
    });
    expect(page.root).toEqualHtml(`
      <il-notes>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </il-notes>
    `);
  });
});
