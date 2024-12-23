import * as React from 'react';

// Date-FNS
import DateFnsUtils from '@date-io/date-fns';

// Models
import { IDatePickerComponentProps, IDatePickerKeyboardComponentProps } from './model';

// Material-UI Date Picker
import { DatePicker as DatePickerUI, KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

// Components
import { Input } from '../Input/Input';
import { withMooskinContext } from '../index';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import variables from '../_utils/globals/variables';
import { getOverridesForPicker } from '../_utils/helper';

const ComponentByType = {
	date: DatePickerUI,
	'date-keyboard': KeyboardDatePicker
};

/**
 * DatePicker
 */
export const DatePicker: React.FC<IDatePickerComponentProps | IDatePickerKeyboardComponentProps> = withMooskinContext(
	({ format = 'dd/MM/yyyy', pickerType = 'date', ...props }) => {
		const materialTheme = createTheme(getOverridesForPicker((props as any).palette, variables));
		const { inputProps } = props;

		const renderInput = (dateInputProps: any) => {
			return <Input style={{ width: '100%' }} {...dateInputProps} {...inputProps} />;
		};

		const PickerComponent = ComponentByType[pickerType];

		return (
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<ThemeProvider theme={materialTheme}>
					<PickerComponent {...props} format={format} TextFieldComponent={renderInput} />
				</ThemeProvider>
			</MuiPickersUtilsProvider>
		);
	}
);

DatePicker.displayName = 'DatePicker';
