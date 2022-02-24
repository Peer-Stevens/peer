import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { PlaceImage } from "../components/PlaceImage";
import { Button } from "../components/Button";
import {
	S_CANCEL,
	getIncrementRatingButtonLabel,
	PLACE_ATTRIBUTES,
	S_SUBMIT,
	getPopUpProps,
} from "../util/strings";
import Screen from "../util/screens";
import { Rating } from "../util/ratingTypes";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Place as GooglePlace } from "@googlemaps/google-maps-services-js";
import { SERVER_BASE_URL } from "../util/env";
import { PopUp } from "../components/PopUp";

export interface SubmitRatingScreenProps {
	placeID?: string;
	placeName?: string;
	photo_reference?: string;
	setPage: (screen: Screen) => void;
	previousRating?: Rating | null;
}

export const DEFAULT_INTERIM_RATING = 3;
const MAX_COUNT = 5;
const MIN_COUNT = 0;
const INCREMENT_VAL = 0.5;

// key is name of attribute as we would like it rendered
// value is name of field in the Rating type
const attributesMap: Record<string, string> = {
	"Navigability": "navigability",
	"Sensory Aids": "braille", // TODO: change braille to sensory aids
	"Staff Helpfulness": "staffHelpfulness",
	"Guide Dog Friendliness": "guideDogFriendly",
};

const SubmitRatingScreen: React.FC<SubmitRatingScreenProps> = ({
	placeID,
	placeName,
	photo_reference,
	setPage,
	previousRating,
}: SubmitRatingScreenProps) => {
	const submitRating = async (request_body: {
		email: string | null;
		token: string | null;
		placeID: GooglePlace["place_id"];
		guideDogFriendly: number | null;
		isMenuAccessible: 0 | 1 | null;
		noiseLevel: number | null;
		isStaffHelpful: 0 | 1 | null;
		lighting: number | null;
		isBathroomOnEntranceFloor: 0 | 1 | null;
		isContactlessPaymentOffered: 0 | 1 | null;
		isStairsRequired: 0 | 1 | null;
		spacing: number | null;
	}) => {
		if (!request_body.email || !request_body.token) {
			// there is some sort of invalid state here, not sure if
			// throw error is appropritate though
			return;
		}

		if (previousRating) {
			await axios.post(`${SERVER_BASE_URL}/editRating`, request_body);
		} /* else no previous rating has been made on this place by this user */
		await axios.post(`${SERVER_BASE_URL}/addRatingtoPlace`, request_body);
	};

	const handleSubmitButton = async () => {
		const email = await AsyncStorage.getItem("@email");
		const token = await AsyncStorage.getItem("@auth_token");
		// TODO: change "0" to user input
		const ratingToSubmit: Parameters<typeof submitRating>[0] = {
			email: email,
			token: token,
			placeID: placeID,
			guideDogFriendly: counter.guideDogFriendly,
			isMenuAccessible: 0,
			noiseLevel: counter.noiseLevel,
			isStaffHelpful: 0,
			isBathroomOnEntranceFloor: 0,
			isContactlessPaymentOffered: 0,
			lighting: counter.lighting,
			isStairsRequired: 0,
			spacing: counter.spacing,
		};
		await submitRating(ratingToSubmit);
	};

	const [counter, setCounter] = useState(
		PLACE_ATTRIBUTES.reduce<{ [attribute: string]: number }>(function (countersMap, attribute) {
			if (previousRating) {
				// a little dirty, but we know that it will be a number
				// as all of the keys of attributesMap are the names
				// of the number
				countersMap[attribute.type] =
					(previousRating[attributesMap[attribute.type]] as number) ??
					DEFAULT_INTERIM_RATING;
			}
			return countersMap;
		}, {})
	);

	return (
		<ScrollView>
			<PlaceImage photoref={photo_reference} placeName={placeName} />
			<Text>{placeName}</Text>
			<Button
				text={S_CANCEL}
				accessibilityLabel={S_CANCEL}
				onPress={() => {
					setPage(Screen.Details);
				}}
			/>
			{PLACE_ATTRIBUTES.map((attribute, index) => {
				const count = counter[attribute.type];

				return (
					<View key={`rating${index}`}>
						<Button
							iconName={"minus"}
							accessibilityLabel={getIncrementRatingButtonLabel(
								true,
								count,
								attribute.type,
								placeName
							)}
							onPress={() => {
								if (count === MIN_COUNT) {
									return;
								}
								setCounter({
									...counter,
									[attribute.type]: count - INCREMENT_VAL,
								});
							}}
						/>
						<Text>{attribute.type}</Text>
						<PopUp
							accessibilityLabel={getPopUpProps(
								attribute.type,
								"buttonAccessibilityLabel"
							)}
							text={getPopUpProps(attribute.type, "text")}
							modalAccessibilityLabel={getPopUpProps(
								attribute.type,
								"modalAccessibilityLabel"
							)}
							closeButtonAccessibilityLabel={"Close this pop up."}
							closeButtonText={"Close"}
						>
							<Text>{attribute.helpText}</Text>
						</PopUp>
						<Text>{count}</Text>
						<Button
							iconName={"plus"}
							accessibilityLabel={getIncrementRatingButtonLabel(
								false,
								count,
								attribute.type,
								placeName
							)}
							onPress={() => {
								if (count === MAX_COUNT) {
									return;
								}
								setCounter({
									...counter,
									[attribute.type]: count + INCREMENT_VAL,
								});
							}}
						/>
					</View>
				);
			})}
			<Button text={S_SUBMIT} accessibilityLabel={S_SUBMIT} onPress={handleSubmitButton} />
		</ScrollView>
	);
};

export default SubmitRatingScreen;
