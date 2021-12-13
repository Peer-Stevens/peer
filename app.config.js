export default {
	name: "peer",
	owner: "peer-stevens",
	slug: "peer",
	sdkVersion: "43.0.0",
	version: "1.2.0",
	orientation: "portrait",
	icon: "./assets/icon.png",
	splash: {
		image: "./assets/splash.png",
		resizeMode: "contain",
		backgroundColor: "#ffffff",
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		bundleIdentifier: "com.aej11.peerstevens",
		supportsTablet: true,
		buildNumber: "1.2.0",
	},
	android: {
		adaptiveIcon: {
			backgroundColor: "#FFFFFF",
		},
		package: "com.peer.peerstevens",
		versionCode: 3,
		config: {
			googleMaps: {
				apiKey: process.env.MAPS_API_KEY,
			},
		},
	},
	web: {
		favicon: "./assets/favicon.png",
	},
};
