import { PlaceType1 } from "@googlemaps/google-maps-services-js";
import type { Place } from "@googlemaps/google-maps-services-js";

export enum PlaceTypes {
	Travel = "Travel",
	Entertainment = "Entertainment",
	Food = "Food and Drink",
	Stores = "Stores",
	Health = "Health",
	Worship = "Worship",
	Services = "Services",
}

export const placeTypeLabels: string[] = [];
for (const place in PlaceTypes) {
	placeTypeLabels.push(place);
}

export type Travel =
	| PlaceType1.airport
	| PlaceType1.bus_station
	| PlaceType1.car_rental
	| PlaceType1.gas_station
	| PlaceType1.lodging
	| PlaceType1.subway_station
	| PlaceType1.taxi_stand
	| PlaceType1.train_station
	| PlaceType1.transit_station
	| PlaceType1.travel_agency
	| PlaceType1.parking;

export type Entertainment =
	| PlaceType1.amusement_park
	| PlaceType1.aquarium
	| PlaceType1.art_gallery
	| PlaceType1.bowling_alley
	| PlaceType1.campground
	| PlaceType1.casino
	| PlaceType1.gym
	| PlaceType1.library
	| PlaceType1.movie_theater
	| PlaceType1.museum
	| PlaceType1.night_club
	| PlaceType1.park
	| PlaceType1.rv_park
	| PlaceType1.tourist_attraction
	| PlaceType1.spa
	| PlaceType1.stadium
	| PlaceType1.zoo;

export type Food =
	| PlaceType1.bakery
	| PlaceType1.bar
	| PlaceType1.cafe
	| PlaceType1.liquor_store
	| PlaceType1.meal_delivery
	| PlaceType1.meal_takeaway
	| PlaceType1.restaurant
	| PlaceType1.supermarket;

export type Stores =
	| PlaceType1.bicycle_store
	| PlaceType1.book_store
	| PlaceType1.car_dealer
	| PlaceType1.car_repair
	| PlaceType1.car_wash
	| PlaceType1.clothing_store
	| PlaceType1.convenience_store
	| PlaceType1.department_store
	| PlaceType1.electronics_store
	| PlaceType1.florist
	| PlaceType1.furniture_store
	| PlaceType1.hardware_store
	| PlaceType1.home_goods_store
	| PlaceType1.jewelry_store
	| PlaceType1.movie_rental
	| PlaceType1.pet_store
	| PlaceType1.pharmacy
	| PlaceType1.shoe_store
	| PlaceType1.shopping_mall
	| PlaceType1.store;

export type Health =
	| PlaceType1.beauty_salon
	| PlaceType1.dentist
	| PlaceType1.doctor
	| PlaceType1.hair_care
	| PlaceType1.hospital
	| PlaceType1.physiotherapist
	| PlaceType1.veterinary_care;

export type Worship =
	| PlaceType1.cemetery
	| PlaceType1.church
	| PlaceType1.funeral_home
	| PlaceType1.hindu_temple
	| PlaceType1.mosque
	| PlaceType1.synagogue;

export type Services =
	| PlaceType1.city_hall
	| PlaceType1.embassy
	| PlaceType1.fire_station
	| PlaceType1.laundry
	| PlaceType1.lawyer
	| PlaceType1.local_government_office
	| PlaceType1.locksmith
	| PlaceType1.lodging
	| PlaceType1.moving_company
	| PlaceType1.painter
	| PlaceType1.plumber
	| PlaceType1.police
	| PlaceType1.post_office
	| PlaceType1.atm
	| PlaceType1.accounting
	| PlaceType1.bank
	| PlaceType1.real_estate_agency
	| PlaceType1.roofing_contractor
	| PlaceType1.storage
	| PlaceType1.travel_agency;

export type PlaceDetailsWithAccesibilityData = {
	result: Place;
	accessibilityData?: {
		_id: string;
		guideDogAvg: number;
		isMenuAccessibleAvg: number;
		noiseLevelAvg: number;
		lightingAvg: number;
		isStaffHelpfulAvg: number;
		isBathroomOnEntranceFloorAvg: number;
		isContactlessPaymentOfferedAvg: number;
		isStairsRequiredAvg: number;
		spacingAvg: number;
	};
};
