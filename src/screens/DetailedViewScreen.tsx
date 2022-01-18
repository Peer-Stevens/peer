//This is where we will be displaying the information of each single place
import React from "react";
import { StyleSheet, Dimensions, View, Text, ActivityIndicator, TextProps } from "react-native";
import { computeDistanceMi } from "../util/distance";
import { useLocation } from "../hooks/useLocation";
import { Button } from "../components/Button";
import { TEXT_COLOR } from "../util/colors";
import { PlaceImage } from "../components/PlaceImage";
import { getAverageA11yRating } from "../util/processA11yRatings";
import { PlaceDetailsWithAccesibilityData } from "../util/placeTypes";

export interface PlaceProps {
	placeID: string;
	goToMapScreen: () => void;
	goToSubmitRatingScreen: () => void;
	placeDetails?: { placeDetails: PlaceDetailsWithAccesibilityData } | undefined;
}

const BodyText = (props: TextProps) => <Text style={styles.text} {...props} />;

const DetailedViewScreen: React.FC<PlaceProps> = ({
	goToMapScreen,
	goToSubmitRatingScreen,
	placeDetails,
}: PlaceProps) => {
	const { location } = useLocation();

	const userCoords = {
		latitude: location?.coords.latitude,
		longitude: location?.coords.longitude,
	};

	if (placeDetails) {
		const place = placeDetails.placeDetails.result;

		const placeCoord = {
			latitude: place.geometry?.location.lat,
			longitude: place.geometry?.location.lng,
		};
		const placeCoords = { latitude: placeCoord.latitude, longitude: placeCoord.longitude };
		const distanceInMi = computeDistanceMi(userCoords, placeCoords)?.toPrecision(2);

		return (
			<View style={styles.border}>
				<PlaceImage
					photoref={place.photos?.[0]?.photo_reference}
					placeName={place.name}
					style={{
						width: "100%",
						height: "40%",
					}}
				/>
				<View style={styles.content}>
					<Text ellipsizeMode="tail" numberOfLines={2} style={styles.title}>
						{place.name}
					</Text>
					<BodyText ellipsizeMode="tail" numberOfLines={2}>
						{place.formatted_address}
					</BodyText>
					<BodyText accessibilityLabel={distanceInMi ? `${distanceInMi} miles away` : ""}>
						{distanceInMi ? `${distanceInMi} mi away` : ""}
					</BodyText>
					<BodyText>
						{Math.round(
							getAverageA11yRating({
								accessibilityData: placeDetails.placeDetails.accessibilityData,
							}) * 2
						) / 2}
					</BodyText>
					<Button
						style={styles.submitButton}
						onPress={() => goToSubmitRatingScreen()}
						//onPress={() => setPage("login")} need to update this after Eleni's PR is merged w/ Andrew's updates to nav
						accessibilityLabel="Submit an accessibility rating"
						text="Submit a Rating"
					/>
					<Button
						style={styles.homeBtn}
						onPress={() => goToMapScreen()}
						accessibilityLabel="Return to Home Page"
						text="Go Home"
					/>
				</View>
			</View>
		);
	} else {
		return (
			<View
				style={{
					height: Dimensions.get("window").height,
					display: "flex",
					justifyContent: "center",
				}}
			>
				<ActivityIndicator size="large" color="#000000" />
			</View>
		);
	}
};

const styles = StyleSheet.create({
	border: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		borderColor: "black",
		borderWidth: 1,
	},
	content: {
		width: Dimensions.get("window").width * 0.95,
		marginLeft: Dimensions.get("window").width * 0.025,
	},
	title: {
		fontSize: 35,
		fontWeight: "bold",
	},
	text: {
		fontSize: 30,
		lineHeight: 35,
		marginBottom: 15,
	},
	homeBtn: {
		borderWidth: 3,
		borderColor: TEXT_COLOR,
		width: Dimensions.get("window").width * 0.9,
	},
	submitButton: {
		borderWidth: 3,
		borderColor: TEXT_COLOR,
		width: Dimensions.get("window").width * 0.9,
		marginBottom: 10,
	},
});

export default DetailedViewScreen;
