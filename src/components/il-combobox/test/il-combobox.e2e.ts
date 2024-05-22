import { newE2EPage } from '@stencil/core/testing';

describe('il-combobox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<il-combobox></il-combobox>');

    const element = await page.find('il-combobox');
    expect(element).toHaveClass('hydrated');
  });
});
