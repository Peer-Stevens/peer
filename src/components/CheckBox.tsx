import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { StyleProp } from "react-native";
import CB from "@react-native-community/checkbox";
import { TEXT_COLOR } from "../util/colors";

export interface CheckBoxProps {
	value: boolean;
	onValueChange: VoidFunction;
	text: string;
	accessibilityLabel: string;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style: StyleProp<object>; // TODO: update generic from "object"
}

export const CheckBox : React.FC<CheckBoxProps> = ({
	value,
	onValueChange,
	text,
	accessibilityLabel,
	style,
}): JSX.Element => {
	return (
		<View
			style={StyleSheet.compose(styles.container, style)}
			accessibilityLabel={accessibilityLabel}
		>
			<CB value={value} onValueChange={onValueChange} />
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
