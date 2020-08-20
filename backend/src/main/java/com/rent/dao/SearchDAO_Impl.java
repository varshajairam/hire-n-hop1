package com.rent.dao;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rent.model.Membership;
import com.rent.model.Transaction;
import com.rent.model.User;
import com.rent.model.Vehicle;

@Repository
public class SearchDAO_Impl implements SearchDAO {
	
	@Autowired
	private EntityManager entityManager;


	@Override
	public List<String> getMake(String vehicle_type) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<String> makequery = currentSession.createQuery("select distinct make from Vehicle where vehicle_type = :vehicle_type ", String.class);
		makequery.setParameter("vehicle_type", vehicle_type);
		List<String> list = makequery.getResultList();
		return list;
	}

	@Override
	public List<String> getModel(String vehicle_type, String make) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<String> modelquery = currentSession.createQuery("select distinct model from Vehicle where vehicle_type = :vehicle_type and make = :make ", String.class);
		modelquery.setParameter("vehicle_type", vehicle_type);
		modelquery.setParameter("make", make);
		List<String> list = modelquery.getResultList();
		return list;
	} 
	

	
}
