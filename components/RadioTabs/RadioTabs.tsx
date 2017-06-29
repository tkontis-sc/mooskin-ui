import * as React from 'react';

import styles from './RadioTabs.css';

// import {IRadioGroupProps, IRadioProps, Radio, RadioGroup} from '../Radio/Radio';

export interface IRadioTabsProps {

    /** override id */
    id?: string;

    /** container class */
    className?: string;

    /** override styles */
    style?: {[key: string]: string|number};

    /** horizontal RadioTabs view */
    horizontal?: boolean;

    /** children here can only be Tab elements */
    children?: Array<React.ReactElement<IContentProps>> | React.ReactElement<IContentProps>;
}

export interface IContentProps {

    /** container class */
    className?: string;

    /** title */
    title: string;

    /** if active */
    active?: boolean;

    /** override styles */
    style?: {[key: string]: string|number};

}

export interface IRadioTabsState {
    activeRadio?: number;
}

class RadioTabs extends React.Component<IRadioTabsProps, IRadioTabsState> {

    public static defaultProps = {
        // activeRadio: 0,
        className: '',
        style: {}
    };

    public static Content: React.StatelessComponent<IContentProps>;

    constructor(props: IRadioTabsProps){
        super(props);

        this.state = {
            activeRadio: this.getActiveRadio()
        };
    }

    public render(){

        const {headers, bodies} = this.makeContent();
        const headerStyles = !this.props.horizontal ? styles.headerVertical : styles.headerHorizontal;
        const containerStyles = !this.props.horizontal ? styles.containerVertical : styles.container;

        return (
            <div className={`radio-tabs-component ${containerStyles}`}>
                <div className={headerStyles}>
                    {headers}
                </div>
                <div className={styles.content}>
                    {bodies}
                </div>
            </div>
        );
    }

    public onClickRadio = (radioIndex: number) => {
        return (e: React.MouseEvent<HTMLElement>) => {
            this.setState({activeRadio: radioIndex});
        };
    }

    private makeContent(){

        const headers: Array<React.ReactElement<IRadioTabsProps>> = [];
        const bodies: Array<React.ReactElement<IContentProps>> = [];

        React.Children.forEach(this.props.children, (child, index) => {
            if (React.isValidElement<IContentProps>(child)){

                headers.push(
                    <Header
                        key={index}
                        title={child.props.title}
                        active={this.state.activeRadio === index}
                        onClick={this.onClickRadio(index)}
                        name={this.generateName()}
                    />
                );

                const extraProps: Partial<IContentProps & {key: number}> = {
                    active: this.state.activeRadio === index,
                    key: index,
                };

                bodies.push(React.cloneElement(child, extraProps));

            }else{
                throw new Error('<RadioTabs> element only accepts Content elements as children');
            }
        });

        return {headers, bodies};
    }

    private getActiveRadio(): number {
        let activeRadio = 0;
        const childrenArray = React.Children.toArray(this.props.children);

        for (const [index, value] of childrenArray.entries()){
            if (React.isValidElement<IContentProps>(value) && value.props.active){
                activeRadio = index;
            }
        }

        return activeRadio;
    }

    private generateName = () => {
        return Date.now().toString();
    }
}

export const Content: React.StatelessComponent<IContentProps> = (props) => {

    const displayClass = !props.active ? styles.invisible : styles.visible;

    return (
        <div
            className={`radio-content ${displayClass}`}
            style={props.style}
        >
            {props.children}
        </div>
    );
};

export interface IHeaderProps {
    title: string;
    active: boolean;
    name?: string;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Header: React.StatelessComponent<IHeaderProps> = (props) => {

    const activeRadio = props.active ? styles.activeHeader : styles.inactiveHeader;

    return (
        <div className={`radio-header ${styles.radio} ${activeRadio}`} onClick={props.onClick}>
            <label>
                <input
                    type="radio"
                    name={props.name}
                    // onClick={onRadioClick}
                    // disabled={props.disabled}
                    defaultChecked={props.active}
                />
                <span>{props.title}</span>
            </label>
            {props.children}
        </div>
    );
};

export default RadioTabs;
