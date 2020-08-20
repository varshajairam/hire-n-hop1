package com.rent.service;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rent.dao.ReservationDAO;
import com.rent.dao.SearchDAO;
import com.rent.dao.VehicleDAO;
import com.rent.model.Reservation;
import com.rent.model.Vehicle;

@Service
public class SearchService_Impl implements SearchService{

	@Autowired
	SearchDAO searchDAO;

	@Override
	public List<String> getMake(String vehicle_type) {
		return searchDAO.getMake(vehicle_type);
	}

	@Override
	public List<String> getModel(String vehicle_type, String make) {
		return searchDAO.getModel(vehicle_type, make);
	}
	

}
