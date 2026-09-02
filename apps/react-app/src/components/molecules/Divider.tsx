export function Divider({ children }: { children?: React.ReactNode }) {
  if (!children) {
    return <hr className="w-full border-t border-[var(--border)] my-6" />;
  }

  return (
    <div className="relative my-6 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-[var(--border)]" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-[var(--bg)] px-2 text-[var(--text)]">
          {children}
        </span>
      </div>
    </div>
  );
}
