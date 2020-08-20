package com.rent.service;

import java.util.Date;
import java.util.List;

import com.rent.model.User;

public interface UserService {

	List<User> get();
	
	User get(String email);
	
	void save(User user);

	void terminate(String email);
	

	//void delete(int id);

	Date extend(String email, int months);

	List<User> getAllUsers();

}
