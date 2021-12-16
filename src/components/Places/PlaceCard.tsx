import React, { Dispatch, SetStateAction, useMemo } from "react";
import { StyleSheet, Dimensions, View, Text, Pressable } from "react-native";
import { computeDistanceMi } from "../../util/distance";
import { LocationObject } from "expo-location";
import { PlaceImage } from "../PlaceImage";
export interface PlaceCardProps {
	placeName?: string;
	address?: string;
	photoref?: string;
	location?: LocationObject;
	longitude?: number;
	latitude?: number;
	goToDetails: () => void;
	placeID?: string;
	setPlaceID: Dispatch<SetStateAction<string | undefined>>;
	avgRating?: number;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
	placeName,
	address,
	photoref,
	location,
	latitude,
	longitude,
	avgRating,
	placeID,
	goToDetails,
	setPlaceID,
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

	const setPageAndDetails = () => {
		goToDetails();
		if (placeID) {
			setPlaceID(placeID);
		}
	};

	return (
		<View style={styles.card}>
			<View style={styles.alignText}>
				<Pressable onPress={setPageAndDetails}>
					<Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
						{placeName}
					</Text>
				</Pressable>
				<Pressable onPress={setPageAndDetails}>
					<Text
						accessibilityLabel={distanceInMi ? `${distanceInMi} miles away` : ""}
						style={{ fontSize: 25, fontFamily: "APHont" }}
					>
						{distanceInMi ? `${distanceInMi} mi away` : ""}
					</Text>
				</Pressable>
				<Pressable onPress={setPageAndDetails}>
					<Text ellipsizeMode="tail" numberOfLines={1} style={styles.cardContent}>
						{address}
					</Text>
				</Pressable>
				<Pressable onPress={setPageAndDetails}>
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
				</Pressable>
			</View>
			<PlaceImage photoref={photoref} placeName={placeName} style={styles.imageStyle} />
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
		fontFamily: "APHontBold",
		fontSize: 30,
		borderRadius: 20,
	},
	cardContent: {
		fontFamily: "APHont",
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
