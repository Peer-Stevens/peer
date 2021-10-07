import React from "react";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";

export interface PlaceCardProps {
	place: string;
	avg: number;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, avg }: PlaceCardProps) => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.details}>{place}</Text>
				<Text style={styles.details}>{avg}</Text>
			</View>
			{/* <View style= {styles.image}>
                <Image />
            </View> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height / 4,
	},
	details: {
		backgroundColor: "#fff",
		fontSize: 30,
	},
	image: {
		backgroundColor: "#fff",
	},
});

export default PlaceCard;
