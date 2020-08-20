package com.rent.service;


import java.util.*;

import com.rent.model.Reservation;
import com.rent.model.Vehicle;

import com.rent.model.VehicleType;


public interface VehicleService {

	List<Vehicle> getByLocation(String zipcode, String startdatetime, String enddatetime);
	HashSet<String> getVehicle(String type);
	List<Vehicle> vehicleRequest(String zipcode, String make, String model, String startdatetime, String enddatetime);
	List<Vehicle> getAllVehicle();
	void reservation(Reservation r);
	List<VehicleType> getVehicleType();
	public String getAddress(String zipcode);
	
	
}
