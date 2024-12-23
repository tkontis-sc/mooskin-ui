import * as React from 'react';

// Mooskin Context HoC that passes context to component props
import { withMooskinContext } from '../Styled/MooskinContextProvider';

// Models
import { IAnchorComponentProps } from './model';

// Styled Components
import { StyledAnchor } from './styles';

/**
 * Anchor
 */
export const Anchor: React.FC<IAnchorComponentProps> = withMooskinContext(({ target = '_blank', ...props }) => {
	const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		props.disabled && e.preventDefault();
		!props.disabled && props.onClick && props.onClick(e);
	};
	return <StyledAnchor {...props} target={target} onClick={onClick} boxAs="a" />;
});

Anchor.displayName = 'Anchor';
