package com.rent.dao;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rent.model.Membership;
import com.rent.model.Reservation;
import com.rent.model.User;

@Repository
public class MembershipDAO_Impl implements MembershipDAO {
	
	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Membership> getMembership() {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Membership> query = currentSession.createQuery("from Membership", Membership.class);
		return query.getResultList();	
	}
	
	@Override
	@Transactional
	public void updatePrice(List<String> prices) {
		Session currentSession = entityManager.unwrap(Session.class);
		for(int id = 1; id <= prices.size(); id++) {
			String price = prices.get(id-1);
			//Query query1 = currentSession.createQuery("UPDATE Vehicle SET status =0 where vehicle_type=:vtname");
			Query query = currentSession.createQuery("UPDATE Membership set price =:price where id =:id");
			query.setParameter("price", price);
			query.setParameter("id", id);
			query.executeUpdate();
		}
			
	}

}
