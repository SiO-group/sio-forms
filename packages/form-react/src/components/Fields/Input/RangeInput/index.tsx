import { RangeFieldProps } from "../../../../types/field-props";
import InputWrapper from "../../InputWrapper";
import { Icon } from "../../../Icon";

export const RangeInput = ({
	value,
	min,
	max,
	step = 1,
	showValue = true,
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
}: RangeFieldProps) => {
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
			{showValue && (
				<span className='form-field__range-value'>{Number(value)}</span>
			)}
			<input
				type={type}
				name={name}
				id={id}
				value={Number(value)}
				autoComplete={autocomplete ? autocomplete : 'off'}
				onChange={e => onChange(Number(e.target.value))}
				onBlur={() => {
					if (setTouched) setTouched(true);
					if (setFocused) setFocused(false);
				}}
				onFocus={() => {
					if (setFocused) setFocused(true);
				}}
				min={min}
				max={max}
				step={step}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={Number(value)}
				readOnly={readOnly}
				disabled={disabled}
				aria-label={label || placeholder}
			/>
		</InputWrapper>
	);
};
