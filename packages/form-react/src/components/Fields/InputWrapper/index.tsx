import React, { memo, forwardRef } from 'react';

interface InputWrapperProps {
	id: string;
	label?: string;
	description?: string | React.ReactNode;
	required?: boolean;
	focused?: boolean;
	disabled?: boolean;
	hasValue?: boolean;
	hasError?: boolean;
	errors?: string[];
	hideLayout?: boolean;
	className?: string;
	style?: React.CSSProperties;
	children: React.ReactNode;
	type?: string;
}

const InputWrapper = forwardRef<HTMLDivElement, InputWrapperProps>(({
	type = 'text',
	id,
	label,
	description,
	required = false,
	focused = false,
	disabled = false,
	hasValue = false,
	hasError = false,
	errors = [],
	hideLayout = false,
	className = '',
	style = {},
	children,
}, ref) => {
	const classes: string = [
		'form-field',
		`form-field__${type}`,
		focused && 'form-field--focused',
		hasValue && 'form-field--has-value',
		hasError && 'form-field--has-errors',
		disabled && 'form-field--disabled',
		hideLayout && 'form-field--hidden-layout',
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div
			ref={ref}
			className={classes}
			style={style}
			aria-required={required}
			aria-invalid={hasError}>
			{label && (
				<label htmlFor={id} id={`${id}-label`}>
					{label} {required && <span>*</span>}
				</label>
			)}

			<div className={`form-field__control`}>{children}</div>
			{description && (
				<div className='form-field__description'>{description}</div>
			)}
			{hasError && errors.length > 0 && (
				<ul className='form-field__errors' role='alert'>
					{[...new Set(errors)].map((x: string, i: number) => (
						<li className={'form-field__errors-item'} key={i}>
							{x}
						</li>
					))}
				</ul>
			)}
		</div>
	);
});

export default memo(InputWrapper);
