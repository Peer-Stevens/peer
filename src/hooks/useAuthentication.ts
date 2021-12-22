import { useState } from "react";
import sha256 from "crypto-js/sha256";

export const useAuthentication = (): {
	validateEmail: (input: string) => void;
	hashPassword: (input: string) => void;
	errorMsg: string;
	setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
	email: string;
	password: string;
} => {
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	/**
	 * Validates that the email the user provided has a valid email format
	 * @param input - the email to validate
	 * @returns
	 */
	const validateEmail = (input: string): void => {
		if (!input) {
			setEmail("");
			return;
		}

		// source: https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
		const regEx =
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		if (regEx.test(input) === false) {
			setErrorMsg("Please provide a valid email");
		} else {
			setErrorMsg("");
			setEmail(input.toLowerCase()); // making email lowercase will ensure that email isn't case sensitive
		}
		return;
	};

	/**
	 * Hashes the password the user provies
	 * @param input - the password to hash
	 * @returns
	 */
	const hashPassword = (input: string): void => {
		setErrorMsg("");

		if (!input) {
			setPassword("");
			return;
		}
		const hash: CryptoJS.lib.WordArray = sha256(input);

		if (hash !== undefined) {
			setPassword(hash.toString());
			return;
		} else {
			setPassword("");
			setErrorMsg("Something went wrong, please try again");
			return;
		}
	};

	return { validateEmail, hashPassword, errorMsg, setErrorMsg, email, password };
};
