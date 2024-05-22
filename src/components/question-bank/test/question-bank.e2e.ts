import { newE2EPage } from '@stencil/core/testing';

describe('question-bank', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<question-bank></question-bank>');

    const element = await page.find('question-bank');
    expect(element).toHaveClass('hydrated');
  });
});
