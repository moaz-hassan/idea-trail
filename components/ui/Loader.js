export default function Loader({ size = 20, className = "" }) {
  return (
    <span
      className={`block border-2 border-blue-500 border-t-transparent rounded-full animate-spin align-middle mx-auto ${className}`}
      style={{ width: size, height: size }}
      aria-label="Loading"
    />
  );
}
