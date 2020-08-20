package com.rent.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectSerializer;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.rent.dao.VehicleTypeGroup;
import com.rent.model.Location;
import com.rent.model.User;
import com.rent.model.Vehicle;
import com.rent.model.VehicleType;
import com.rent.service.AdminService;
import com.rent.service.UserService;
import com.rent.service.UserService_Impl;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class AdminController {
	
	@Autowired
	private UserService service;
	
	@Autowired
	private AdminService AdminService;
	
	@GetMapping("/allvehicletype")
	public List<VehicleTypeGroup> get(){
		
		return AdminService.get();
	}
	
	@PostMapping("/addvehicletype")
	public VehicleTypeGroup saveVehicleType(@RequestBody VehicleTypeGroup vtg) {

		AdminService.save(vtg);
		return vtg;
	}
	
	@PostMapping("/deletevehicletype")
	public String deleteVehicleType(@RequestBody VehicleType vt) {
		
		AdminService.deleteVehicletype(vt);
		return "deleted";
	}
	
	@PostMapping("/updatevehicletype")
	public VehicleTypeGroup updateVehicleType(@RequestBody VehicleTypeGroup vtg) {
		
		AdminService.updateVehicletype(vtg);
		return vtg;
	}
	
	@PostMapping("/deletevehicle")
	public void deleteVehicle(@RequestBody Vehicle vehicle) {
		AdminService.deleteVehicle(vehicle);
		
	}
	
	@PostMapping("/addvehicle")
	public Vehicle saveVehicle(@RequestBody Vehicle vehicle) {
		vehicle.setStatus(1);
		AdminService.saveVehicle(vehicle);
		return vehicle;
	}
	
	@PostMapping("/updatevehicle")
	public String updateVehicle(@RequestBody Vehicle vehicle) {
		AdminService.updateVehicle(vehicle);
		return "updated";
	}
	
	@PostMapping("/addlocation")
	public Location saveLocation(@RequestBody Location location) {		
		return AdminService.saveLocation(location);
	}
	
	@GetMapping("/locations")
	public List<Location> getLocations() {		
		return AdminService.getLocations();
	}
	
	@PostMapping("/deletelocation")
	public String deleteLocation(@RequestBody Location location) {
		AdminService.deleteLocation(location.getId());
		return "Success";
	}
	
	@PostMapping("/editlocation")
	public String editLocation(@RequestBody Location location) {
		AdminService.editLocation(location);
		return "Success";
	}
	
	@PostMapping("/terminateuser")
	public String terminateUserMembership(@RequestBody User user) {
		service.terminate(user.getEmail());
		return "Success";
	}
	
	@GetMapping("/allusers")
	public List<User> getAllUsers() {	
		return service.getAllUsers();
	}
		
}