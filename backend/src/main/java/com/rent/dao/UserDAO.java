package com.rent.dao;

import java.util.Date;
import java.util.List;

import com.rent.model.User;

public interface UserDAO {
	
	List<User> get();
	
	User get(String email);
	
	void save(User user);

	//void delete(int id);

	Date extend(String email, int months);

	void terminate(String email);

	List<User> getAllUsers();

}
