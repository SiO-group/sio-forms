import { ChangeEvent, KeyboardEvent } from "react";
import { NumberFieldProps } from "../../../../types/field-props";
import InputWrapper from "../../InputWrapper";
import { Icon } from "../../../Icon";
import { Button } from "../../../Button";

export const NumberInput = ({
	value,
	min,
	max,
	step = 1,
	spinner = true,
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
}: NumberFieldProps) => {
	const getPrecision = (step: number) => {
		const stepStr: string = step.toString();
		if (!stepStr.includes(".")) return 0;
		return stepStr.split(".")[1].length;
	};

	const handleIncrement = () => {
		const newValue: number = Math.max(min ?? 0, Math.min(Number(value) + step, max ?? Infinity));
		onChange(newValue.toFixed(getPrecision(step)));
	};

	const handleDecrement = () => {
		const newValue: number = Math.max(Number(value) - step, min ?? -Infinity);
		onChange(newValue.toFixed(getPrecision(step)));
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			handleIncrement();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			handleDecrement();
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		let value: string = ''
		if (e.target.value) {
			value = e.target.valueAsNumber.toString();
		}

		onChange(value)
	}

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
			{spinner && spinner === 'horizontal' && (
				<Button
					type='button'
					variant="link"
					className="form-field__spinner-btn"
					onClick={handleDecrement}
					disabled={
						disabled ||
						(min !== undefined && Number(value) <= min)
					}
					aria-label='Decrease value'
					label="-"
				/>
			)}
			<Icon icon={icon} />
			<input
				type='number'
				value={value !== '' ? Number(value) : ''}
				min={min}
				max={max}
				step={step}
				onChange={handleChange}
				onKeyDown={(e) => {
					handleKeyDown(e);
					setTouched?.(true)
				}}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={Number(value)}
				name={name}
				id={id}
				placeholder={`${placeholder ?? ''}${!label && required ? ' *' : ''}`}
				autoComplete={autocomplete ? autocomplete : 'off'}
				onBlur={() => {
					setTouched?.(true);
					setFocused?.(false);
				}}
				onFocus={() => {
					setFocused?.(true);
				}}
				readOnly={readOnly}
				disabled={disabled}
				aria-label={label || placeholder}
				style={spinner && spinner === 'horizontal' ? {textAlign: 'center'} : {}}
			/>

			{spinner &&
				(spinner === 'horizontal'
					? <Button
							type='button'
							variant="link"
							className="form-field__spinner-btn"
							onClick={handleIncrement}
							disabled={
								disabled ||
								(max !== undefined && Number(value) >= max)
							}
							aria-label='Increase value'
							label="+"
						/>
					: <div className='form-field__spinner' aria-hidden='true'>
							<Button
								type='button'
								onClick={handleIncrement}
								disabled={
									disabled ||
									(max !== undefined && Number(value) >= max)
								}
								aria-label='Increase value'
								label="&#9650;"
							/>
							<Button
								type='button'
								onClick={handleDecrement}
								disabled={
								  disabled ||
									(min !== undefined && Number(value) <= min)
							  }
								aria-label='Decrease value'
								label="&#9660;"
							/>
					</div>
				)}
		</InputWrapper>
	);
};
