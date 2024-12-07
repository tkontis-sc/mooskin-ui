import { IBoxComponentProps } from '../Box/model';

export interface ILoadingBarComponentProps extends IBoxComponentProps {
	/** progress of the loadingBar */
	progress: number;

	/** whether an error occurred */
	error?: boolean;

	/** callback function to be fired when progress is done */
	onLoaderDone?: () => void;

	/** callback to be fired on error */
	onLoaderError?: () => void;
}
