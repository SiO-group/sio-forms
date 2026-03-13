import { ChangeEvent } from "react";
import { FileFieldProps } from "../../../../types/field-props";
import InputWrapper from "../../InputWrapper";
import { Button } from "../../../Button";
import { Icon } from "../../../Icon";
import { isValidFile } from "@sio/form-validation";
import { getAccept } from "../../../../utils/get-accept-string";
import { CustomIcons } from "../../../../utils/custom-icons";
import { getFileSize } from "../../../../utils/get-file-size";
import { FileTypeIcon } from "../../../../utils/file-type-icon";

export const FileInput = ({
	value,
	onChange,
	onError,

	accept,
	filesize,
	multiple = false,
	capture,
	onFileRemove,
	onRemoveAll,

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
}: FileFieldProps) => {
	const currentFiles = (value as File[]) ?? [];

	const handleRemove = (index: number) => {
		const removedFile: File = currentFiles[index];
		const newFiles: File[] = currentFiles.filter((_, i) => i !== index);
		onChange(newFiles);
		onFileRemove?.(removedFile, index, newFiles);
	}

	const handleRemoveAll = () => {
		const removedFiles: File[] = [...currentFiles];
		onChange([]);
		onRemoveAll?.(removedFiles);
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files: File[] = Array.from(e.target.files ?? []);
		const validator = isValidFile(filesize, getAccept(accept));

		let fileList: File[] = [...currentFiles];
		const errorList: string[] = [];

		for (let file of files) {
			const error: string | null = validator(file);
			if (error) {
				errorList.push(error);
			} else {
				if (multiple) {
					fileList.push(file);
				} else {
					fileList = [file]
				}
			}
		}

		onChange(fileList);
		if (onError) onError(errorList ?? [])
	};

	return (
		<>
			<InputWrapper
				type={type}
				id={id}
				label={label}
				description={description}
				required={required}
				focused={focused}
				disabled={disabled || readOnly}
				hasValue={currentFiles.length > 0}
				hasError={errors.length > 0 && touched}
				errors={errors}
				className={className}
				style={style}>
				<Icon icon={icon} />
				<input
					type={type}
					name={name}
					id={id}
					placeholder={`${placeholder}${!label && required ? ' *' : ''}`}
					autoComplete={autocomplete ? autocomplete : 'off'}
					onChange={handleChange}
					onBlur={() => {
						if (setTouched) setTouched(true);
						if (setFocused) setFocused(false);
					}}
					onFocus={() => {
						if (setFocused) setFocused(true);
					}}
					accept={getAccept(accept)}
					capture={capture}
					readOnly={readOnly}
					disabled={disabled}
					aria-label={label || placeholder}
					multiple={multiple}
				/>
				<Button
					className='form-field__action'
					type='button'
					onClick={() => {
						if (setTouched) setTouched(true);
						document.getElementById(id)?.click();
					}}
					disabled={disabled}
					aria-label='Select files'
					label={CustomIcons.FileUpload()}
				/>
			</InputWrapper>

			{currentFiles.length !== 0 && (
				<div className='form-field__upload-file-section'>
					{currentFiles.map((file, index) => (
						<div className='form-field__upload-file' key={index}>
							<div className='form-field__upload-file-label'>
								{FileTypeIcon(file.type || 'text/uri-list')}
								<span>
									{file.name}
									{file.size
										? ` (${getFileSize(file.size)})`
										: ''}
								</span>
							</div>
							<div className='form-field__upload-file__buttons'>
								<button
									type="button"
									className='form-field__upload-file-remove-button'
									onClick={() => handleRemove(index)}>
									{CustomIcons.TrashIcon()}
								</button>
							</div>
						</div>
					))}
					<div className='form-field__upload-buttons'>
						<button
							type="button"
							className='form-field__upload-remove-all-button'
							onClick={handleRemoveAll}>
							{CustomIcons.TrashIcon()}
							<span>Verwijder alles</span>
						</button>
					</div>
				</div>
			)}
			</>
	);
};
