import React from "react";
import { StyleSheet, View, Text } from "react-native";

export interface NearbyListProps {
	style?: any;
}

const NearbyList = ({ style }: NearbyListProps): JSX.Element => {
	return (
		<View style={StyleSheet.compose(styles.container, style)}>
			<Text style={styles.text}>Hi</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		// textAlignVertical: "top",
	},
	text: {
		backgroundColor: "#fff",
		// textAlignVertical: "bottom",
		textAlign: "center",
		fontSize: 30,
	},
});

export default NearbyList;
