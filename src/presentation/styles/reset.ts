// src/presentation/styles/reset.ts
import { css } from '@emotion/react';

export const resetStyles = css`
  /* Box sizing */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Reset margins and paddings */
  * {
    margin: 0;
    padding: 0;
  }

  /* Reset list styles */
  ul,
  ol {
    list-style: none;
  }

  /* Reset anchor styles */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Reset button styles */
  button {
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
    color: inherit;
  }

  /* Reset input styles */
  input,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  /* Reset table styles */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Reset image styles */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  /* Remove built-in form typography styles */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Avoid text overflows */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }
`;