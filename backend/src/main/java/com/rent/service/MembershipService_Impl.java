package com.rent.service;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rent.dao.MembershipDAO;
import com.rent.dao.ReservationDAO;
import com.rent.dao.VehicleDAO;
import com.rent.model.Membership;
import com.rent.model.Reservation;
import com.rent.model.Vehicle;

@Service
public class MembershipService_Impl implements MembershipService{

	@Autowired
	MembershipDAO membershipDAO;

	@Override
	public List<Membership> getMembership() {
		return membershipDAO.getMembership();
	}
	
	@Override
	public void updatePrice(List<String> prices) {
		membershipDAO.updatePrice(prices);
	}

}
