// DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
declare namespace React {
  interface HTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string;
  }
  interface RefAttributes<T> extends RefAttributes<T> {
    type?: string;
  }
  interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
    is_toggleable?: string;
  }
}

declare module 'react-mathjax' {
  const a: any;
  export default a;
}

declare module '@lottiefiles/react-lottie-player' {
  export const Controls: any;
  export const Player = any;
  export default a;
}
