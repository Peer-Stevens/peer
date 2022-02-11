import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import type { StyleProp } from "react-native";
import { TEXT_COLOR } from "../../util/colors";

import { Button } from "../Button";

export interface StrollButtonProps {
	onStartStrolling: () => void;
	isShowingSelections: boolean;
	setIsShowingSelections: React.Dispatch<React.SetStateAction<boolean>>;
	selections: string[];
	style?: StyleProp<ViewStyle>;
}

/**
 * The button group to begin a stroll.
 * Formerly had a filter button as part of the group, but was removed
 * in wake of the decision to focus on showing the user only restaurants.
 *
 * Props:
 * onStartStrolling,
 * isShowingSelections (unused),
 * setIsShowingSelections (unused),
 * selections (unused),
 * style,
 */
const StrollButton: React.FC<StrollButtonProps> = ({
	onStartStrolling,
	style,
}: StrollButtonProps) => {
	return (
		<View style={styles.buttonGroup}>
			<Button
				style={StyleSheet.compose(
					{
						borderWidth: 3,
						borderColor: TEXT_COLOR,
						borderRightWidth: 0,
						height: "100%",
					},
					style
				)}
				onPress={onStartStrolling}
				accessibilityLabel="Take a stroll"
				text="Take a stroll"
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
});

export default StrollButton;
