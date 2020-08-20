package com.rent.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rent.model.Customer;

@Repository
public class CustomerDAO_Impl implements CustomerDAO {

	@Autowired
	private EntityManager entityManager; 
	
	@Override
	public List<Customer> get() {
		
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Customer> query = currentSession.createQuery("from Customer", Customer.class);
		List<Customer> list = query.getResultList();
		return list;
	}

	@Override
	public Customer get(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void save(Customer customer) {
		// TODO Auto-generated method stub
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.save(customer);
	}

	@Override
	public void delete(int id) {
		// TODO Auto-generated method stub
		
	}

}
