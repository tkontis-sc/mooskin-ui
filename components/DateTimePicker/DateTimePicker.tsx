import * as React from 'react';

// Date-FNS
import DateFnsUtils from '@date-io/date-fns';

// Models
import { IDateTimePickerComponentProps, IDateTimePickerKeyboardComponentProps } from './model';

// Material-UI Date Time Picker
import { DateTimePicker as DateTimePickerUI, KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

// Components
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import variables from '../_utils/globals/variables';
import { Input } from '../Input/Input';
import { withMooskinContext } from '../Styled/MooskinContextProvider';
import { getOverridesForPicker } from '../_utils/helper';

const ComponentByType = {
	'date-time': DateTimePickerUI,
	'date-time-keyboard': KeyboardDateTimePicker
};

/**
 * DateTimePicker
 */
export const DateTimePicker: React.FC<IDateTimePickerComponentProps | IDateTimePickerKeyboardComponentProps> = withMooskinContext(
	({ ampm = false, format = 'dd/MM/yyyy HH:ss', pickerType = 'date-time', ...props }) => {
		const materialTheme = createTheme(getOverridesForPicker((props as any).palette, variables));

		const renderInput = (dateInputProps: any) => <Input style={{ width: '100%' }} {...dateInputProps} {...props.inputComponentProps} />;

		const PickerComponent = ComponentByType[pickerType];

		return (
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<ThemeProvider theme={materialTheme}>
					<PickerComponent {...props} ampm={ampm} format={format} TextFieldComponent={renderInput} />
				</ThemeProvider>
			</MuiPickersUtilsProvider>
		);
	}
);

DateTimePicker.displayName = 'DateTimePicker';
