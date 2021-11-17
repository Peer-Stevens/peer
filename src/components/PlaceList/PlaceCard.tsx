import React, { useMemo } from "react";
import { StyleSheet, Dimensions, View, Text, Image, ImageSourcePropType } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TEXT_COLOR } from "../../util/colors";
import PeerIcon from "../../../assets/icon.png";
import { SERVER_BASE_URL } from "../../util/env";
import { computeDistanceMi } from "../../util/distance";
import { LocationObject } from "expo-location";
export interface PlaceCardProps {
	place?: string;
	address?: string;
	photoref?: string;
	location?: LocationObject;
	longitude?: number;
	latitude?: number;
	avgRating?: number;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
	place,
	address,
	photoref,
	location,
	latitude,
	longitude,
	avgRating,
}: PlaceCardProps) => {
	const userCoords = {
		latitude: location?.coords.latitude,
		longitude: location?.coords.longitude,
	};
	const placeCoords = { latitude: latitude, longitude: longitude };
	const distanceInMi = useMemo<string | undefined>(
		() => computeDistanceMi(userCoords, placeCoords)?.toPrecision(2),
		[userCoords, placeCoords]
	);

	// prevent calls to remote server during testing
	let imageSrc: ImageSourcePropType;
	if (photoref && process.env.NODE_ENV !== "test") {
		imageSrc = { uri: `${SERVER_BASE_URL}/getPlacePhoto/${photoref}` };
	} else {
		imageSrc = PeerIcon;
	}

	const image = photoref ? (
		<Image
			accessible={true}
			accessibilityLabel={place ? `Image of ${place}` : ""}
			style={styles.imageStyle}
			source={imageSrc}
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
				<Text
					accessibilityLabel={distanceInMi ? `${distanceInMi} miles away` : ""}
					style={{ fontSize: 25 }}
				>
					{distanceInMi ? `${distanceInMi} mi away` : ""}
				</Text>
				<Text ellipsizeMode="tail" numberOfLines={1} style={styles.cardContent}>
					{address}
				</Text>
				<Text
					adjustsFontSizeToFit={true}
					numberOfLines={2}
					style={styles.cardContent}
					accessibilityLabel={
						avgRating ? `Rating: ${avgRating} out of 5` : "No known ratings"
					}
				>
					Rating: {avgRating || 0}/5
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
