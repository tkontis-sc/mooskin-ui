import * as React from 'react';

import variables from '../_utils/globals/variables';

import { IMooskinContext } from './model';

interface DefaultStyleProps {
	className?: string;
	style?: React.CSSProperties;
}

export const useMooskinContext = () => React.useContext(MooskinContext);

export const MooskinContext = React.createContext<IMooskinContext>({ palette: variables });

export const MooskinContextProvider = MooskinContext.Provider;

export const withMooskinContext = <P extends object>(Component: React.FC<P>) => {
	return function WithMooskinContext(props: P & DefaultStyleProps) {
		const context = useMooskinContext();
		const { className = '', style = {}, ...restProps } = props;

		return <Component className={className} style={style} {...(restProps as P)} palette={context.palette} />;
	};
};
