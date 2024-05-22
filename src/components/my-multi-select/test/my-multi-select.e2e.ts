import { newE2EPage } from '@stencil/core/testing';

describe('my-multi-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-multi-select></my-multi-select>');

    const element = await page.find('my-multi-select');
    expect(element).toHaveClass('hydrated');
  });
});
