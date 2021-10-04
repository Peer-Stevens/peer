import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

export interface NearbyListProps {
	style?: any;
}

const NearbyList = ({ style }: NearbyListProps): JSX.Element => {
	return (
		<ScrollView style={StyleSheet.compose(styles.container, style)}>
			{/* I added this many for testing purposes....delete this later.... */}
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
			<Text style={styles.text}>Hi</Text>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	text: {
		backgroundColor: "#fff",
		textAlign: "center",
		fontSize: 30,
	},
});

export default NearbyList;
