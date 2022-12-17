import { TextInput } from './lib/text-input.js';

export function registerElement(name: string, elementClass: any) {
  if (
    typeof window !== 'undefined' &&
    window !== null &&
    typeof window.customElements !== 'undefined' &&
    window.customElements !== null
  ) {
    window.customElements.define(name, elementClass);
  }
}
registerElement('azl-text-input', TextInput);
