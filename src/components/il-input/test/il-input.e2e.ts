import { newE2EPage } from '@stencil/core/testing';

describe('il-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<il-input></il-input>');

    const element = await page.find('il-input');
    expect(element).toHaveClass('hydrated');
  });
});
