import { newE2EPage } from '@stencil/core/testing';

describe('il-notes', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<il-notes></il-notes>');

    const element = await page.find('il-notes');
    expect(element).toHaveClass('hydrated');
  });
});
