import { newE2EPage } from '@stencil/core/testing';

describe('il-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<il-textarea></il-textarea>');

    const element = await page.find('il-textarea');
    expect(element).toHaveClass('hydrated');
  });
});
