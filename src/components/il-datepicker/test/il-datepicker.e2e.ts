import { newE2EPage } from '@stencil/core/testing';

describe('il-datepicker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<il-datepicker></il-datepicker>');

    const element = await page.find('il-datepicker');
    expect(element).toHaveClass('hydrated');
  });
});
