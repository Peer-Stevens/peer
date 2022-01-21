import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { PlaceImage } from "../components/PlaceImage";
import { Button } from "../components/Button";
import { CANCEL, getIncrementRatingButtonLabel, PLACE_ATTRIBUTES, SUBMIT } from "../util/strings";

export interface SubmitRatingScreenProps {
	placeID?: string;
	placeName?: string;
	photo_reference?: string;
}

export const DEFAULT_INTERIM_RATING = 3;
const MAX_COUNT = 5;
const MIN_COUNT = 0;
const INCREMENT_VAL = 0.5;

const SubmitRatingScreen: React.FC<SubmitRatingScreenProps> = ({
	placeName,
	photo_reference,
}: SubmitRatingScreenProps) => {
	const [counter0, setCounter0] = useState<number>(DEFAULT_INTERIM_RATING);
	const [counter1, setCounter1] = useState<number>(DEFAULT_INTERIM_RATING);
	const [counter2, setCounter2] = useState<number>(DEFAULT_INTERIM_RATING);
	const [counter3, setCounter3] = useState<number>(DEFAULT_INTERIM_RATING);

	// 0 index is navigability, 1 is sensory aid, 2 is staff helpfulness, 3 is guide dog
	const counterStates = [
		{ state: counter0, update: setCounter0 },
		{ state: counter1, update: setCounter1 },
		{ state: counter2, update: setCounter2 },
		{ state: counter3, update: setCounter3 },
	];

	return (
		<ScrollView>
			<PlaceImage photoref={photo_reference} placeName={placeName} />
			<Text>{placeName}</Text>
			<Button
				text={CANCEL}
				accessibilityLabel={CANCEL}
				onPress={() => {
					// TODO
				}}
			/>
			{PLACE_ATTRIBUTES.map((attribute, index) => {
				const counter = counterStates[index];

				return (
					<View key={`rating${index}`}>
						<Button
							iconName={"minus"}
							accessibilityLabel={getIncrementRatingButtonLabel(
								true,
								counter.state,
								attribute,
								placeName
							)}
							onPress={() => {
								if (counter.state === MIN_COUNT) {
									return;
								}
								counter.update(counter.state - INCREMENT_VAL);
							}}
						/>
						<Text>{attribute}</Text>
						<Text>{counter.state}</Text>
						<Button
							iconName={"plus"}
							accessibilityLabel={getIncrementRatingButtonLabel(
								false,
								counter.state,
								attribute,
								placeName
							)}
							onPress={() => {
								if (counter.state === MAX_COUNT) {
									return;
								}
								counter.update(counter.state + INCREMENT_VAL);
							}}
						/>
					</View>
				);
			})}
			<Button
				text={SUBMIT}
				accessibilityLabel={SUBMIT}
				onPress={() => {
					//TODO
				}}
			/>
		</ScrollView>
	);
};

export default SubmitRatingScreen;
