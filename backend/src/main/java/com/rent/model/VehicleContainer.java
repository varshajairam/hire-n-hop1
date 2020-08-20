package com.rent.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;

public class VehicleContainer {

	private Integer id;
	
	private String license_no;
	
	private String vid;
	
	private Date regisration_expiry;
	
	private String make;
	
	private String model;
	
	private int current_mileage;

	private Date last_serviced;

	private String vehicle_type;
	private int rental_location;
	
	private int status;

	
	private String vehicle_picture;
	
	
	private String car_condition;
	
	private Integer model_year;
	
	private String address;
	
	

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public VehicleContainer(Vehicle v) {
		this.id = v.getId();
		this.license_no = v.getLicense_no();
		this.vid = v.getVid();
		this.regisration_expiry = v.getRegisration_expiry();
		this.make = v.getMake();
		this.model = v.getModel();
		this.current_mileage = v.getCurrent_mileage();
		this.last_serviced = v.getLast_serviced();
		this.vehicle_type = v.getVehicle_type();
		this.rental_location = v.getRental_location();
		this.status = v.getStatus();
		this.vehicle_picture = v.getVehicle_picture();
		this.car_condition= v.getCar_condition();
		this.model_year = v.getModel_year();
		this.address = "";
		
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLicense_no() {
		return license_no;
	}

	public void setLicense_no(String license_no) {
		this.license_no = license_no;
	}

	public String getVid() {
		return vid;
	}

	public void setVid(String vid) {
		this.vid = vid;
	}

	public Date getRegisration_expiry() {
		return regisration_expiry;
	}

	public void setRegisration_expiry(Date regisration_expiry) {
		this.regisration_expiry = regisration_expiry;
	}

	public String getMake() {
		return make;
	}

	public void setMake(String make) {
		this.make = make;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public int getCurrent_mileage() {
		return current_mileage;
	}

	public void setCurrent_mileage(int current_mileage) {
		this.current_mileage = current_mileage;
	}

	public Date getLast_serviced() {
		return last_serviced;
	}

	public void setLast_serviced(Date last_serviced) {
		this.last_serviced = last_serviced;
	}

	public String getVehicle_type() {
		return vehicle_type;
	}

	public void setVehicle_type(String vehicle_type) {
		this.vehicle_type = vehicle_type;
	}

	public int getRental_location() {
		return rental_location;
	}

	public void setRental_location(int rental_location) {
		this.rental_location = rental_location;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getVehicle_picture() {
		return vehicle_picture;
	}

	public void setVehicle_picture(String vehicle_picture) {
		this.vehicle_picture = vehicle_picture;
	}

	public String getCar_condition() {
		return car_condition;
	}

	public void setCar_condition(String car_condition) {
		this.car_condition = car_condition;
	}

	public Integer getModel_year() {
		return model_year;
	}

	public void setModel_year(Integer model_year) {
		this.model_year = model_year;
	}

}
