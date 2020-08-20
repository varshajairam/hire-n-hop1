package com.rent.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rent.model.Feedback;
import com.rent.service.FeedbackService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class FeedbackController {
	
	@Autowired
	private FeedbackService feedbackService;
	
	@GetMapping("/feedback")
	public List<Feedback> getFeedback(@RequestParam String userEmail) {
		return feedbackService.get(userEmail);
	}
	
	@PostMapping("/feedback")
	public String sendFeedback(@RequestBody Feedback feedback) {
		feedbackService.save(feedback);
		return "Success";
	}
}
