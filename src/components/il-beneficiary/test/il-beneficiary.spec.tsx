import { newSpecPage } from '@stencil/core/testing';
import { IlBeneficiary } from '../il-beneficiary';

describe('il-beneficiary', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IlBeneficiary],
      html: `<il-beneficiary></il-beneficiary>`,
    });
    expect(page.root).toEqualHtml(`
      <il-beneficiary>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </il-beneficiary>
    `);
  });
});
