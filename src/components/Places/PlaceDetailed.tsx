//This is where we will be displaying the information of each single place
import React from "react";
import { StyleSheet, Dimensions, View, Text, Button } from "react-native";

export interface PlaceProps {
	place?: string;
	avg?: number;
	address?: string;
	photoref?: string;
	togglePage: () => void;
}

const PlaceDetailed: React.FC<PlaceProps> = ({ togglePage }: PlaceProps) => {
	return (
		<View style={styles.border}>
			<Text>Detailed view of any specific location</Text>
			<Button onPress={togglePage} title="Home" />
		</View>
	);
};

const styles = StyleSheet.create({
	border: {
		width: Dimensions.get("window").width * 0.9,
		height: Dimensions.get("window").height * 0.9,
		borderWidth: 3,
		borderColor: "black",
		justifyContent: "center",
	},
	text: {
		textAlign: "center",
	},
});

export default PlaceDetailed;
