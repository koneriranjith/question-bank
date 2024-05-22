import { newE2EPage } from '@stencil/core/testing';

describe('il-radio-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<il-radio-button></il-radio-button>');

    const element = await page.find('il-radio-button');
    expect(element).toHaveClass('hydrated');
  });
});
