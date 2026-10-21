import { Link } from 'react-router-dom';

// Cross-page links use client navigation; same-page anchors keep native scrolling.
export function AppLink({ to, children, ...props }) {
  return to.startsWith('#') ? <a href={to} {...props}>{children}</a> : <Link to={to} {...props}>{children}</Link>;
}
