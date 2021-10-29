import React from "react";
import { StyleSheet, View } from "react-native";
import type { StyleProp } from "react-native";
import { TEXT_COLOR } from "../util/colors";

import { Button } from "./Button";

export interface StrollButtonProps {
	onStartStrolling: () => void;
	isShowingSelections: boolean;
	setIsShowingSelections: React.Dispatch<React.SetStateAction<boolean>>;
	selections: string[];
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: StyleProp<object>; // may be unsafe, but this is the type provided
	// by Stylesheet documentation:
	// https://reactnative.dev/docs/stylesheet#compose
}

const StrollButton: React.FC<StrollButtonProps> = ({
	onStartStrolling,
	isShowingSelections: isShowingSelections,
	setIsShowingSelections: setIsShowingSelections,
	selections,
	style,
}: StrollButtonProps) => {
	const buildSelectionsText = (selections: string[]) => {
		if (selections.length === 0) return "None";
		let text = "";
		for (const i in selections) {
			text += `${selections[i]} `;
		}
		return text;
	};
	return (
		<View style={styles.buttonGroup}>
			<Button
				style={StyleSheet.compose(styles.strollBtn, style)}
				onPress={onStartStrolling}
				accessibilityLabel="Take a stroll"
				text="Take a stroll"
			/>
			<Button
				style={styles.filterBtn}
				onPress={() => {
					setIsShowingSelections(!isShowingSelections);
				}}
				accessibilityLabel={isShowingSelections ? "Hide selections" : "Show selections"}
				accessibilityHint={`Current selections: ${buildSelectionsText(selections)}`}
				iconName={isShowingSelections ? "chevron-down" : "chevron-up"}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonGroup: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	filterBtn: {
		borderWidth: 3,
		borderColor: TEXT_COLOR,
		color: TEXT_COLOR,
		borderLeftWidth: 3,
		height: "100%",
	},
	strollBtn: {
		borderWidth: 3,
		borderColor: TEXT_COLOR,
		borderRightWidth: 0,
		height: "100%",
	},
});

export default StrollButton;
