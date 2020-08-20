package com.rent.service;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rent.dao.ReservationDAO;
import com.rent.dao.VehicleDAO;
import com.rent.model.Reservation;
import com.rent.model.Vehicle;

@Service
public class ReservationService_Impl implements ReservationService{

	@Autowired
	ReservationDAO reservationDAO;
	
	@Override
	public List<Reservation> getReservations(String email) {
		return reservationDAO.getReservations(email);
	}

	@Override
	public void endReservation(Reservation id) {
		reservationDAO.endReservation(id);
	}

	@Override
	public List<String> cancelReservation(Reservation id) {
		return reservationDAO.cancelReservation(id);
		
	}
	
	@Override
	public List<Reservation> pastReservations(String email) {
		return reservationDAO.pastReservations(email);
	}
	
	@Override
	public List<Reservation> upcomingReservations(String email) {
		return reservationDAO.pastReservations(email);
	}

	@Override
	public List<Reservation> currentReservations(String email) {
		return reservationDAO.currentReservations(email);
	}

	@Override
	public List<Integer> startReservation(Reservation id) {
		return reservationDAO.startReservations(id);
	}

	@Override
	public List<Integer> getCurrentReservationStatus(String email) {
		return reservationDAO.getCurrentReservationStatus(email);
	}
}
