import { newE2EPage } from '@stencil/core/testing';

describe('il-address', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<il-address></il-address>');

    const element = await page.find('il-address');
    expect(element).toHaveClass('hydrated');
  });
});
