import React, { Dispatch, SetStateAction, useMemo } from "react";
import { StyleSheet, Dimensions, View, Text, Pressable } from "react-native";
import { computeDistanceMi } from "../../util/distance";
import { LocationObject } from "expo-location";
import { PlaceImage } from "../PlaceImage";
import axios from "axios";
import { SERVER_BASE_URL } from "../../util/env";
export interface PlaceCardProps {
	placeName?: string;
	photoref?: string;
	location?: LocationObject;
	longitude?: number;
	latitude?: number;
	goToDetails: () => void;
	placeID?: string;
	setPlaceID: Dispatch<SetStateAction<string | undefined>>;
	avgRating?: number;
	isPromoted?: boolean;
	spendAmount?: number;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
	placeName,
	photoref,
	location,
	latitude,
	longitude,
	avgRating,
	placeID,
	goToDetails,
	setPlaceID,
	isPromoted,
	spendAmount,
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

	const recordPromoClick = () => {
		void axios.post<{ error?: string; token?: string }>(
			(SERVER_BASE_URL as string) + "/clickPromo",
			{
				place_id: placeID,
				spend_amount: spendAmount,
			},
			{
				validateStatus: (status: number): boolean => {
					return status < 500;
				},
			}
		);
	};

	const setPageAndDetails = () => {
		if (isPromoted) {
			recordPromoClick();
		}
		goToDetails();
		if (placeID) {
			setPlaceID(placeID);
		}
	};

	const activeStyles = isPromoted ? promoStyles : styles;

	return (
		<Pressable onPress={setPageAndDetails}>
			<View style={activeStyles.card}>
				<View style={activeStyles.alignText}>
					<Text ellipsizeMode="tail" numberOfLines={1} style={activeStyles.title}>
						{placeName}
					</Text>
					<Text
						accessibilityLabel={distanceInMi ? `${distanceInMi} miles away` : ""}
						style={activeStyles.distance}
					>
						{distanceInMi ? `${distanceInMi} mi away` : ""}
					</Text>
					<Text
						ellipsizeMode="tail"
						numberOfLines={1}
						style={activeStyles.promotionLabel}
					>
						{isPromoted && "Promoted"}
					</Text>
					<Text
						adjustsFontSizeToFit={true}
						numberOfLines={2}
						style={activeStyles.cardContent}
						accessibilityLabel={
							avgRating ? `Rating: ${avgRating} out of 5` : "No known ratings"
						}
					>
						Rating: {avgRating || 0}/5
					</Text>
				</View>
				<PlaceImage
					photoref={photoref}
					placeName={placeName}
					style={activeStyles.imageStyle}
				/>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		width: Dimensions.get("window").width * 0.9,
		height: Dimensions.get("window").height * 0.25,
		borderWidth: 3,
		borderColor: "black",
		marginHorizontal: 20,
		marginVertical: 10,
	},
	title: {
		fontFamily: "APHontBold",
		fontSize: 24,
	},
	distance: {
		fontSize: 24,
		fontFamily: "APHont",
	},
	cardContent: {
		fontFamily: "APHont",
		fontSize: 24,
		borderRadius: 20,
		color: "black",
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
	promotionLabel: {
		fontFamily: "APHont",
		fontSize: 24,
		borderRadius: 20,
		color: "black",
	},
});

const promoStyles = StyleSheet.create({
	card: {
		flexDirection: "row",
		width: Dimensions.get("window").width * 0.9,
		height: Dimensions.get("window").height * 0.25,
		borderWidth: 3,
		borderColor: "black",
		backgroundColor: "black",
		marginHorizontal: 20,
		marginVertical: 10,
	},
	title: {
		fontFamily: "APHontBold",
		fontSize: 24,
		color: "white",
	},
	distance: {
		fontSize: 24,
		fontFamily: "APHont",
		color: "white",
	},
	cardContent: {
		fontFamily: "APHont",
		fontSize: 24,
		color: "white",
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
	promotionLabel: {
		fontFamily: "APHont",
		fontSize: 24,
		color: "white",
		textDecorationLine: "underline",
	},
});

export default PlaceCard;
