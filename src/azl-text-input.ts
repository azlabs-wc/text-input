import { TextInput } from './lib/TextInput.js';

export function registerElement(name: string, elementClass: any) {
  if (
    typeof window !== 'undefined' &&
    window !== null &&
    typeof window.customElements !== 'undefined' &&
    window.customElements !== null
  ) {
    const customElement = window.customElements.get(name);
    if (typeof customElement === 'undefined' || customElement === null) {
      window.customElements.define(name, elementClass);
    }
  }
}
registerElement('azl-text-input', TextInput);
