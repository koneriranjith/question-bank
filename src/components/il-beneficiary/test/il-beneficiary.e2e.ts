import { newE2EPage } from '@stencil/core/testing';

describe('il-beneficiary', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<il-beneficiary></il-beneficiary>');

    const element = await page.find('il-beneficiary');
    expect(element).toHaveClass('hydrated');
  });
});
