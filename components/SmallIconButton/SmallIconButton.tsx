import * as React from 'react';

import styles from './SmallIconButton.css';

export interface ISmallIconButtonProps {
    /** provide to make the button disabled */
    disabled?: boolean;

    /** provide to inverse the button's styles */
    transparent?: boolean;

    /** button icon */
    icon?: string;

    /** button id attribute */
    id?: string;

    /** button class */
    className?: string;

    /** override button styles */
    style?: React.CSSProperties;

    /** callback that is called when the button is clicked */
    onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

export default class SmallIconButton extends React.Component<ISmallIconButtonProps, {}> {

    static defaultProps = {
        className: '',
        style: {},
    };

    render(){

        const {style, transparent, disabled, className, id, icon} = this.props;

        const buttonStyles = transparent ? styles.transparent : styles.normalButton;
        const disabledStyles = disabled ? styles.disabledButton : '';
        const iconStyle = icon ? `material-icons ${styles.icon}` : '';
        const iconFont = this.getIcon();

        const classes = `button-icon-component
                         ${styles.button}
                         ${buttonStyles}
                         ${disabledStyles}
                         ${className}`;

        return (
            <button
                id={id}
                onClick={this.onClick}
                disabled={disabled}
                className={classes}
                style={style}
            >
                <i className={iconStyle} >{iconFont}</i>
            </button>
        );
    }

    onClick = (e: React.MouseEvent<HTMLElement>) => {
        !this.props.disabled && this.props.onClick && this.props.onClick(e);
    }

    getIcon = () => {
        return this.props.icon ? this.props.icon.replace(/\s/g, '_') : '';
    }
}
