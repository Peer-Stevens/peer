import React from "react";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";

export interface PlaceCardProps {
	place: string;
	avg: number;
	address: string;
	img: string;
	accessabilityLabel: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
	place,
	avg,
	address,
	//img,
	accessabilityLabel,
}: PlaceCardProps) => {
	return (
		<View style={styles.card}>
			<View style={styles.alignText}>
				<Text style={styles.title}>{place}</Text>

				<View style={{ borderBottomColor: "black", borderBottomWidth: 2 }} />

				<Text style={styles.cardContent}>{address}</Text>
				<Text style={styles.cardContent}>Rating: {avg}</Text>
			</View>
			<View
				accessible={true}
				accessibilityLabel={`Image of ${accessabilityLabel}`}
				style={styles.imagePosition}
			>
				<Image
					style={styles.imageStyle}
					source={require("../../../assets/restaurant.jpg")}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		width: Dimensions.get("window").width - 55,
		height: Dimensions.get("window").height / 6,
		borderWidth: 3,
		borderColor: "black",
		borderRadius: 20,
		margin: 15,
	},
	title: {
		fontWeight: "bold",
		fontSize: 30,
		borderRadius: 20,
	},
	cardContent: {
		fontSize: 30,
		borderRadius: 20,
	},
	imageStyle: {
		height: Dimensions.get("window").height / 6,
		width: Dimensions.get("window").width - 300,
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20,
	},
	alignText: {
		flex: 2,
	},
	imagePosition: {
		flex: 1,
		alignSelf: "center",
	},
});

export default PlaceCard;
