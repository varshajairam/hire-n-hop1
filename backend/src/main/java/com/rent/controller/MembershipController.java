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

import com.rent.service.MembershipService;
import com.rent.service.ReservationService;
import com.rent.model.Membership;
import com.rent.model.Reservation;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class MembershipController {

	@Autowired
	private MembershipService membershipService;
	
	@GetMapping("/membership")
	public List<Membership> getReservations(){
		 return membershipService.getMembership();
		
	}
	
	@PostMapping("/membership/updateprice")
	public List<String> updatePrice(@RequestBody List<String> prices){
		 membershipService.updatePrice(prices);
		 return prices;
	}
	
}
