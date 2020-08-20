package com.rent.model;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;

@Entity
@Table( name = "reservation" )
public class Reservation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Integer id;
	
	@Column
	private int user_id;
	
	@Column
	private int vehicle_id;
	
	@Column
	private int location_id;
	
	@Column
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Timestamp start_time;
	
	@Column
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Timestamp end_time;
	
	@Column(nullable = true)
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Timestamp return_time;
	
	@Column(nullable = true)
	private int return_status;
	
	@Transient
	private String user_email;
	
	@Column(nullable = true)
	private String amount;

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getUser_email() {
		return user_email;
	}

	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public int getVehicle_id() {
		return vehicle_id;
	}

	public void setVehicle_id(int vehicle_id) {
		this.vehicle_id = vehicle_id;
	}

	public int getLocation_id() {
		return location_id;
	}

	public void setLocation_id(int location_id) {
		this.location_id = location_id;
	}

	public Timestamp getStart_time() {
		return start_time;
	}

	public void setStart_time(Timestamp start_time) {
		this.start_time = new java.sql.Timestamp(start_time.getTime());
	}

	public Timestamp getEnd_time() {
		return end_time;
	}

	public void setEnd_time(Timestamp end_time) {
		this.end_time = new java.sql.Timestamp(end_time.getTime());
		
	}

	public Timestamp getReturn_time() {
		return return_time;
	}

	public void setReturn_time(Timestamp return_time) {
		this.return_time = new java.sql.Timestamp(return_time.getTime());
	}

	public int getReturn_status() {
		return return_status;
	}

	public void setReturn_status(int return_status) {
		this.return_status = return_status;
	}
	
}
