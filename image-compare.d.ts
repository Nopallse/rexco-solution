// Allow the image-compare custom element in TSX
declare namespace JSX {
  interface IntrinsicElements {
    'image-compare': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'label-text'?: string;
      class?: string;
      style?: React.CSSProperties | string;
    };
  }
}

// Allow importing the web component package without type definitions
declare module '@cloudfour/image-compare' {
  const register: unknown;
  export default register;
}
