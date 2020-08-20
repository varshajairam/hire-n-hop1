package com.rent.dao;

import java.util.Date;
import java.util.HashSet;
import java.util.List;

import com.rent.model.Reservation;
import com.rent.model.Vehicle;
import com.rent.model.VehicleType;

public interface VehicleDAO {
	
	public List<Vehicle> getByLocation(String zipcode, String startdatetime, String enddatetime);
	public HashSet<String> getVehicle(String type);
	public List<Vehicle> vehicleRequest(String zipcode, String make, String model, String startdatetime, String enddatetime);
	public List<Vehicle> vehicleSimilar(String make, String model, String startdatetime, String enddatetime);
	public List<Vehicle> getAllVehicle();
	public void reservation(Reservation r);
	public List<VehicleType> getVehicleType();
	public String getAddress(String zipcode);
	
	
}
