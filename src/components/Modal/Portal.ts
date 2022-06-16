import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export const Portal = ({ children }: { children: ReactNode }) => {
  const el: HTMLElement = document.getElementById('modal')!;
  return ReactDOM.createPortal(children, el);
};
