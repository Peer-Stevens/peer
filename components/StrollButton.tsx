import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { DISABLED_COLOR } from "../util/colors";

import * as Peer from "./Peer/lib";

export interface StrollButtonProps {
	isShowingFilters : boolean
	setIsShowingFilters: React.Dispatch<React.SetStateAction<boolean>>
}

const onPressStartStrolling = (): void => {
	//TODO: change state to strolling
};

const StrollButton = ({isShowingFilters, setIsShowingFilters}: StrollButtonProps): JSX.Element => {
	return (
		<View style={styles.buttonGroup}>
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
		position: "absolute",
		bottom: 75,
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
