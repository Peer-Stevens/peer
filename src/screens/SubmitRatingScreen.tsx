import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { PlaceImage } from "../components/PlaceImage";
import { Button } from "../components/Button";
import {
	S_CANCEL,
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
	getIncrementRatingButtonLabel,
	getPopUpProps,
} from "../util/strings";
import Screen from "../util/screens";
import { Rating } from "../util/ratingTypes";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Place as GooglePlace } from "@googlemaps/google-maps-services-js";
import { SERVER_BASE_URL } from "../util/env";
import { PopUp } from "../components/PopUp";

// Types
export interface SubmitRatingScreenProps {
	placeID?: string;
	placeName?: string;
	photo_reference?: string;
	setPage: (screen: Screen) => void;
	previousRating?: Rating | null;
}

export type fieldInfo = {
	fieldName: string;
	ratingType: "numeric" | "yes/no";
	renderText: string;
	helpText: string;
};

// Constants

export const DEFAULT_INTERIM_RATING = 3;
const DEFAULT_YES_NO_RATING = 0;
const MAX_COUNT = 5;
const MIN_COUNT = 0;
const INCREMENT_VAL = 0.5;

const fieldInfos: fieldInfo[] = [
	{
		fieldName: "guideDogFriendly",
		ratingType: "numeric",
		...S_GUIDE_DOG_FRIENDLINESS,
	},
	{
		fieldName: "noiseLevel",
		ratingType: "numeric",
		...S_NOISE_LEVEL,
	},
	{
		fieldName: "lighting",
		ratingType: "numeric",
		...S_LIGHTING,
	},
	{
		fieldName: "spacing",
		ratingType: "numeric",
		...S_SPACING,
	},
	{
		fieldName: "isMenuAccessible",
		ratingType: "yes/no",
		...S_MENU_ACCESSIBLE,
	},
	{
		fieldName: "isStaffHelpful",
		ratingType: "yes/no",
		...S_STAFF_HELPFULNESS,
	},
	{
		fieldName: "isBathroomOnEntranceFloor",
		ratingType: "yes/no",
		...S_BATHROOM_ENTRANCE_FLOOR,
	},

	{
		fieldName: "isContactlessPaymentOffered",
		ratingType: "yes/no",
		...S_CONTACTLESS_PAYMENT,
	},
	{
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
		isMenuAccessible: 0 | 1 | null;
		noiseLevel: number | null;
		isStaffHelpful: 0 | 1 | null;
		lighting: number | null;
		isBathroomOnEntranceFloor: 0 | 1 | null;
		isContactlessPaymentOffered: 0 | 1 | null;
		isStairsRequired: 0 | 1 | null;
		spacing: number | null;
	},
	previousRating?: Rating | null
) => {
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

const handleSubmitButton = async (
	counter: { [attribute: string]: number },
	placeID: string | undefined
) => {
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

// Components

const RatingCounter: React.FC<{
	field: fieldInfo;
	counter: {
		[attribute: string]: number;
	};
	setCounter: React.Dispatch<
		React.SetStateAction<{
			[attribute: string]: number;
		}>
	>;
	placeName?: string;
}> = ({ field, counter, setCounter, placeName }) => {
	if (field.ratingType === "numeric") {
		const count = counter[field.fieldName];
		return (
			<View>
				<Button
					iconName={"minus"}
					accessibilityLabel={getIncrementRatingButtonLabel(
						true,
						count,
						field.renderText,
						placeName
					)}
					onPress={() => {
						if (count === MIN_COUNT) {
							return;
						}
						setCounter({
							...counter,
							[field.fieldName]: count - INCREMENT_VAL,
						});
					}}
				/>
				<Text>{field.renderText}</Text>
				<PopUp
					accessibilityLabel={getPopUpProps(field.renderText, "buttonAccessibilityLabel")}
					text={getPopUpProps(field.renderText, "text")}
					modalAccessibilityLabel={getPopUpProps(
						field.fieldName,
						"modalAccessibilityLabel"
					)}
					closeButtonAccessibilityLabel={"Close this pop up."}
					closeButtonText={"Close"}
				>
					<Text>{field.helpText}</Text>
				</PopUp>
				<Text>{count}</Text>
				<Button
					iconName={"plus"}
					accessibilityLabel={getIncrementRatingButtonLabel(
						false,
						count,
						field.renderText,
						placeName
					)}
					onPress={() => {
						if (count === MAX_COUNT) {
							return;
						}
						setCounter({
							...counter,
							[field.fieldName]: count + INCREMENT_VAL,
						});
					}}
				/>
			</View>
		);
	} else {
		// TODO
		return null;
	}
};

const SubmitRatingScreen: React.FC<SubmitRatingScreenProps> = ({
	placeID,
	placeName,
	photo_reference,
	setPage,
	previousRating,
}: SubmitRatingScreenProps) => {
	const [counter, setCounter] = useState(
		fieldInfos.reduce<{ [attribute: string]: number }>(function (countersMap, field) {
			if (previousRating) {
				// a little dirty, but we know that it will be a number
				// as all of the keys of attributesMap are the names
				// of the number
				if (field.ratingType === "numeric") {
					countersMap[field.fieldName] =
						(previousRating[field.fieldName] as number) ?? DEFAULT_INTERIM_RATING;
				} /* else field.ratingType === "yes/no" */
				countersMap[field.fieldName] =
					(previousRating[field.fieldName] as number) ?? DEFAULT_YES_NO_RATING;
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
			{fieldInfos.map((field, index) => (
				<RatingCounter
					key={`rating${index}`}
					field={field}
					counter={counter}
					setCounter={setCounter}
					placeName={placeName}
				/>
			))}
			<Button
				text={S_SUBMIT}
				accessibilityLabel={S_SUBMIT}
				onPress={() => handleSubmitButton(counter, placeID)}
			/>
		</ScrollView>
	);
};

export default SubmitRatingScreen;
