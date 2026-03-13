import { LinkProps } from "../../types";
import React from "react";

const LinkComponent: React.FC<LinkProps> = ({
    label,
    to = '#',
    onClick,
    color = 'default',
    size = 'md',
    block = false,
    loading = false,
    disabled = false,
    className = '',
    ariaLabel = '',
    navigate,
    external = false,
    style = {},
    children,
}: LinkProps) => {
  const isDisabled: boolean = disabled || loading;
  const isExternal: boolean = external || /^(https?:|mailto:|tel:|ftp:)/.test(to);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }

    onClick?.(e);

    if (!isExternal && navigate) {
      e.preventDefault();
      navigate();
    }
  };

  const linkClasses = [
    'link',
    `link--${color}`,
    `btn--${size}`,
    block && 'link--block',
    loading && 'link--loading',
    isDisabled && 'link--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      href={isDisabled ? undefined : to}
      onClick={handleClick}
      className={linkClasses}
      style={style}
      aria-label={ariaLabel || (label as string)}
      aria-busy={loading}
      aria-disabled={isDisabled}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}>
      {loading ? (
        <>
						<span className='btn__spinner' aria-hidden='true'>
							<svg viewBox='0 0 20 20'>
								<circle cx='10' cy='10' r='8' />
							</svg>
						</span>
          <span className='btn__loading-text'>Processing...</span>
        </>
      ) : (
        <>
          {children}
          {label && <span className="btn__label">{label}</span>}
        </>
      )}
    </a>
  );
}

/**
 * Custom Link component for internal or external navigation
 *
 * @component
 * @example
 * // Internal link
 * <Link to="/dashboard" label="Dashboard" />
 *
 * @example
 * // External link
 * // external property is optional
 * // http(s), ftp, email and tel with automatically render as external
 * <Link to="https://example.com" label="Visit website" external />
 *
 * @example
 * // Link with loading state
 * <Link to="/profile" label="Profile" loading />
 *
 * @example
 * // Link with custom click handler en navigation
 * <Link
 *   to="/settings"
 *   label="Settings"
 *   onClick={() => console.log('clicked')}
 *   navigate={customNavigate}
 * />
 */
export const Link: React.FC<LinkProps> = React.memo(LinkComponent);
