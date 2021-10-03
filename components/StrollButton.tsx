import React from "react";
import { StyleSheet, View } from "react-native";
import { DISABLED_COLOR } from "../util/colors";

import * as Peer from "./Peer/lib";

export interface StrollButtonProps {
	isShowingFilters: boolean;
	setIsShowingFilters: React.Dispatch<React.SetStateAction<boolean>>;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: object; // may be unsafe, but this is the type provided
	// by Stylesheet documentation:
	// https://reactnative.dev/docs/stylesheet#compose
}

const onPressStartStrolling = (): void => {
	//TODO: change state to strolling
};

const StrollButton = ({
	isShowingFilters,
	setIsShowingFilters,
	style,
}: StrollButtonProps): JSX.Element => {
	return (
		<View style={StyleSheet.compose(styles.buttonGroup, style)}>
			<Peer.Button
				style={styles.strollBtn}
				onPress={onPressStartStrolling}
				accessibilityLabel="Take a stroll"
				text="Take a stroll"
			/>
			<Peer.Button
				style={styles.filterBtn}
				onPress={() => {
					setIsShowingFilters(!isShowingFilters);
				}}
				accessibilityLabel="Show filters"
				image={isShowingFilters ? "chevron-down" : "chevron-up"}
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
		borderLeftWidth: StyleSheet.hairlineWidth,
		borderLeftColor: DISABLED_COLOR,
		height: "100%",
	},
	strollBtn: {
		height: "100%",
	},
});

export default StrollButton;
