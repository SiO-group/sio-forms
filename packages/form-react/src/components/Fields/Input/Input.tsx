import React, { memo, useMemo } from 'react';
import { NumberInput } from "./NumberInput";
import { RangeInput } from "./RangeInput";
import { DateInput } from "./DateInput";
import { FileInput } from "./FileInput";
import { SearchInput } from "./SearchInput";
import { TextInput } from "./TextInput";
import {
	DateFieldProps,
	FieldProps,
	FileFieldProps,
	NumberFieldProps,
	RangeFieldProps,
	SearchFieldProps
} from "../../../types";

export const Input = memo(
	(props: FieldProps) => {
		const { type = 'text' } = props;

		return useMemo(() => {
			switch (props.type) {
				case 'number':
					return <NumberInput {...props as NumberFieldProps} />;
				case 'range':
					return <RangeInput {...props as RangeFieldProps} />;
				case 'date':
				case 'time':
				case 'datetime-local':
					return <DateInput{...props as DateFieldProps} />;
				case 'file':
					return <FileInput {...props as FileFieldProps} />;
				case 'hidden':
					return (
						<input
							type={props.type}
							name={props.name}
							id={props.id}
							value={props.value as string}
						/>
					);
				case 'search':
					return <SearchInput {...props as SearchFieldProps} />
				default:
					return <TextInput {...props} />;
			}
		}, [type, props]);
	},
);
