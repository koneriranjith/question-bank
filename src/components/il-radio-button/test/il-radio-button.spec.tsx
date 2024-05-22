import { newSpecPage } from '@stencil/core/testing';
import { IlRadioButton } from '../il-radio-button';

describe('il-radio-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IlRadioButton],
      html: `<il-radio-button></il-radio-button>`,
    });
    expect(page.root).toEqualHtml(`
      <il-radio-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </il-radio-button>
    `);
  });
});
