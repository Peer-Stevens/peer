import { computeDistanceFeet, computeDistanceMi } from "../../src/util/distance";

describe("distance util function tests", () => {
	it("returns undefined if any inputs are undefined", () => {
		expect(
			computeDistanceFeet({ longitude: 2 }, { latitude: 1, longitude: 1 })
		).not.toBeDefined();
		expect(
			computeDistanceFeet({ latitude: 2 }, { latitude: 1, longitude: 1 })
		).not.toBeDefined();
		expect(
			computeDistanceFeet({ latitude: 2, longitude: 2 }, { latitude: 1 })
		).not.toBeDefined();
		expect(
			computeDistanceFeet({ latitude: 2, longitude: 2 }, { longitude: 1 })
		).not.toBeDefined();
		expect(computeDistanceFeet({}, {})).not.toBeDefined();
	});

	it("computes the expected value for the distance between two coordinates", () => {
		expect(
			computeDistanceMi(
				{ latitude: 40.74108153143917, longitude: -73.98974913187716 },
				{ latitude: 40.74843628932199, longitude: -73.98564466788801 }
			)
		).toBeLessThan(0.75);
		expect(
			computeDistanceMi(
				{ latitude: 40.74108153143917, longitude: -73.98974913187716 },
				{ latitude: 40.74843628932199, longitude: -73.98564466788801 }
			)
		).toBeGreaterThan(0.25);
		expect(
			computeDistanceFeet(
				{ latitude: 40.74266441155882, longitude: -74.02766583842671 },
				{ latitude: 40.74274880858286, longitude: -74.02684051430757 }
			)
		).toBeLessThan(400);
		expect(
			computeDistanceFeet(
				{ latitude: 40.74266441155882, longitude: -74.02766583842671 },
				{ latitude: 40.74274880858286, longitude: -74.02684051430757 }
			)
		).toBeGreaterThan(200);
	});
});
