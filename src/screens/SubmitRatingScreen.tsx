import React, { useRef } from "react";
import { ScrollView, View, Text } from "react-native";
import { PlaceImage } from "../components/PlaceImage";
import { Button } from "../components/Button";

export interface SubmitRatingScreenProps {
	placeID?: string;
	placeName?: string;
	photo_reference?: string;
}

const SubmitRatingScreen: React.FC<SubmitRatingScreenProps> = ({
	placeName,
	photo_reference,
}: SubmitRatingScreenProps) => {
	// 0 index is navigability, 1 is sensory aid, 2 is staff helpfulness, 3 is guide dog
	const interimRatingRef = useRef([3, 3, 3, 3]);

	return (
		<ScrollView>
			<PlaceImage photoref={photo_reference} placeName={placeName} />
			<Text>{placeName}</Text>
			<Button
				text="Cancel"
				accessibilityLabel="Cancel"
				onPress={() => {
					// TODO
				}}
			/>
			{["Navigability", "Sensory Aids", "Staff Helpfulness", "Guide Dog Friendliness"].map(
				(attribute, index) => {
					const interimRating = interimRatingRef.current[index];
					const nextRatingAbove = interimRating + 0.5;
					const nextRatingBelow = interimRating - 0.5;
					const decreaseLabel = `Decrease your evaluation of ${
						placeName ? placeName : "this place"
					}'s ${attribute} from ${interimRating} to ${nextRatingBelow}`;
					const increaseLabel = `Increase your evaluation of ${
						placeName ? placeName : "this place"
					}'s ${attribute} from ${interimRating} to ${nextRatingAbove}`;
					return (
						<View key={`rating${index}`}>
							<Button
								iconName={"minus"}
								accessibilityLabel={decreaseLabel}
								onPress={() => {
									// TODO
								}}
							/>
							<Text>{attribute}</Text>
							<Text>{interimRating}</Text>
							<Button
								iconName={"plus"}
								accessibilityLabel={increaseLabel}
								onPress={() => {
									// TODO
								}}
							/>
						</View>
					);
				}
			)}
			<Button
				text="Submit"
				accessibilityLabel="Submit"
				onPress={() => {
					//TODO
				}}
			/>
		</ScrollView>
	);
};

export default SubmitRatingScreen;
