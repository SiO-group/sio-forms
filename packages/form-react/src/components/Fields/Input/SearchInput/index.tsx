import InputWrapper from "../../InputWrapper";
import { SearchFieldProps } from "../../../../types";
import { Icon } from "../../../Icon";

export const SearchInput = ({
	value,
	onChange,
	onSearch,

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
}: SearchFieldProps) => {
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
				type={type}
				name={name}
				id={id}
				value={value as string}
				placeholder={`${placeholder ?? ''}${!label && required ? ' *' : ''}`}
				autoComplete={autocomplete ? autocomplete : 'off'}
				onChange={e => {
					onChange(e.target.value)
					onSearch?.(e.target.value)
				}}
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
		</InputWrapper>
	);
};
