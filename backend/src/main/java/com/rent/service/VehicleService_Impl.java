package com.rent.service;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.rent.dao.VehicleDAO;
import com.rent.model.Reservation;
import com.rent.model.Vehicle;
import com.rent.model.VehicleType;
import com.rent.model.Vehicle;

@Service
public class VehicleService_Impl implements VehicleService{

	@Autowired
	VehicleDAO vehicleDAO;
	
	@Transactional
	@Override
	public List<Vehicle> getByLocation(String zipcode, String startdatetime, String enddatetime) {
		return vehicleDAO.getByLocation(zipcode, startdatetime, enddatetime);
	}
	
	public HashSet<String> getVehicle(String type){
		return vehicleDAO.getVehicle(type);
	}
	
	public List<Vehicle> vehicleRequest(String zipcode, String make, String model,String startdatetime, String enddatetime ) {
		return vehicleDAO.vehicleRequest(zipcode, make, model, startdatetime, enddatetime); 
		
	}
	
	public List<Vehicle> getAllVehicle(){
		return vehicleDAO.getAllVehicle();
	}
	
	public void reservation(Reservation r) {
		vehicleDAO.reservation(r);
		
	}
	
	public List<VehicleType> getVehicleType(){
		 return vehicleDAO.getVehicleType();
		
	}
	public String getAddress(String zipcode) {
		return vehicleDAO.getAddress(zipcode);
	}
}
