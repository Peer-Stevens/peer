import React from "react";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";

export interface PlaceCardProps {
	place: string;
	avg: number;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, avg }: PlaceCardProps) => {
	return (
		<View style={styles.card}>
			<View >
				<Text style={styles.cardContent}>{place}</Text>
				<Text style={styles.cardContent}>{avg}</Text>
			</View>
			{/* <View style= {styles.image}>
                <Image />
            </View> */}
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "black",
		width: Dimensions.get("window").width/2,
		height: Dimensions.get("window").height / 6,
		borderWidth: 5,
		borderColor: "red",
	},
	cardContent: {
		backgroundColor: "#fff",
		fontSize: 30,
	},
	image: {
		backgroundColor: "#fff",
	},
});

export default PlaceCard;
