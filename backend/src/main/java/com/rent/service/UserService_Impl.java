package com.rent.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rent.dao.UserDAO;
import com.rent.model.User;

@Service
public class UserService_Impl implements UserService{

	@Autowired
	UserDAO userDAO;
	
	@Transactional
	@Override
	public List<User> get() {
		return userDAO.get();
	}

	@Transactional
	@Override
	public User get(String email) {		
		return userDAO.get(email);
	}

	@Transactional
	@Override
	public void save(User user) {
		userDAO.save(user);
	}
	
	
	@Transactional
	@Override
	public void terminate(String email) {
		userDAO.terminate(email);
	}
	
	@Override
	public List<User> getAllUsers() {
		return userDAO.getAllUsers();
	}
	
	@Override
	public Date extend(String email, int months) {
		return userDAO.extend(email, months);
	}

}
