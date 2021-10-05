import React, { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { PRIMARY_COLOR, PRIMARY_LIGHT, TEXT_COLOR } from "../util/colors";

export interface ButtonProps {
	text?: string;
	image?: string;
	accessibilityLabel: string; // not optional for this project.
	onPress: VoidFunction;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: object; // may be unsafe, but this is the type provided
	// by Stylesheet documentation:
	// https://reactnative.dev/docs/stylesheet#compose
}

/**
 * Peer-styled button element.
 */
export const Button: React.FC<ButtonProps> = ({
	text,
	image,
	accessibilityLabel,
	onPress,
	style,
	children,
}) => {
	const [color, setColor] = useState<string>(PRIMARY_COLOR);

	const styles = StyleSheet.create({
		button: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			paddingHorizontal: 15,
			paddingVertical: 10,
			backgroundColor: color,
		},
	});

	// chooses one to display, favoring top most prop

	let display: React.ReactNode;

	if (text) {
		display = (
			<Text style={{ fontWeight: "bold", color: TEXT_COLOR, fontSize: 30 }}>{text}</Text>
		);
	} else if (image) {
		switch (image) {
			case "chevron":
				display = <Icon name="chevron-up" color={PRIMARY_LIGHT} size={30} />;
				break;
			default:
				throw new Error("passed image file name is not available for this component");
		}
	} else if (children) {
		display = children;
	}

	return (
		<Pressable
			onPress={() => {
				onPress();
				setColor(PRIMARY_COLOR);
			}}
			onPressIn={() => setColor(PRIMARY_LIGHT)}
			onPressOut={() => setColor(PRIMARY_COLOR)}
			style={StyleSheet.compose(styles.button, style)}
			accessibilityLabel={accessibilityLabel}
		>
			<View>{display}</View>
		</Pressable>
	);
};
