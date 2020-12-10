import styled from 'styled-components';

// Models
import { IRadioComponentProps } from './model';

// Components
import Box from '../Box/Box';

// "CSS" variables
import variables from '../_utils/globals/variables';

export const StyledRadioContainer = styled(Box)`
    display: flex;
    flex-direction: column;
`;

export const StyledRadioWrapper = styled(Box)<Partial<IRadioComponentProps>>`
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    width: fit-content;
    display: flex;
    align-items: center;
`;

export const StyledRadio = styled(Box)<Partial<IRadioComponentProps>>`
    font-family: 'Mooskin Icons';
    margin-right: 10px;
    font-size: 23px;
    color: ${(props) => props.disabled ? props.theme.disabledfont || variables.disabledfont : props.theme.secondary || variables.secondary};
`;
