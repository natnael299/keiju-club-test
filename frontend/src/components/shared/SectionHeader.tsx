type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionClick?: () => void;
};

export default function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onActionClick,
}: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-extrabold tracking-tight text-foreground">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm font-normal text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      {actionLabel && (
        <button
          type="button"
          onClick={onActionClick}
          className="shrink-0 text-sm font-semibold text-primary"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
