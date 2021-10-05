import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { DISABLED_COLOR } from "../util/colors";

import { Button } from "./Button";

const StrollButton: React.FC<{ onStartStrolling: () => void }> = ({ onStartStrolling }) => {
	const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);

	return (
		<View style={styles.buttonGroup}>
			<Button
				style={styles.strollBtn}
				onPress={onStartStrolling}
				accessibilityLabel="Take a stroll"
				text="Take a stroll"
			/>
			<Button
				style={styles.filterBtn}
				onPress={() => {
					setIsShowingFilters(!isShowingFilters);
				}}
				accessibilityLabel="Show filters"
				image="chevron"
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
