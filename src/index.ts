import { TextInputEventType } from './lib/events.js';
import { TextInput } from './lib/text-input.js';

declare global {
  interface HTMLElementTagNameMap {
    'azl-text-input': TextInput;
  }
}

export { TextInput, TextInputEventType };
