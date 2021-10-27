import { SERVER_BASE_URL } from "@env";
import React from "react";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";
export interface PlaceCardProps {
	place?: string;
	avg: number;
	address?: string;
	photoref?: string;
	accessabilityLabel?: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
	place,
	avg,
	address,
	photoref,
	accessabilityLabel,
}: PlaceCardProps) => {
	return (
		<View style={styles.card}>
			<View style={styles.alignText}>
				<Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
					{place}
				</Text>

				<Text ellipsizeMode="tail" numberOfLines={1} style={styles.cardContent}>
					{address}
				</Text>
				<Text
					adjustsFontSizeToFit={true}
					numberOfLines={2}
					style={styles.cardContent}
					accessibilityLabel={`Rating: ${avg} out of 5`}
				>
					Rating: {avg}/5
				</Text>
			</View>
			<Image
				accessible={true}
				accessibilityLabel={`Image of ${accessabilityLabel}`}
				style={styles.imageStyle}
				source={{ uri: `${SERVER_BASE_URL}/getPlacePhoto/${photoref}` }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		width: Dimensions.get("window").width * 0.9,
		height: Dimensions.get("window").height * 0.25,
		borderWidth: 3,
		borderColor: "black",
		margin: 20,
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
		width: "40%",
		height: "100%",
		alignSelf: "flex-end",
	},
	alignText: {
		flex: 1,
		marginHorizontal: 10,
		justifyContent: "space-around",
	},
});

export default PlaceCard;
