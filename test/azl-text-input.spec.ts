import {
  elementUpdated,
  expect,
  fixture,
  fixtureCleanup,
} from '@open-wc/testing';
import { html } from 'lit';
import '../src/azl-text-input.js';
import { TextInput, TextInputEventType } from '../src/index.js';

describe('AzlInput', () => {
  beforeEach(() => {});
  it('test if input element in DOM when component connect to the DOM', async () => {
    const el = await fixture<TextInput>(
      html` <azl-text-input></azl-text-input> `
    );
    expect(el.element).to.be.instanceOf(HTMLInputElement);
  });

  it('test that the default property of the input elements are set, though component attrbutes', async () => {
    const el = await fixture<TextInput>(
      html`
        <azl-text-input
          value="Sidoine"
          type="text"
          max="50"
          min="1"
          name="name"
          pattern="[w]"
          required
        ></azl-text-input>
      `
    );
    expect(el.element.type).to.be.equal('text');
    expect(el.element.maxLength).to.be.equal(50);
    expect(el.element.minLength).to.be.equal(1);
    expect(el.element.required).to.be.true;
    expect(el.element.pattern).to.be.equal('[w]');
  });

  it('test HTML input min and max properties are -1 when type is text, email, or password', async () => {
    const el = await fixture<TextInput>(
      html`
        <azl-text-input
          value="Sidoine"
          type="text"
          max="20"
          min="2"
          required
        ></azl-text-input>
      `
    );
    expect(el.element.max).to.be.equal('');
    expect(el.element.min).to.be.equal('');
    el.type = 'number';
    await elementUpdated(el);
    expect(parseInt(el.element.max, 10)).to.be.equal(20);
    expect(parseInt(el.element.min, 10)).to.be.equal(2);
    el.type = 'email';
    await elementUpdated(el);
    expect(el.element.max).to.be.equal('');
    expect(el.element.min).to.be.equal('');
    el.type = 'number';
    await elementUpdated(el);
    expect(parseInt(el.element.max, 10)).to.be.equal(20);
    expect(parseInt(el.element.min, 10)).to.be.equal(2);
    el.type = 'password';
    await elementUpdated(el);
    expect(el.element.max).to.be.equal('');
    expect(el.element.min).to.be.equal('');
  });

  it('test component dispatches change event whenevener internal input changes', async () => {
    const el = await fixture<TextInput>(
      html` <azl-text-input name="name"></azl-text-input> `
    );
    let called = 0;
    let calledWith!: string;
    const changeEventListener = (e: Event) => {
      called += 1;
      calledWith = (e as TextInputEventType<string>).data;
    };
    el.addEventListener('change', changeEventListener);
    el.element.value = 'Sidoine';
    // Trigger the change event on the input element
    el.element.dispatchEvent(new Event('change'));
    expect(called).to.be.equal(1);
    expect(calledWith).to.be.equal('Sidoine');
    el.removeEventListener('change', changeEventListener);
  });

  it('test that internal input events propagates to the text-input component', async () => {
    const el = await fixture<TextInput>(
      html` <azl-text-input name="name"></azl-text-input> `
    );
    let called = 0;
    let clicked = 0;
    const blurEventListener = () => {
      called += 1;
    };
    const clickEventListener = () => {
      clicked += 1;
    };
    el.addEventListener('blur', blurEventListener);
    el.addEventListener('click', clickEventListener);
    // Trigger the change event on the input element
    el.element.dispatchEvent(new Event('blur'));
    el.element.dispatchEvent(new Event('click'));
    el.element.dispatchEvent(new Event('click'));
    expect(called).to.be.equal(1);
    expect(clicked).to.be.equal(2);
    el.removeEventListener('change', blurEventListener);
    el.removeEventListener('click', clickEventListener);
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
