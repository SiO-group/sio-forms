import React from "react";
import { ButtonProps } from "../../types";

const ButtonComponent: React.FC<ButtonProps> = ({
    type = 'button',
    label,
    onClick,
    variant = 'primary',
    color = 'default',
    size = 'md',
    block = false,
    loading = false,
    disabled = false,
    className = '',
    ariaLabel = '',
    style = {},
    children,
}: ButtonProps) => {
  const isDisabled: boolean = disabled || loading;

  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }

    onClick?.(e);
  };

  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    `btn--${color}`,
    block && 'btn--block',
    loading && 'btn--loading',
    isDisabled && 'btn--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      onClick={handleClick}
      className={buttonClasses}
      style={style}
      disabled={isDisabled}
      aria-label={ariaLabel || (label as string)}
      aria-busy={loading}
      aria-disabled={isDisabled}>
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
          {label}
        </>
      )}
    </button>
  );
};

/**
 * Button component for user interaction.
 *
 * @component
 * @example
 * // Primaire button
 * <Button label="Save" onClick={handleSave} />
 *
 * @example
 * // Submit button with loading state
 * <Button
 *   type="submit"
 *   label="Send"
 *   variant="primary"
 *   loading
 * />
 *
 * @example
 * // Button with icon and tekst
 * <Button type="button" onClick={handleClick}>
 *   <Icon name="plus" />
 *   <span>Add</span>
 * </Button>
 *
 * @example
 * // Error variant
 * <Button
 *   type="button"
 *   label="Delete"
 *   variant="secondary"
 *   color="error"
 *   onClick={handleDelete}
 * />
 */
export const Button: React.FC<ButtonProps> = React.memo(ButtonComponent);