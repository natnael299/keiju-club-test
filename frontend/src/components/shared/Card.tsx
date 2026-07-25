type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={[
        "rounded-3xl",
        "bg-white",
        "p-5",
        "shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
