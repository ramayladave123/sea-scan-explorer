import { useMemo } from "react";

interface BubblesProps {
  count?: number;
  className?: string;
}

export const Bubbles = ({ count = 18, className = "" }: BubblesProps) => {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: Math.random() * 40 + 8,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: Math.random() * 12 + 10,
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubble animate-float-up"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            bottom: `-${b.size}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
