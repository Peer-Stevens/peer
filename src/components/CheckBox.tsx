import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { StyleProp } from "react-native";
import * as CB from "@react-native-community/checkbox";
import { TEXT_COLOR } from "../util/colors";

export interface CheckBoxProps {
	value: boolean;
	onValueChange: VoidFunction;
	text: string;
	accessibilityLabel: string;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style: StyleProp<object>;
}

const CheckBox = ({
	value,
	onValueChange,
	text,
	accessibilityLabel,
	style,
}: CheckBoxProps): JSX.Element => {
	return (
		<View
			style={StyleSheet.compose(styles.container, style)}
			accessibilityLabel={accessibilityLabel}
		>
			<CB.default value={value} onValueChange={onValueChange} />
			<Text style={styles.text} accessibilityLabel={accessibilityLabel}>
				{text}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		color: TEXT_COLOR,
		fontWeight: "bold",
	},
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		margin: 5,
	},
});

export default CheckBox;
