import * as React from 'react';

// Mooskin Context HoC that passes context to component props
import { withMooskinContext } from '../Styled/MooskinContextProvider';

// Models
import { ICommonSkeletonComponentProps, ISkeletonCircleComponentProps, ISkeletonTextComponentProps } from './model';

// Styled Components
import { StyledSkeleton, StyledSkeletonCircle, StyledSkeletonText } from './styles';

/**
 * Skeleton
 */
export const Skeleton: React.FC<ICommonSkeletonComponentProps> = withMooskinContext(
	({ endColor = '#A0AEC0', isLoaded = false, speed = 0.8, startColor = '#EDF2F7', ...props }) => {
		if (isLoaded) {
			return <>{props.children}</>;
		}
		return <StyledSkeleton endColor={endColor} isLoaded={isLoaded} speed={speed} startColor={startColor} {...props} />;
	}
);

Skeleton.displayName = 'Skeleton';

/**
 * SkeletonCircle
 */
export const SkeletonCircle: React.FC<ISkeletonCircleComponentProps> = withMooskinContext(
	({ endColor = '#A0AEC0', isLoaded = false, size = '20px', speed = 0.8, startColor = '#EDF2F7', ...props }) => {
		if (isLoaded) {
			return <>{props.children}</>;
		}
		return <StyledSkeletonCircle endColor={endColor} isLoaded={isLoaded} size={size} speed={speed} startColor={startColor} {...props} />;
	}
);

SkeletonCircle.displayName = 'Skeleton';

/**
 * SkeletonText
 */
export const SkeletonText: React.FC<ISkeletonTextComponentProps> = withMooskinContext(
	({ endColor = '#A0AEC0', isLoaded = false, lines = 4, speed = 0.8, startColor = '#EDF2F7', ...props }) => {
		if (isLoaded) {
			return <>{props.children}</>;
		}

		const linesIteratorHelper = Array(lines)
			.fill(undefined)
			.map((_, i, a) => ({ key: i, widthPercentage: a.length - 1 ? '80%' : '100%' }));

		if (lines > 0) {
			return (
				<>
					{linesIteratorHelper.map(({ key, widthPercentage }) => {
						return (
							<StyledSkeletonText
								{...props}
								startColor={startColor}
								endColor={endColor}
								lines={lines}
								speed={speed}
								isLoaded={isLoaded}
								key={key}
								w={widthPercentage}
							/>
						);
					})}
				</>
			);
		}
		return null;
	}
);

SkeletonText.displayName = 'Skeleton';
