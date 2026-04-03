import { useState, useRef, useEffect } from "react";
import { createPortal } from 'react-dom';
import InputWrapper from "../../InputWrapper";
import { SearchFieldProps } from "../../../../types";
import { Icon } from "../../../Icon";

export const SearchInput = <T,> ({
	value,
	onChange,
	onSearch,
	optionLabel,
	optionValue,
	renderMode,
	debounce,
	minLength,
	onResults,
	onSelect,

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
}: SearchFieldProps<T>) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const requestRef = useRef<number>(0);

	const [results, setResults] = useState<T[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [dropdownStyle, setDropdownStyle] = useState({});

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value;

		onChange(v);

		if (!onSearch || v.length < (minLength ?? 3)) {
			setResults([]);
			setOpen(false);
			onResults?.([], loading);
			return;
		}

		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(async () => {
			setLoading(true);
			onResults?.([], true);

			try {
				const id: number = ++requestRef.current;
				const res: T[] = await onSearch(v);

				if (id === requestRef.current) {
					setResults(res ?? []);
					setOpen(true);
					onResults?.(res, false);
				}
			} catch {
				setResults([]);
				setOpen(false);
				onResults?.([], false);
			} finally {
				setLoading(false);
			}
		}, debounce);
	}

	const updatePosition = () => {
		const rect = inputRef.current?.getBoundingClientRect();
		if (rect) {
			setDropdownStyle({
				position: 'fixed',
				top: rect.bottom + window.scrollY,
				left: rect.left + window.scrollX,
				width: rect.width,
				zIndex: 9999,
			});
		}
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current?.contains(e.target as Node)) return;
			setFocused?.(false);
			setOpen(false);
			setResults([]);
		};

		document.addEventListener('mousedown', handleClickOutside, false);
		return () => document.removeEventListener('mousedown', handleClickOutside, false);
	}, []);

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
			style={style}
			ref={containerRef}
		>
			<Icon icon={icon} />
			<input
				ref={inputRef}
				type={type}
				name={name}
				id={id}
				value={value as string}
				placeholder={`${placeholder ?? ''}${!label && required ? ' *' : ''}`}
				autoComplete={autocomplete ? autocomplete : 'off'}
				onChange={handleChange}
				onBlur={() => {
					setTouched?.(true);
				}}
				onFocus={() => {
					updatePosition();
					setFocused?.(true);
				}}
				readOnly={readOnly}
				disabled={disabled}
				aria-label={label || placeholder}
			/>
			{(renderMode === 'inline' && open) ? createPortal(
				<div className="search-dropdown" style={dropdownStyle}>
					{loading
						? <div className="search-dropdown__item loading">Zoeken...</div>
						: results.length === 0
							? <div className="search-dropdown__item empty">Geen resultaten</div>
							: (
								results.map((item, index) => (
									<button
										key={optionValue?.(item) ?? index}
										type="button"
										className="search-dropdown__item"
										onClick={() => {
											onSelect?.(item);
											setResults([]);
											setOpen(false);
											setFocused?.(false);
										}}
									>
										{optionLabel?.(item) ?? index}
									</button>
								))
							)}
				</div>
			, document.body) : null}
		</InputWrapper>
	);
};
