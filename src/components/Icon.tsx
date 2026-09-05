import './Icon.css';

type IconProps = {
  markup: string;
  size?: number;
  className?: string;
};

/**
 * Inlines an exported SVG so its colours can follow `currentColor` instead of
 * the fills baked in at export time.
 */
export function Icon({ markup, size = 18, className }: IconProps) {
  return (
    <span
      className={className ? `icon ${className}` : 'icon'}
      style={{ width: size, height: size }}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
