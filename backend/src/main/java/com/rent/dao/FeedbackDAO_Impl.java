package com.rent.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.query.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rent.model.Feedback;
import com.rent.model.User;

@Repository
public class FeedbackDAO_Impl implements FeedbackDAO {
	
	@Autowired
	private EntityManager entityManager;
	
	@Override
	public List<Feedback> get(String userEmail) {
		Session currentSession = entityManager.unwrap(Session.class);
		
		Query<User> userQuery = currentSession.createQuery("from User where email =: userEmail", User.class);
		userQuery.setParameter("userEmail", userEmail);
		
		User user = userQuery.getSingleResult();
		Integer userId = user.getId();
		
		Query<Feedback> query = currentSession.createQuery("from Feedback where user_id =: userId", Feedback.class).setParameter("userId", userId);
		List<Feedback> list = query.getResultList();
		return list;
	}
	
	@Override
	public void save(Feedback feedback) {
		String userEmail = feedback.getUser_email();
		Session currentSession = entityManager.unwrap(Session.class);
		
		Query<User> userQuery = currentSession.createQuery("from User where email =: userEmail", User.class);
		userQuery.setParameter("userEmail", userEmail);
		User user = userQuery.getSingleResult();
		
		Integer userId = user.getId();
		feedback.setUser_id(userId);
		currentSession.save(feedback);
	}
}
