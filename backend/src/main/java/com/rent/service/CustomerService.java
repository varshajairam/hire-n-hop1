package com.rent.service;

import java.util.List;

import com.rent.model.Customer;

public interface CustomerService {

	List<Customer> get();
	
	Customer get(int id);
	
	void save(Customer customer);
	
	void delete(int id);
}
