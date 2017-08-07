import * as React from 'react';

import styles from './TabbedTable.css';

// import {Table} from '../index';
// import ITableProps from '../Table';

export interface ITabbedTableProps {

    /** override id */
    id?: string;

    /** container class */
    className?: string;

    /** override styles */
    style?: React.CSSProperties;

    /** children here can only be Tab elements */
    children?: Array<React.ReactElement<ITabTableProps>> | React.ReactElement<ITabTableProps>;
}

export interface ITabTableProps{

    /** override Table id */
    id?: string;

    /** title */
    title: string;

    /** further information to be displayed on the header */
    info?: string;

    /** wether the title should be an href, and where it should lead */
    href?: string;

    /** value displayed on the tab header */
    headerValue?: number;

    /** Table class */
    className?: string;

    /** override Table styles */
    style?: React.CSSProperties;

    /** wether this table is active or not */
    active?: boolean;
}

export interface IHeaderProps {
    value?: number;
    info?: string;
    href?: string;
    title: string;
    active: boolean;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface ITabbedTableState {
    activeTable?: number;
}

export default class TabbedTable extends React.Component<ITabbedTableProps, ITabbedTableState>{

    public static defaultProps = {
        className: '',
        style: {}
    };

    public static TabTable: React.StatelessComponent<ITabbedTableProps>;

    constructor(props: any){
        super(props);

        this.state = {
            activeTable: this.getActiveTable()
        };
    }

    public render(){

        const {headers, tables} = this.makeContent();

        return(
            <div className={`tabbed-table-component ${styles.container}`}>
                <div className={styles.heading}>
                    {headers}
                </div>
                <div className={styles.tables}>
                    {tables}
                </div>
            </div>
        );
    }

    private makeContent(){

        const headers: Array<React.ReactElement<IHeaderProps>> = [];
        const tables: Array<React.ReactElement<ITabTableProps>> = [];

        React.Children.forEach(this.props.children, (child, index) => {
            if (React.isValidElement<ITabTableProps>(child)){

                headers.push(
                    <Header
                        key={index}
                        href={child.props.href}
                        value={child.props.headerValue}
                        title={child.props.title}
                        info={child.props.info}
                        active={this.state.activeTable === index}
                        onClick={this.onClickHeader(index)}
                    />
                );

                const extraProps: Partial<ITabTableProps & {key: number}> = {
                    active: this.state.activeTable === index,
                    key: index
                };

                tables.push(React.cloneElement(child, extraProps));

            }else{
                throw new Error('<TabbedTable> element only accepts <TabTable> elements as children');
            }
        });

        return {headers, tables};
    }

    private onClickHeader = (tabIndex: number) => {
        return (e: React.MouseEvent<HTMLElement>) => {
            this.setState({activeTable: tabIndex});
        };
    }

    private getActiveTable(): number {
        let activeTable = 0;
        const childrenArray = React.Children.toArray(this.props.children);

        for (const [index, value] of childrenArray.entries()){
            if (React.isValidElement<ITabTableProps>(value) && value.props.active){
                activeTable = index;
            }
        }

        return activeTable;
    }
}

export const TabTable: React.StatelessComponent<ITabTableProps> = (props) => {

    const displayClass = !props.active ? styles.invisible : styles.visible;

    return (
            <div>
                <table {...this.props} className={`${styles.table} ${props.className} ${displayClass}`}>
                    {props.children}
                </table>
            </div>
        );
};

export const Header: React.StatelessComponent<IHeaderProps> = (props) => {

    const activeTab = props.active ? styles.activeHeader : styles.inactiveHeader;

    return (
        <div className={`tab-header ${styles.header} ${activeTab}`} onClick={props.onClick}>
            <a href={props.href} className={styles.anchor}>
                <span className={styles.tabletitle}>{props.title}</span>
                <span className={styles.value}>{props.value}</span>
                <span className={styles.info}>{props.info}</span>
            </a>
        </div>
    );
};
