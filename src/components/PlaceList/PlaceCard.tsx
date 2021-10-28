import { SERVER_BASE_URL } from "@env";
import React from "react";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TEXT_COLOR } from "../../util/colors";
export interface PlaceCardProps {
	place?: string;
	avg: number;
	address?: string;
	photoref?: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, avg, address, photoref }: PlaceCardProps) => {
	const image = photoref ? (
		<Image
			accessible={true}
			accessibilityLabel={place ? `Image of ${place}` : ""}
			style={styles.imageStyle}
			source={{ uri: `${SERVER_BASE_URL}/getPlacePhoto/${photoref}` }}
		/>
	) : (
		<Icon
			name={"camera-off"}
			color={TEXT_COLOR}
			size={100}
			style={{ alignSelf: "center", marginHorizontal: 30 }}
			accessibilityLabel={place ? `No image available for ${place}` : "No image available"}
		/>
	);
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
			{image}
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
