export default function Button({ children, type = 'button', className = '', disabled, ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}