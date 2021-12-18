//This is where we will be displaying the information of each single place
import React from "react";
import { StyleSheet, View, Text, ActivityIndicator, TextProps, ScrollView } from "react-native";
import { computeDistanceMi } from "../util/distance";
import { useLocation } from "../hooks/useLocation";
import { Button } from "../components/Button";
import { PlaceImage } from "../components/PlaceImage";
import { useFetchPlace } from "../hooks/useFetchPlace";

export interface PlaceProps {
	placeID: string;
	setPage: (newPage: string) => void;
}

const BodyText = (props: TextProps) => (
	<Text
		style={{
			fontSize: 30,
			lineHeight: 35,
			marginBottom: 15,
		}}
		{...props}
	/>
);

const DetailedViewScreen: React.FC<PlaceProps> = ({ setPage, placeID }: PlaceProps) => {
	const { placeDetails } = useFetchPlace({ placeID });

	const { location } = useLocation();

	const userCoords = {
		latitude: location?.coords.latitude,
		longitude: location?.coords.longitude,
	};

	if (placeDetails && placeDetails.placeDetails.accessibilityData) {
		const place = placeDetails.placeDetails.result;

		const placeCoord = {
			latitude: place.geometry?.location.lat,
			longitude: place.geometry?.location.lng,
		};
		const placeCoords = { latitude: placeCoord.latitude, longitude: placeCoord.longitude };
		const distanceInMi = computeDistanceMi(userCoords, placeCoords)?.toPrecision(2);

		// TODO: update to use new rating fields
		const { avgBraille, avgFontReadability, avgGuideDogFriendly, avgNavigability } =
			placeDetails.placeDetails.accessibilityData;

		const a11yDataList = [avgBraille, avgFontReadability, avgGuideDogFriendly, avgNavigability];

		return (
			<View style={{ flex: 1 }}>
				<PlaceImage
					photoref={place.photos?.[0]?.photo_reference}
					placeName={place.name}
					style={{
						width: "100%",
						height: "40%",
					}}
				/>
				<View
					style={{
						width: "90%",
						alignSelf: "center",
					}}
				>
					<ScrollView style={{ height: "40%" }}>
						<Text
							ellipsizeMode="tail"
							numberOfLines={2}
							style={{
								fontSize: 35,
								fontWeight: "bold",
							}}
						>
							{place.name}
						</Text>
						<BodyText ellipsizeMode="tail" numberOfLines={2}>
							{place.formatted_address}
						</BodyText>
						<BodyText
							accessibilityLabel={distanceInMi ? `${distanceInMi} miles away` : ""}
						>
							{distanceInMi ? `${distanceInMi} mi away` : ""}
						</BodyText>
						{[
							"Navigability",
							"Sensory Aids",
							"Staff Helpfulness",
							"Guide Dog Friendliness",
						].map((value, index) => {
							return (
								<View key={`rating${index}`}>
									<Text
										style={{
											fontSize: 30,
											lineHeight: 35,
											marginBottom: 15,
											alignSelf: "center",
										}}
									>
										{value}
									</Text>
									<Text
										style={{
											fontSize: 30,
											lineHeight: 35,
											marginBottom: 15,
											alignSelf: "center",
											fontWeight: "bold",
										}}
									>
										{a11yDataList[index]}
									</Text>
								</View>
							);
						})}
					</ScrollView>
					<Button
						style={styles.button}
						onPress={() => {
							//placeholder
						}}
						//onPress={() => setPage("login")} need to update this after Eleni's PR is merged w/ Andrew's updates to nav
						accessibilityLabel="Submit an accessibility rating"
						text="Submit a Rating"
					/>
					<Button
						style={styles.button}
						onPress={() => setPage("mapScreen")} //need to update this after Eleni's PR is merged w/ Andrew's updates to nav
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
					height: "100%",
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
	button: {
		width: "100%",
		marginBottom: 10,
	},
});

export default DetailedViewScreen;
