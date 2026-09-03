export function Divider({ children }: { children?: React.ReactNode }) {
  if (!children) {
    return <hr className="w-full border-t border-gray-700 my-5" />;
  }

  return (
    <div className="relative my-5 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-gray-700/60" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-brand-card px-2 text-gray-300 font-normal">
          {children}
        </span>
      </div>
    </div>
  );
}

