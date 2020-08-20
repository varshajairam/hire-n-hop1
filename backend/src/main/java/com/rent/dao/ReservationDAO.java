package com.rent.dao;

import java.util.List;

import com.rent.model.Reservation;
import com.rent.model.Vehicle;

public interface ReservationDAO {
	
	public List<Reservation> getReservations(String email);

	public void endReservation(Reservation id);

	public List<String> cancelReservation(Reservation id);

	List<Reservation> pastReservations(String id);

	List<Reservation> upcomingReservations(String email);

	List<Reservation> currentReservations(String email);

	public List<Integer> startReservations(Reservation id);

	public List<Integer> getCurrentReservationStatus(String email);

}