package com.rent.model;

import java.sql.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;

@Entity
@Table( name = "vehicle" )
public class Vehicle {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Integer id;
	
	@Column
	private String license_no;
	
	@Column
	private String vid;
	
	@Column
	private Date regisration_expiry;
	
	@Column
	private String make;
	
	@Column
	private String model;
	
	@Column
	private int current_mileage;
	
	@Column
	private Date last_serviced;
		
	@Column
	private String vehicle_type;
	
	@Column
	private int rental_location;
	
	@Column
	private int status;

	@Column
	private String vehicle_picture;
	
	@Column
	private String car_condition;
	
	@Column
	private Integer model_year;

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

	public String getVehicle_picture() {
		return vehicle_picture;
	}

	public void setVehicle_picture(String vehicle_picture) {
		this.vehicle_picture = vehicle_picture;
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
	
}
