package com.rent.dao;

import java.util.List;

import com.rent.model.Customer;

public interface CustomerDAO {

	List<Customer> get();
	
	Customer get(int id);
	
	void save(Customer customer);
	
	void delete(int id);
}
