import { LitElement, PropertyValueMap, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { query } from 'lit/decorators/query.js';
import { EventType, TextInputEvent, W3cEvents } from './events.js';
import { styles as componentStyles } from './styles.js';

/**
 * @event TextInputEvent
 */
export class TextInput extends LitElement {
  // #region Component reactive properties
  @query('#text-input')
  private el!: HTMLInputElement;

  public get element() {
    return this.el;
  }

  /** Specifies whether autocomplete is applied to an editable text field. */
  /**
   * @attr auto-complete
   */
  @property({ type: String, attribute: 'auto-complete' })
  autocomplete!: string;

  /** Defines the maximum acceptable value for an input element with type="number".When used with the min and step attributes, lets you control the range and increment (such as only even numbers) that the user can enter into an input field. */
  /**
   * @attr max
   */
  @property({ type: Number, attribute: 'max' })
  max!: number;

  /** Defines the minimum acceptable value for an input element with type="number". When used with the max and step attributes, lets you control the range and increment (such as even numbers only) that the user can enter into an input field. */
  /**
   * @attr min
   */
  @property({ type: Number, attribute: 'min' })
  min!: number;

  /** Sets or retrieves the name of the object. */
  /**
   * @attr name
   */
  @property({ type: String, attribute: 'name' })
  name!: string;

  /** Gets or sets a string containing a regular expression that the user's input must match. */
  /**
   * @attr pattern
   */
  @property({ type: String, attribute: 'pattern' })
  pattern!: string;

  /** Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field. */
  /**
   * @attr placeholder
   */
  @property({ type: String, attribute: 'placeholder' })
  placeholder!: string;

  /**
   * @attr read-only
   */
  @property({ type: Boolean, attribute: 'read-only' })
  readOnly: boolean = false;

  /** When present, marks an element that can't be submitted without a value. */
  /**
   * @attr required
   */
  @property({ type: Boolean, attribute: 'required' })
  required: boolean = false;

  /** Returns the content type of the object. */
  /**
   * @attr type
   */
  @property({ type: String, attribute: 'type' })
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'search'
    | 'tel'
    | 'url'
    | 'number'
    | 'date' = 'text';

  /** Returns the value of the data at the cursor's current position. */
  /**
   * @attr value
   */
  @property({ type: String, attribute: 'value' })
  value!: string;

  /**
   * Hold the value of the last changed state of the input
   */
  private _value!: string;

  @property({ type: Boolean, attribute: 'lazy' })
  lazy!: boolean;

  @property({ type: Number, attribute: 'label-flow-offset' })
  labelFlowOffset: number = 16;

  // #endregion Component reactive properties

  static override get styles() {
    return [componentStyles];
  }

  @queryAssignedElements({ selector: 'label' })
  private _labelNodes!: Array<HTMLElement>;

  private labelComputedStyles!: {
    color: string;
    top: string;
  };

  protected override firstUpdated(
    _: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ) {
    super.firstUpdated(_);
    if (typeof this.el === 'undefined' || this.el === null) {
      throw new Error(
        `azl-text-input requires an <input> element as child component`
      );
    }
    // For loop through basic w3c event except the input and change event
    for (const event of W3cEvents.filter(
      e => ['change', 'input', 'focus', 'blur'].indexOf(e) === -1
    )) {
      this.el.addEventListener(event, this.onW3cEvent.bind(this));
    }
    this.el.addEventListener('focus', this.onInputFocus.bind(this));
    this.el.addEventListener('blur', this.onInputBlur.bind(this));
    if (!this.lazy) {
      // We listen for each keystroke on the input element then dispatch changes to
      // `change` event on the component for listeners
      this.el.addEventListener('input', this.onInputChange.bind(this));
    }
    // To control browser always dispatching an undefined when running in
    // non-lazy mode, we always dispatch the changed value to override
    // input produced undefined value
    this.el.addEventListener('change', this.onInputChange.bind(this));
  }

  private onInputChange(e?: Event) {
    const value = this.el.value.trim();
    if (
      typeof this._value === 'undefined' ||
      this._value === null ||
      this._value !== value
    ) {
      this.dispatchEvent(new TextInputEvent('change', value));
    }
    this._value = value;
    e?.stopPropagation();
  }

  private onInputFocus(e: Event) {
    const label = this._labelNodes[0];
    if (typeof label === 'undefined' || label === null) {
      return;
    }
    if (
      typeof this.labelComputedStyles === 'undefined' ||
      this.labelComputedStyles === null
    ) {
      const styles = getComputedStyle(label);
      const topPosition = Number(styles.top.replace(/px|em|rem|%/, ''));
      this.labelComputedStyles = {
        top: `${topPosition}`,
        color: styles.color,
      };
    }
    const { top, color } = this.labelComputedStyles;
    label.style.setProperty('top', `${+top - this.labelFlowOffset}px`);
    label.style.setProperty('color', color);
    e?.stopPropagation();
    this.dispatchEvent(new TextInputEvent('focus'));
  }

  private onInputBlur(e: Event) {
    const label = this._labelNodes[0];
    if (label) {
      const { top, color } = this.labelComputedStyles;
      if (
        typeof this._value === 'undefined' ||
        this._value === null ||
        this._value === ''
      ) {
        label.style.setProperty('top', `${top}px`);
      }
      label.style.setProperty('color', color);
    }
    e?.stopPropagation();
    this.dispatchEvent(new TextInputEvent('blur'));
  }

  private static isTextInputType(type: string) {
    return (
      ['text', 'email', 'password', 'search', 'tel', 'url'].indexOf(type) !== -1
    );
  }

  private onW3cEvent(e: Event) {
    this.dispatchEvent(new TextInputEvent(e.type as EventType));
    e?.stopPropagation();
  }

  override render() {
    const {
      type,
      autocomplete,
      min,
      max,
      required,
      readOnly,
      value,
      pattern,
      name,
      placeholder,
    } = this;

    return html`
      <div class="text-input">
        <slot></slot>
        <input
          id="text-input"
          .autocomplete=${autocomplete ?? ''}
          .type=${type}
          .value=${value ?? ''}
          .pattern=${pattern ?? ''}
          ?readonly=${!!readOnly}
          ?required=${!!required}
          name=${name}
          maxlength=${TextInput.isTextInputType(type) ? max : ''}
          minlength=${TextInput.isTextInputType(type) ? min : ''}
          max=${!TextInput.isTextInputType(type) ? max : ''}
          min=${!TextInput.isTextInputType(type) ? min : ''}
          placeholder=${placeholder ?? ''}
        />
      </div>
    `;
  }
}
