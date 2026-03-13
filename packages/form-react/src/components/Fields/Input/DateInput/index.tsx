import { DateFieldProps } from "../../../../types/field-props";
import { RefObject, useRef } from "react";
import InputWrapper from "../../InputWrapper";
import { Button } from "../../../Button";
import { Icon } from "../../../Icon";
import { CustomIcons } from '../../../../utils/custom-icons'

export const DateInput = ({
	value,
	min,
	max,
	step = 1,
	onChange,

	name,
	id,
	placeholder,
	label,
	required,
	autocomplete,
	setTouched,
	setFocused,
	readOnly,
	disabled,
	icon,

	description,
	focused,
	errors,
	touched,
	type,
	className,
	style,
}: DateFieldProps) => {
	const inputRef: RefObject<HTMLInputElement> =
		useRef<HTMLInputElement>(null);

	const showPicker = () => {
		if (inputRef.current) {
			inputRef.current.focus();
			if (inputRef.current?.showPicker) {
				inputRef.current.showPicker();
			}
		}
	};

	return (
		<InputWrapper
			type={type}
			id={id}
			label={label}
			description={description}
			required={required}
			focused={focused}
			disabled={disabled || readOnly}
			hasValue={!!value}
			hasError={errors.length > 0 && touched}
			errors={errors}
			className={className}
			style={style}>
			<Icon icon={icon} />
			<input
				ref={inputRef}
				type={type}
				value={(value ?? '').toString()}
				min={min}
				max={max}
				step={step}
				onChange={e => onChange(e.target.value)}
				name={name}
				id={id}
				placeholder={`${placeholder}${!label && required ? ' *' : ''}`}
				autoComplete={autocomplete ? autocomplete : 'off'}
				onBlur={() => {
					if (setTouched) setTouched(true);
					if (setFocused) setFocused(false);
				}}
				onFocus={() => {
					if (setFocused) setFocused(true);
				}}
				readOnly={readOnly}
				disabled={disabled}
				aria-label={label || placeholder}
			/>
			<Button
				className='form-field__action'
				type='button'
				onClick={showPicker}
				disabled={disabled}
				aria-label={`Open ${type} picker`}
				label={type === 'date' ? CustomIcons.Date() : (type === 'time' ? CustomIcons.Time() : CustomIcons.DateTime())}
			/>
		</InputWrapper>
	);
};
