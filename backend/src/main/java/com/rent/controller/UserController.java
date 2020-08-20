package com.rent.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rent.model.User;
import com.rent.model.Vehicle;
import com.rent.model.Extension;
import com.rent.model.Login;
import com.rent.service.UserService;
import com.rent.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public User login(@RequestBody Login user) {
		return userService.get(user.getEmail());
	}
	
	@PostMapping("/signup")
	public String signup(@RequestBody User user) {
		userService.save(user);
		return "Success";
	}
	
	@PostMapping("/extendmembership")
	public String extend(@RequestBody Extension ext) {
		
		Date date = userService.extend(ext.getEmail(), ext.getMonths());
		int year = date.getYear() + 1900;
		int month = date.getMonth() + 1;
		int day = date.getDate();
		String strMonth;
		String strDay;
		if(month<10) {
			strMonth = "0" + String.valueOf(month);}
		
		else {
			strMonth = String.valueOf(month);
		}
		
		if(day<10) {
			strDay = "0" + String.valueOf(day);
		}
		else {
			strDay = String.valueOf(day);
		}
		
		String strDate = String.valueOf(year) + "-" + strMonth + "-" + strDay;
		
		
		
		return strDate;
		
	}
	
	@GetMapping("/viewuserbyemail")
	public User getByEmail(@RequestParam String email) {
		return userService.get(email);
		
	
		
	}
	
}
