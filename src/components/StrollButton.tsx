import React from "react";
import { StyleSheet, View } from "react-native";
import type { StyleProp } from "react-native";
import { TEXT_COLOR } from "../util/colors";

import { Button } from "./Button";

export interface StrollButtonProps {
	onStartStrolling: () => void;
	isShowingFilters: boolean;
	setIsShowingFilters: React.Dispatch<React.SetStateAction<boolean>>;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: StyleProp<object>; // may be unsafe, but this is the type provided
	// by Stylesheet documentation:
	// https://reactnative.dev/docs/stylesheet#compose
}

const StrollButton: React.FC<StrollButtonProps> = ({
	onStartStrolling,
	isShowingFilters,
	setIsShowingFilters,
	style,
}: StrollButtonProps) => {
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
					setIsShowingFilters(!isShowingFilters);
				}}
				accessibilityLabel={isShowingFilters ? "Hide filters" : "Show filters"}
				iconName={isShowingFilters ? "chevron-down" : "chevron-up"}
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