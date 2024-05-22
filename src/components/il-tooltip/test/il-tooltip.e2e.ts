import { newE2EPage } from '@stencil/core/testing';

describe('il-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<il-tooltip></il-tooltip>');

    const element = await page.find('il-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
