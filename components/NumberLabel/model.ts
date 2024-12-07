import type { ILabelComponentProps } from '../Label/model';

export interface INumberLabelComponentProps extends ILabelComponentProps {
	/** abbreviate numerical value */
	abbreviate?: boolean;

	/** abbreviation accuracy */
	abbrAccuracy?: number;

	/** round numerical value */
	roundNumber?: boolean;

	/** rounding accuracy */
	roundAccuracy?: 'high' | 'low';
}
