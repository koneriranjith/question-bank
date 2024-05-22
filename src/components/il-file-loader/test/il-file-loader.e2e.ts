import { newE2EPage } from '@stencil/core/testing';

describe('il-file-loader', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<il-file-loader></il-file-loader>');

    const element = await page.find('il-file-loader');
    expect(element).toHaveClass('hydrated');
  });
});
