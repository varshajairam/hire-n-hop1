package com.rent.service;

import java.util.HashMap;
import java.util.List;


import com.rent.model.Customer;
import com.rent.model.VehicleType;
import com.rent.dao.VehicleTypeGroup;
import com.rent.model.*;

public interface AdminService {

	List<VehicleTypeGroup> get();
	void save(VehicleTypeGroup vtg);
	void deleteVehicletype(VehicleType vt);
	void updateVehicletype(VehicleTypeGroup vtg);
	void saveVehicle(Vehicle vehicle);
	void updateVehicle(Vehicle vehicle);
	void deleteVehicle(Vehicle vehicle);
	Location saveLocation(Location location);
	List<Location> getLocations();
	void deleteLocation(Integer id);
	void editLocation(Location location);
}
