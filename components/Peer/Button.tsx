import React, {useState} from "react"
import {Pressable, Image, StyleSheet, View, Text} from "react-native"

import { PRIMARY_COLOR, PRIMARY_DARK } from "../../util/colors"

// All assets that can possibly be loaded into a button will
// need to be initialized here. require cannot be passed
// a dynamic value
const favIcon = require("../../assets/favicon.png")
const filterIcon = require("../../assets/filter-icon.svg")

export interface ButtonProps {
    text?: string,
    image?: string,
    accessibilityLabel: string, // not optional for this project.
    onPress: VoidFunction,
}

/**
 * Peer-styled button element to keep a consistent design.
 */
const Button = ({image, text, accessibilityLabel, onPress} : ButtonProps) : JSX.Element => {

    const [color, setColor] = useState<string>(PRIMARY_COLOR)

    const styles = StyleSheet.create({
        button: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: color
        }
    })

    // chooses one to display, favoring bottom most prop

    let display : JSX.Element | null = null;    

    if (text !== undefined) {
        display = <Text>{text}</Text>
    }

    if (image !== undefined) {
        switch (image) {
            case "filter-icon.svg":
                display = <Image source={filterIcon}/>
                break;
            case "favicon.png":
                display = <Image source={favIcon}/>
                break;
            default:
                throw new Error("passed image is not available for this component");
        }
    }

    return (
        <Pressable 
            onPress={() => {
                onPress()
                setColor(PRIMARY_COLOR)
            }} 
            onPressIn={() => {setColor(PRIMARY_DARK)}}  
            style={styles.button} 
            accessibilityLabel={accessibilityLabel}>
            <View>
                {display}
            </View>
        </Pressable>
    )
}

export default Button;