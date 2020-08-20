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
import com.rent.model.Vehicle;
import com.rent.model.VehicleType;
import com.rent.service.AdminService;
import com.rent.service.SearchService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class SearchController {
	
	@Autowired
	private SearchService searchService;
	
	@GetMapping("/make")
	public List<String> getMake(@RequestParam String vehicle_type){
		
		return searchService.getMake(vehicle_type);
	}
	
	@GetMapping("/model")
	public List<String>  getModel(@RequestParam String vehicle_type, @RequestParam String make) {

		return searchService.getModel(vehicle_type, make);
	}
	
		
}