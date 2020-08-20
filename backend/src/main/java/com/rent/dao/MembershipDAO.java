package com.rent.dao;

import java.util.List;

import com.rent.model.Membership;
import com.rent.model.Reservation;
import com.rent.model.Vehicle;

public interface MembershipDAO {

	List<Membership> getMembership();

	void updatePrice(List<String> prices);

}


