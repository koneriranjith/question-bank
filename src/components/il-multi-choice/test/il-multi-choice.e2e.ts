import { newE2EPage } from '@stencil/core/testing';

describe('il-multi-choice', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<il-multi-choice></il-multi-choice>');

    const element = await page.find('il-multi-choice');
    expect(element).toHaveClass('hydrated');
  });
});
