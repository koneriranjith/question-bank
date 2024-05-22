import { newSpecPage } from '@stencil/core/testing';
import { QuestionBank } from '../question-bank';

describe('question-bank', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [QuestionBank],
      html: `<question-bank></question-bank>`,
    });
    expect(page.root).toEqualHtml(`
      <question-bank>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </question-bank>
    `);
  });
});
