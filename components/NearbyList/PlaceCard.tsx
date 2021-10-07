import React from "react";
import { StyleSheet, Dimensions,View, Text,Image } from "react-native";
// https://github.com/Gil2015/react-native-table-component for structuring the data neatly

export interface PlaceCardProps{
	place?: string;
    avg?: number;
}

const PlaceCard: React.FC<PlaceCardProps> = ({place, avg}: PlaceCardProps) => {
	return (
        <View style= {styles.container}>
		    <View style={styles.details}>
                <Text>{place}</Text>
			    <Text>{avg}</Text>
		    </View>
            {/* <View style= {styles.image}>
                <Image />
            </View> */}
        </View>
	);
};


//MAKE THIS UPPERCASE


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
    details:{
        backgroundColor: "#fff",
    },
    image:{
        backgroundColor: "#fff",
    },
});

export default PlaceCard;