package com.rent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rent.dao.CustomerDAO;
import com.rent.model.Customer;

@Service
public class CustomerService_Impl implements CustomerService{

	@Autowired
	CustomerDAO customerDAO;
	
	@Transactional
	@Override
	public List<Customer> get() {
		return customerDAO.get();
	}

	@Transactional
	@Override
	public Customer get(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional
	@Override
	public void save(Customer customer) {
		customerDAO.save(customer);
	}

	@Transactional
	@Override
	public void delete(int id) {
		// TODO Auto-generated method stub
		
	}

}
