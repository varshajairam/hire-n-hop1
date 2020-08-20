package com.rent.service;

import java.util.*;

import com.rent.model.Membership;
import com.rent.model.Reservation;


public interface MembershipService {

	List<Membership> getMembership();

	void updatePrice(List<String> prices);
}
