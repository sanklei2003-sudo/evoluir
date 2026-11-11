export default function Card({ children, className = "", as: As = "div", ...rest }) {
  return (
    <As className={`card p-5 ${className}`} {...rest}>
      {children}
    </As>
  );
}
