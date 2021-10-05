import React from "react";
import { View, StyleSheet } from "react-native";
import type { StyleProp } from "react-native";
import { PRIMARY_COLOR, TEXT_COLOR } from "../util/colors";

export interface BoxProps {
	children?: JSX.Element | JSX.Element[] | null;
	accessibilityLabel: string;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: StyleProp<object>;
}

const Box = ({ children, accessibilityLabel, style }: BoxProps): JSX.Element => {
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

export default Box;
