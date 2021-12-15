import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import type { StyleProp } from "react-native";
import { PRIMARY_COLOR } from "../util/colors";

export interface BoxProps {
	accessibilityLabel: string;
	accessibilityHint?: string;
	style?: StyleProp<ViewStyle>;
}

export const Box: React.FC<BoxProps> = ({
	accessibilityLabel,
	accessibilityHint,
	style,
	children,
}) => {
	return (
		<View
			accessibilityLabel={accessibilityLabel}
			accessibilityHint={accessibilityHint}
			style={StyleSheet.compose(
				{
					backgroundColor: PRIMARY_COLOR,
				},
				style
			)}
		>
			{children}
		</View>
	);
};
