import React from "react";
import { View, StyleSheet } from "react-native";
import type { StyleProp } from "react-native";
import { PRIMARY_COLOR, TEXT_COLOR } from "../util/colors";

export interface BoxProps {
	accessibilityLabel: string;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: StyleProp<object>; // TODO: update generic from "object"
}

export const Box : React.FC<BoxProps> = ({ accessibilityLabel, style, children }) => {
	return (
		<View accessibilityLabel={accessibilityLabel} style={StyleSheet.compose(styles.box, style)}>
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