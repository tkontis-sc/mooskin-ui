import * as React from 'react';

// Mooskin Context HoC that passes context to component props
import { withMooskinContext } from '../Styled/MooskinContextProvider';

// Models
import { IBaseAlertComponentProps } from './model';

// Styled Components
import {
	StyledAlert,
	StyledAlertButton,
	StyledAlertCloseButton,
	StyledAlertDescription,
	StyledAlertIcon,
	StyledAlertTitle
} from './styles';

const AlertIcons = {
	error: 'error',
	info: 'announcement',
	success: 'check_circle',
	warning: 'warning'
};

/**
 * Alert
 */
export const Alert: React.FC<IBaseAlertComponentProps> = withMooskinContext(({ status = 'info', variant = 'subtle', ...props }) => {
	const recurseChildren = (children: any): any => {
		if (!children) {
			return null;
		}

		return React.Children.map(children, (child, i) => {
			if (
				React.isValidElement<IBaseAlertComponentProps>(child) &&
				(child.type === AlertIcon ||
					child.type === AlertTitle ||
					child.type === AlertDescription ||
					child.type === AlertCloseButton ||
					child.type === AlertButton)
			) {
				return React.cloneElement(child, {
					children: recurseChildren(child.props.children),
					key: i,
					status: child.props.status || status,
					variant: child.props.variant || variant
				} as IBaseAlertComponentProps);
			}

			if (React.isValidElement(child) && (child.props as any).children) {
				return React.cloneElement(child, { key: i, children: recurseChildren((child.props as any).children) } as any);
			}

			return child;
		});
	};

	return <StyledAlert {...props} status={status} variant={variant} boxShadow="lg" children={recurseChildren(props.children)} />;
});

Alert.displayName = 'Alert';

/**
 * AlertIcon
 */
export const AlertIcon: React.FC<IBaseAlertComponentProps> = withMooskinContext((props) => {
	return <StyledAlertIcon {...props} children={props.status && AlertIcons[props.status]} />;
});

AlertIcon.displayName = 'AlertIcon';

/**
 * AlertTitle
 */
export const AlertTitle: React.FC<IBaseAlertComponentProps> = withMooskinContext((props) => {
	return <StyledAlertTitle {...props} />;
});

AlertTitle.displayName = 'AlertTitle';

/**
 * AlertDescription
 */
export const AlertDescription: React.FC<IBaseAlertComponentProps> = withMooskinContext((props) => {
	return <StyledAlertDescription {...props} />;
});

AlertDescription.displayName = 'AlertDescription';

/**
 * AlertCloseButton
 */
export const AlertCloseButton: React.FC<IBaseAlertComponentProps> = withMooskinContext((props) => {
	return <StyledAlertCloseButton {...props} children="close" />;
});

AlertCloseButton.displayName = 'AlertCloseButton';

/**
 * AlertButton
 */
export const AlertButton: React.FC<IBaseAlertComponentProps> = withMooskinContext((props) => {
	return <StyledAlertButton {...props} />;
});

AlertButton.displayName = 'AlertButton';
