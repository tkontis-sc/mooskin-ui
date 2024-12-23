import * as React from 'react';

// Mooskin Context HoC that passes context to component props
import { withMooskinContext } from '../Styled/MooskinContextProvider';

// Models
import { IBoxComponentProps } from '../Box/model';
import { IButtonComponentProps } from './model';

// Styled Components
import { StyledButton, StyledButtonIcon, StyledButtonThree, StyledButtonTwo } from './styles';

/**
 * Button
 */
export const Button: React.FC<IButtonComponentProps> = withMooskinContext(({ buttonSize = 'md', type = 'button', ...props }) => {
	const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		!props.disabled && props.onClick && props.onClick(e);
	};
	return (
		<StyledButton
			fontSize={[12, 12, 14, 14]}
			{...props}
			buttonSize={buttonSize}
			type={type}
			boxAs={props.href ? 'a' : 'button'}
			onClick={onClick}
		/>
	);
});

Button.displayName = 'Button';

/**
 * ButtonTwo
 */
export const ButtonTwo: React.FC<IButtonComponentProps> = withMooskinContext(({ buttonSize = 'md', type = 'button', ...props }) => {
	const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		!props.disabled && props.onClick && props.onClick(e);
	};
	return (
		<StyledButtonTwo
			fontSize={[12, 12, 14, 14]}
			{...props}
			buttonSize={buttonSize}
			type={type}
			boxAs={props.href ? 'a' : 'button'}
			onClick={onClick}
		/>
	);
});

ButtonTwo.displayName = 'ButtonTwo';

/**
 * ButtonThree
 */
export const ButtonThree: React.FC<IButtonComponentProps> = withMooskinContext(({ buttonSize = 'md', type = 'button', ...props }) => {
	const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		!props.disabled && props.onClick && props.onClick(e);
	};
	return (
		<StyledButtonThree
			fontSize={[12, 12, 14, 14]}
			{...props}
			buttonSize={buttonSize}
			type={type}
			boxAs={props.href ? 'a' : 'button'}
			onClick={onClick}
		/>
	);
});

ButtonThree.displayName = 'ButtonThree';

/**
 * ButtonIcon
 */
export const ButtonIcon: React.FC<IBoxComponentProps> = ({ className = '', style = {}, ...props }) => {
	return <StyledButtonIcon {...props} style={style} className={`notranslate ${className}`} />;
};

ButtonIcon.displayName = 'ButtonIcon';
