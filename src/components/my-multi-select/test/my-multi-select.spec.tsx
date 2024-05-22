import { newSpecPage } from '@stencil/core/testing';
import { MyMultiSelect } from '../my-multi-select';

describe('my-multi-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyMultiSelect],
      html: `<my-multi-select></my-multi-select>`,
    });
    expect(page.root).toEqualHtml(`
      <my-multi-select>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </my-multi-select>
    `);
  });
});
