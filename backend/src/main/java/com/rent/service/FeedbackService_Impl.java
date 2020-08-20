package com.rent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rent.dao.FeedbackDAO;
import com.rent.model.Feedback;

@Service
public class FeedbackService_Impl implements FeedbackService {
	
	@Autowired
	FeedbackDAO feedbackDAO;
	
	@Transactional
	@Override
	public List<Feedback> get(String userEmail) {
		return feedbackDAO.get(userEmail);
	}
	
	@Transactional
	@Override
	public void save(Feedback feedback) {
		feedbackDAO.save(feedback);
	}
}
