import { TextInputEventType } from './lib/events.js';
import { TextInput } from './lib/TextInput.js';

declare global {
  interface HTMLElementTagNameMap {
    'azl-text-input': TextInput;
  }
}

export { TextInput, TextInputEventType };
