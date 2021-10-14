import React from "react";
import { View, StyleSheet } from "react-native";
import type { StyleProp } from "react-native";
import { PRIMARY_COLOR, TEXT_COLOR } from "../util/colors";

export interface BoxProps {
	accessibilityLabel: string;
	accessibilityHint?: string;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: StyleProp<object>; // TODO: update generic from "object"
}

export const Box : React.FC<BoxProps> = ({ accessibilityLabel, accessibilityHint, style, children }) => {
	return (
		<View accessibilityLabel={accessibilityLabel} accessibilityHint={accessibilityHint} style={StyleSheet.compose(styles.box, style)}>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	box: {
		backgroundColor: PRIMARY_COLOR,
		color: TEXT_COLOR,
	},
});