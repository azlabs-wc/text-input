export interface TextInputEventType<T extends number | string>
  extends CustomEvent<T> {
  data: T;
}

// #region List of w3c common events
/**
 * Internal event type tracks
 * 
 * @internal
 */
export type EventType =
  | 'blur'
  | 'change'
  | 'contextmenu'
  | 'focus'
  | 'input'
  | 'invalid'
  | 'reset'
  | 'search'
  | 'select'
  | 'submit'
  | 'keydown'
  | 'keypress'
  | 'keyup'
  | 'click'
  | 'dblclick'
  | 'mousedown'
  | 'mousemove'
  | 'mouseout'
  | 'mouseover'
  | 'mouseup'
  | 'mousewheel'
  | 'wheel'
  | 'drag'
  | 'dragend'
  | 'dragenter'
  | 'dragleave'
  | 'dragover'
  | 'dragstart'
  | 'drop'
  | 'scroll'
  | 'copy'
  | 'cut'
  | 'paste';

export const FormEvents = [
  'blur',
  'change',
  'contextmenu',
  'focus',
  'input',
  'invalid',
  'reset',
  'search',
  'select',
  'submit',
];
export const KeyboardEvents = ['keydown', 'keypress', 'keyup'];

export const MouseEvents = [
  'click',
  'dblclick',
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'mousewheel',
  'wheel',
];
export const DragEvents = [
  'drag',
  'dragend',
  'dragenter',
  'dragleave',
  'dragover',
  'dragstart',
  'drop',
  'scroll',
];
export const ClipboardEvents = ['copy', 'cut', 'paste'];

export const W3cEvents = [
  ...FormEvents,
  ...KeyboardEvents,
  ...MouseEvents,
  ...DragEvents,
  ...ClipboardEvents,
];
// #endregion List of w3c common events

/**
 * Dispatches custom Emacscript event
 *
 * @internal
 */
export class TextInputEvent
  extends CustomEvent<string>
  implements TextInputEventType<string>
{
  get value() {
    return this.detail;
  }

  get data() {
    return this.detail;
  }

  /**
   * Creates an instance of {@see InputChangeEvent} class
   */
  constructor(type: EventType, value?: string) {
    super(type, {
      detail: value,
      bubbles: true,
      composed: true,
    });
  }
}
