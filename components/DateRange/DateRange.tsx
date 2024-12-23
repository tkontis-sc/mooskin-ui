import * as React from 'react';

// Mooskin Context HoC that passes context to component props
import { withMooskinContext } from '../Styled/MooskinContextProvider';

// Date Range Component
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// Helpers
import fnsFormat from 'date-fns/format';

// Models
import { IBoxComponentProps } from '../Box/model';
import { IDateRangePickerComponentProps } from './model';

// Components
import { Box } from '../Box/Box';
import { Input, InputContainer } from '../Input/Input';

import { StyledDateRange } from './styles';

/**
 * DateRange
 */
export const DateRange: React.FC<IDateRangePickerComponentProps> = withMooskinContext(
	({ direction = 'horizontal', format = 'dd MMM yyyy', ...props }) => {
		const [showPicker, setShowPicker] = React.useState(false);

		const getInputValue = () => {
			let inputValue = '';

			props.ranges &&
				props.ranges.length &&
				props.ranges.forEach((item, i) => {
					if (item.startDate && item.endDate) {
						const separator = i > 0 ? ', ' : '';
						inputValue = inputValue + separator + `${fnsFormat(item.startDate, format)} - ${fnsFormat(item.endDate, format)}`;
					}
				});

			return inputValue || 'N/A';
		};

		return (
			<Box position="relative" d="flex" {...props.wrapperProps}>
				<InputContainer value={getInputValue()} {...props.inputContainerProps}>
					{props.customComponent}
					<Input onFocus={() => setShowPicker(true)} {...props.inputProps} />
				</InputContainer>
				{showPicker && (
					<StyledDateRange boxShadow="md" {...props.pickerWrapperProps} palette={(props as any).palette}>
						<DateRangePicker ranges={props.ranges} direction={direction} onChange={props.onChange} {...props} />
						<DateRangeOverlay onClick={() => setShowPicker(false)} />
					</StyledDateRange>
				)}
			</Box>
		);
	}
);

DateRange.displayName = 'DateRange';

/**
 * DateRangeOverlay
 */
const DateRangeOverlay: React.FC<IBoxComponentProps> = ({ className = '', style = {}, ...props }) => {
	return <Box position="fixed" top={0} left={0} right={0} bottom={0} zIndex={-1} className={className} style={style} {...props} />;
};

DateRangeOverlay.displayName = 'DateRangeOverlay';
