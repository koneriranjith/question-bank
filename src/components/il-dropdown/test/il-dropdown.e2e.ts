import { newE2EPage } from '@stencil/core/testing';

describe('il-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<il-dropdown></il-dropdown>');

    const element = await page.find('il-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
