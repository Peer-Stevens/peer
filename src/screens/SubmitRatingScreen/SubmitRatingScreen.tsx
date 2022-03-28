import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions } from "react-native";
import { PlaceImage } from "../../components/PlaceImage";
import { Button } from "../../components/Button";
import {
	S_SUBMIT,
	S_GUIDE_DOG_FRIENDLINESS,
	S_NOISE_LEVEL,
	S_LIGHTING,
	S_SPACING,
	S_MENU_ACCESSIBLE,
	S_STAFF_HELPFULNESS,
	S_CONTACTLESS_PAYMENT,
	S_BATHROOM_ENTRANCE_FLOOR,
	S_STAIRS_REQUIRED,
	S_GOBACK,
} from "../../util/strings";
import Screen from "../../util/screens";
import { buildRatingValuesDial, Rating, ratingToIndex } from "../../util/ratingTypes";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Place as GooglePlace } from "@googlemaps/google-maps-services-js";
import { SERVER_BASE_URL } from "../../util/env";
import { YesNoRating } from "peer-types";
import RatingCounter from "./RatingCounter";
import BoundedDial from "../../util/boundedDial";

// Types
export interface SubmitRatingScreenProps {
	placeID?: string;
	placeName?: string;
	photo_reference?: string;
	setPage: (screen: Screen) => void;
	previousRating?: Rating | null;
}

export type FieldInfo = {
	avgFieldName: string;
	fieldName: string;
	ratingType: "numeric" | "yes/no";
	renderText: string;
	helpText: string;
};

// Constants

export const DEFAULT_INTERIM_RATING = null;
const DEFAULT_YES_NO_RATING = 0;

export const fieldInfos: FieldInfo[] = [
	{
		avgFieldName: "guideDogAvg",
		fieldName: "guideDogFriendly",
		ratingType: "numeric",
		...S_GUIDE_DOG_FRIENDLINESS,
	},
	{
		avgFieldName: "noiseLevelAvg",
		fieldName: "noiseLevel",
		ratingType: "numeric",
		...S_NOISE_LEVEL,
	},
	{
		avgFieldName: "lightingAvg",
		fieldName: "lighting",
		ratingType: "numeric",
		...S_LIGHTING,
	},
	{
		avgFieldName: "spacingAvg",
		fieldName: "spacing",
		ratingType: "numeric",
		...S_SPACING,
	},
	{
		avgFieldName: "isMenuAccessibleAvg",
		fieldName: "isMenuAccessible",
		ratingType: "yes/no",
		...S_MENU_ACCESSIBLE,
	},
	{
		avgFieldName: "isStaffHelpfulAvg",
		fieldName: "isStaffHelpful",
		ratingType: "yes/no",
		...S_STAFF_HELPFULNESS,
	},
	{
		avgFieldName: "isBathroomOnEntranceFloorAvg",
		fieldName: "isBathroomOnEntranceFloor",
		ratingType: "yes/no",
		...S_BATHROOM_ENTRANCE_FLOOR,
	},

	{
		avgFieldName: "isContactlessPaymentOfferedAvg",
		fieldName: "isContactlessPaymentOffered",
		ratingType: "yes/no",
		...S_CONTACTLESS_PAYMENT,
	},
	{
		avgFieldName: "isStairsRequiredAvg",
		fieldName: "isStairsRequired",
		ratingType: "yes/no",
		...S_STAIRS_REQUIRED,
	},
];

// Functions

const submitRating = async (
	request_body: {
		email: string | null;
		token: string | null;
		placeID: GooglePlace["place_id"];
		guideDogFriendly: number | null;
		isMenuAccessible: YesNoRating;
		noiseLevel: number | null;
		isStaffHelpful: YesNoRating;
		lighting: number | null;
		isBathroomOnEntranceFloor: YesNoRating;
		isContactlessPaymentOffered: YesNoRating;
		isStairsRequired: YesNoRating;
		spacing: number | null;
	},
	previousRating?: Rating | null
) => {
	if (!request_body.email || !request_body.token) {
		// there is some sort of invalid state here, not sure if
		// throwing an error is appropriate though
		return;
	}

	if (previousRating) {
		await axios.post(`${SERVER_BASE_URL}/editRating`, request_body);
	} else {
		/* else, no previous rating has been made on this place by this user */
		await axios.post(`${SERVER_BASE_URL}/addRatingtoPlace`, request_body);
	}
};

const handleSubmitButton = async (
	counter: { [attribute: string]: BoundedDial<{ value: number | null; text: string }> },
	yesNoCounter: { [attribute: string]: YesNoRating },
	placeID: string | undefined
) => {
	const email = await AsyncStorage.getItem("@email");
	const token = await AsyncStorage.getItem("@auth_token");
	const ratingToSubmit: Parameters<typeof submitRating>[0] = {
		email: email,
		token: token,
		placeID: placeID,
		guideDogFriendly: counter.guideDogFriendly.current().value,
		isMenuAccessible: yesNoCounter.isMenuAccessible,
		noiseLevel: counter.noiseLevel.current().value,
		isStaffHelpful: yesNoCounter.isStaffHelpful,
		isBathroomOnEntranceFloor: yesNoCounter.isBathroomOnEntranceFloor,
		isContactlessPaymentOffered: yesNoCounter.isContactlessPaymentOffered,
		lighting: counter.lighting.current().value,
		isStairsRequired: yesNoCounter.isStairsRequired,
		spacing: counter.spacing.current().value,
	};
	await submitRating(ratingToSubmit);
};

const SubmitRatingScreen: React.FC<SubmitRatingScreenProps> = ({
	placeID,
	placeName,
	photo_reference,
	setPage,
	previousRating,
}: SubmitRatingScreenProps) => {
	const [counter, setCounter] = useState(
		fieldInfos.reduce<{
			[attribute: string]: BoundedDial<{ value: number | null; text: string }>;
		}>(function (countersMap, field) {
			if (field.ratingType === "numeric") {
				if (previousRating && previousRating[field.fieldName]) {
					countersMap[field.fieldName] = buildRatingValuesDial(
						ratingToIndex(previousRating[field.fieldName] as number)
					);
				} else {
					countersMap[field.fieldName] = buildRatingValuesDial(
						ratingToIndex(DEFAULT_INTERIM_RATING)
					);
				}
			}
			return countersMap;
		}, {})
	);

	const [yesNoCounter, setYesNoCounter] = useState(
		fieldInfos.reduce<{ [attribute: string]: YesNoRating }>(function (countersMap, field) {
			if (field.ratingType === "yes/no") {
				if (previousRating && previousRating[field.fieldName]) {
					countersMap[field.fieldName] = previousRating[field.fieldName] as YesNoRating;
				} else {
					countersMap[field.fieldName] = DEFAULT_YES_NO_RATING;
				}
			}
			return countersMap;
		}, {})
	);

	return (
		<ScrollView>
			<PlaceImage
				photoref={photo_reference}
				placeName={placeName}
				style={{
					width: "100%",
					height: 0.4 * Dimensions.get("window").height,
				}}
			/>
			<View style={styles.nameAndCancel}>
				<View style={{ width: "50%" }}>
					<Text adjustsFontSizeToFit={true} numberOfLines={2} style={styles.placeName}>
						{placeName}
					</Text>
				</View>
				<View>
					<Button
						text={S_GOBACK}
						accessibilityLabel={S_GOBACK}
						onPress={() => {
							setPage(Screen.Details);
						}}
					/>
				</View>
			</View>
			{fieldInfos.map((field, index) => (
				<RatingCounter
					key={`rating${index}`}
					field={field}
					counter={counter}
					setCounter={setCounter}
					yesNoCounter={yesNoCounter}
					setYesNoCounter={setYesNoCounter}
					placeName={placeName}
				/>
			))}
			<View
				style={{
					alignSelf: "center",
					marginTop: 10,
					marginBottom: 30,
					width: "90%",
				}}
			>
				<Button
					text={S_SUBMIT}
					accessibilityLabel={S_SUBMIT}
					onPress={() => void handleSubmitButton(counter, yesNoCounter, placeID)}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	nameAndCancel: {
		flexDirection: "row",
		marginTop: 5,
		marginBottom: 10,
		marginHorizontal: 20,
		justifyContent: "space-between",
		alignItems: "center",
		width: "90%",
	},
	placeName: {
		fontSize: 30,
		width: "100%",
		fontFamily: "APHontBold",
	},
});

export default SubmitRatingScreen;
