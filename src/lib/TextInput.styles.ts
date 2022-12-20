import { css, unsafeCSS } from 'lit';

export const styles = css`
  .text-input {
    position: relative;
    padding: var(--text-input-padding-top, 1.2rem) 0 0 !important;
    margin: var(--text-input-margin-top, 0.7rem) 0rem !important;
    width: var(--text-input-width, 100%);
  }

  .text-input.basic {
    padding: var(--text-input-no-label-padding-top, 0) !important;
    margin: var(--text-input-no-label-padding-top, 0) !important;
  }

  input,
  ::slotted(label) {
    touch-action: manipulation;
  }

  .text-input ::slotted(label) {
    font-size: var(--text-input-label-font-size, 0.8rem);
    font-weight: var(--text-input-label-font-weight, 500);
    top: var(--text-input-label-top, 3px);
    position: absolute;
    display: block;
    transition: all 200ms ease-in-out;
  }

  input {
    position: relative;
    width: auto;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    margin: 0;
    border-radius: var(--text-input-border-radius, 0);
    border-top: var(--text-input-border-top-width, 0) solid
      var(--text-input-border-top-color, transparent);
    border-left: var(--text-input-border-left-width, 0) solid
      var(--text-input-border-top-color, transparent);
    border-right: var(--text-input-border-right-width, 0) solid
      var(--text-input-border-top-color, transparent);
    border-bottom: var(--text-input-border-bottom-width, 0.05rem) solid
      var(--text-input-border-color, hsl(198deg, 10%, 46%));
    height: var(--text-input-height, 1rem);
    color: var(--text-input-color, hsl(198deg, 0%, 0%));
    box-shadow: none;
    display: inline-block;
    padding: var(--text-input-border-radius, 0 0.3rem);
    max-height: var(--text-input-max-height, 1.2rem);
    font-size: var(--text-input-max-height, 0.8rem);
    background: transparent;
    transition: border-color 200ms ease-in-out;
    outline: 0;
  }

  input:focus {
    padding-bottom: var(--text-input-padding-bottom, 6px);
    border-bottom-width: var(--text-input-bottom-width, 2.5px);
    border-image: linear-gradient(
      to right,
      ${unsafeCSS(`var(--text-input-color, hsl(198deg, 100%, 32%)) 95%`)},
      ${unsafeCSS(`var(--text-input-color, hsl(198deg, 100%, 32%)) 95%`)}
    );
    border-image-slice: 1;
    font-size: var(--text-input-font-size, 1rem);
    font-weight: var(--text-input-font-weight, 400);
  }
  input:required,
  input:invalid {
    box-shadow: none;
  }

  input::placeholder {
    color: transparent;
  }

  input:not([readonly]) {
    background: linear-gradient(
        to bottom,
        var(--text-input-color, hsl(198deg, 100%, 32%)) 95%,
        var(--text-input-color, hsl(198deg, 100%, 32%)) 95%
      )
      no-repeat;
    background-size: 0% 100%;
    transition: background-size 200ms ease-in-out;
  }

  input::-webkit-input-placeholder {
    /* Edge */
    color: var(--text-input-color, #949494);
    font-family: var(--text-input-font-family, inherit);
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: var(--text-input-color, #949494);
    font-family: var(--text-input-font-family, inherit);
  }

  input::placeholder {
    color: var(--text-input-color, #949494);
    font-family: var(--text-input-font-family, inherit);
  }
`;
