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
				(value, index) => {
					const decreaseHint = placeName
						? `Decrease your evaluation of ${placeName}'s ${value} by 0.5`
						: `Decrease your evaluation of this place's ${value} by 0.5`;
					const increaseHint = placeName
						? `Increase your evaluation of ${placeName}'s ${value} by 0.5`
						: `Increase your evaluation of this place's ${value} by 0.5`;
					return (
						<View key={`rating${index}`}>
							<Button
								iconName={"minus"}
								accessibilityLabel={"Decrease rating by 0.5"}
								accessibilityHint={decreaseHint}
								onPress={() => {
									// TODO
								}}
							/>
							<Text>{value}</Text>
							<Text>{interimRatingRef.current[index]}</Text>
							<Button
								iconName={"plus"}
								accessibilityLabel={"Increase rating by 0.5"}
								accessibilityHint={increaseHint}
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
