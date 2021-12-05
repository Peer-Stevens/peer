import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "../components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";
import { Screens } from "./MainScreen";

type CreateAccountScreenProps = { setPage: (screen: Screens) => void };

type FormData = {
	email: string;
	password: string;
};

const CreateAccount: React.FC<CreateAccountScreenProps> = ({ setPage }) => {
	const [errorMsg, setErrorMsg] = useState("");
	const {
		register,
		// control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const createUser = async (email: string, password: string) => {
		setErrorMsg("");

		try {
			const { data } = await axios.post("https://peer-server-stevens.herokuapp.com/addUser", {
				email: email,
				hash: password, // i think i need to hash this
				isBlindMode: false,
				readsBraille: true,
				doesNotPreferHelp: false,
			});
			// should be logging the user in, storing the token, and storing the hashed password here
			setPage(Screens.Home);
		} catch (e) {
			// TODO could not figure out how to pass e.error to setErrorMsg without getting yelled out (couldn't figure out how to make the types behave)
			console.log(e);
			setErrorMsg("Something went wrong");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Email</Text>
			{/* <Controller
				control={control}
				rules={{ required: true }}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.input}
						onBlur={onBlur}
						onChangeText={value => onChange(value)}
						value={value}
					/>
				)}
				name="email"
			/> */}
			<TextInput {...register("email")} style={styles.input} />
			{errors.email && <Text style={{ color: "white" }}>This is a required field</Text>}

			<Text style={styles.label}>Password</Text>
			{/* <Controller
				control={control}
				rules={{ required: true, maxLength: 100 }}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.input}
						onBlur={onBlur}
						onChangeText={value => onChange(value)}
						value={value}
					/>
				)}
				name="password"
			/>
			{errors.email && <Text>This is a required field</Text>} */}

			{/* <Button text="Log in" onPress={logInUser} accessibilityLabel="Click to log in" />
			<Button
				text="Create Account"
				onPress={() => navigation.navigate("CreateAccount")}
				accessibilityLabel="Click to create account"
			/> */}
			<TextInput {...register("password")} style={styles.input} />
			{errors.password && <Text style={{ color: "white" }}>This is a required field</Text>}
			{/* <Text style={{ fontSize: 30 }}>{errorMsg ? <Text>{errorMsg}</Text> : null}</Text> */}

			<Button
				text="Create Account"
				onPress={() => {
					handleSubmit(data => createUser(data.email, data.password));
				}}
				accessibilityLabel="Click to create account"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		color: "white",
		margin: 20,
		marginLeft: 0,
		fontSize: 35,
	},
	button: {
		marginTop: 40,
		color: "white",
		height: 40,
		backgroundColor: "#ec5990",
		borderRadius: 4,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 8,
		backgroundColor: "#0e101c",
	},
	input: {
		backgroundColor: "white",
		borderColor: "black",
		height: 60,
		padding: 10,
		borderRadius: 4,
		fontSize: 35,
	},
});

export default CreateAccount;
