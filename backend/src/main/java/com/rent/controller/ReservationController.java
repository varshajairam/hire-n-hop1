package com.rent.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rent.service.ReservationService;
import com.rent.model.Reservation;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ReservationController {

	@Autowired
	private ReservationService reservationService;
	
	@GetMapping("/allreservations")
	public List<Reservation> getReservations(@RequestParam String email){
		 return reservationService.getReservations(email);
		
	}
	
	@PostMapping("/endreservation")
	public String endReservation(@RequestBody Reservation id){
		reservationService.endReservation(id);
		 return "Success";
		
	}
	
	@PostMapping("/cancelreservation")
	public List<String> cancelReservation(@RequestBody Reservation id){
		return reservationService.cancelReservation(id);
		
	}
	
	
	@GetMapping("/pastreservations")
	public List<Reservation> pastReservations(@RequestParam String email){
		 return reservationService.pastReservations(email);
		
	}
	
	
	@GetMapping("/upcomingreservations")
	public List<Reservation> upcomingReservations(@RequestParam String email){
		 return reservationService.upcomingReservations(email);
		
	}
	
	@GetMapping("/currentreservations")
	public List<Reservation> currentReservations(@RequestParam String email){
		 return reservationService.currentReservations(email);
		
	}
	
	@PostMapping("/startreservation")
	public List<Integer> startReservation(@RequestBody Reservation id){
		return reservationService.startReservation(id);
		
	}
	
	@GetMapping("/getcurrentreservationstaus")
	public List<Integer> getCurrentReservationStatus(@RequestParam String email){
		 return reservationService.getCurrentReservationStatus(email);
		
	}
}
