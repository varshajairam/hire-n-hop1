package com.rent.service;

import java.util.*;

import com.rent.model.Reservation;


public interface ReservationService {

	List<Reservation> getReservations(String email);

	void endReservation(Reservation id);

	List<String> cancelReservation(Reservation id);

	List<Reservation> pastReservations(String email);

	List<Reservation> upcomingReservations(String email);

	List<Reservation> currentReservations(String email);

	List<Integer> startReservation(Reservation id);

	List<Integer> getCurrentReservationStatus(String email);
}
