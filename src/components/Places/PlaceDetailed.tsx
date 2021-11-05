//This is where we will be displaying the information of each single place
import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";

export interface PlaceProps {
	place?: string;
	avg?: number;
	address?: string;
	photoref?: string;
	togglePage: () => void;
}

const PlaceDetailed: React.FC<PlaceProps> = ({ togglePage }: PlaceProps) => {
	return <View>Detailed view of any specific location</View>;
};

const styles = StyleSheet.create({
	border: {
		width: Dimensions.get("window").width * 0.9,
		height: Dimensions.get("window").height * 0.9,
		borderWidth: 3,
		borderColor: "black",
	},
});

export default PlaceDetailed;
