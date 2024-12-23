import * as React from 'react';

// Mooskin Context HoC that passes context to component props
import { withMooskinContext } from '../Styled/MooskinContextProvider';

// Models
import { IBoxComponentProps } from '../Box/model';

// Styled Components
import { StyledTable, StyledTableHeader, StyledTableHeaderItem, StyledTableRow, StyledTableRowItem } from './styles';

/**
 * Table
 */
export const Table: React.FC<IBoxComponentProps> = withMooskinContext((props) => {
	return <StyledTable {...props} />;
});

Table.displayName = 'Table';

/**
 * TableHeader
 */
export const TableHeader: React.FC<IBoxComponentProps> = withMooskinContext((props) => {
	return <StyledTableHeader {...props} />;
});

TableHeader.displayName = 'TableHeader';

/**
 * TableHeaderItem
 */
export const TableHeaderItem: React.FC<IBoxComponentProps> = withMooskinContext((props) => {
	return <StyledTableHeaderItem {...props} />;
});

TableHeaderItem.displayName = 'TableHeaderItem';

/**
 * TableRow
 */
export const TableRow: React.FC<IBoxComponentProps> = withMooskinContext((props) => {
	return <StyledTableRow {...props} />;
});

TableRow.displayName = 'TableRow';

/**
 * TableRowItem
 */
export const TableRowItem: React.FC<IBoxComponentProps> = withMooskinContext((props) => {
	return <StyledTableRowItem {...props} />;
});

TableRowItem.displayName = 'TableRowItem';
