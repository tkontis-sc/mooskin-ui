import * as React from 'react';

// Mooskin Context HoC that passes context to component props
import { withMooskinContext } from '../Styled/MooskinContextProvider';

// Models
import { ILoaderComponentProps } from './model';

// Styled Components
import { StyledLoader } from './styles';

/**
 * Loader
 */
export const Loader: React.FC<ILoaderComponentProps> = withMooskinContext(({ size = 50, spinnerWidth = 5, ...props }) => {
	return <StyledLoader size={size} spinnerWidth={spinnerWidth} {...props} />;
});

Loader.displayName = 'Loader';
