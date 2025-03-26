import { createPortal } from 'react-dom';

export default function TooltipPortal({ children }) {
  const el = document.getElementById('tooltip-root');
  return el ? createPortal(children, el) : null;
}
