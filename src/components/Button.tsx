import React, { useState } from "react";
import { Pressable, StyleSheet, View, Text, ViewStyle, TextStyle } from "react-native";
import type { StyleProp } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { PRIMARY_COLOR, TEXT_COLOR } from "../util/colors";

export interface ButtonProps {
	text?: string;
	iconName?: string;
	accessibilityLabel: string; // not optional for this project.
	accessibilityHint?: string;
	onPress: VoidFunction;
	style?: StyleProp<ViewStyle>;
}

/**
 * Peer-styled button element.
 */
export const Button: React.FC<ButtonProps> = ({
	text,
	iconName: image,
	accessibilityLabel,
	accessibilityHint,
	onPress,
	style,
	children,
}) => {
	const [color, setColor] = useState<string>(PRIMARY_COLOR);
	const [textColor, setTextColor] = useState<string>(TEXT_COLOR);

	const buttonStyle: ViewStyle = {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 15,
		paddingVertical: 10,
		backgroundColor: color,
		borderWidth: 3,
		borderColor: textColor,
	};

	// chooses one to display, favoring top most prop

	let display: React.ReactNode;

	if (text) {
		display = (
			<Text
				style={{
					color: textColor,
					fontSize: 30,
					fontFamily: "APHontBold",
				}}
			>
				{text}
			</Text>
		);
	} else if (image) {
		display = <Icon name={image} color={textColor} size={30} />;
	} else if (children) {
		display = children;
	}

	return (
		<Pressable
			onPress={() => {
				onPress();
				setColor(PRIMARY_COLOR);
			}}
			onPressIn={() => {
				setColor(TEXT_COLOR);
				setTextColor(PRIMARY_COLOR);
			}}
			onPressOut={() => {
				setColor(PRIMARY_COLOR);
				setTextColor(TEXT_COLOR);
			}}
			style={StyleSheet.compose(buttonStyle, style)}
			accessibilityLabel={accessibilityLabel}
			accessibilityHint={accessibilityHint}
		>
			<View>{display}</View>
		</Pressable>
	);
};
