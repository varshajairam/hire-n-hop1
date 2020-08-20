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
@Table( name = "user" )
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Integer id;
	
	@Column
	private String name;
	
	@Column( unique = true )
	private String email;
	
	@Column
	private String password;
	
	@Column
	private boolean isAdmin;
	
	@Column
	private Date dob;
	
	@Column
	private String mobile;
	
	@Column( nullable = true )
	private String apt;
	
	@Column( nullable = true )
	private String street;
	
	@Column( nullable = true )
	private String city;
	
	@Column
	private String state;
	
	@Column
	private String country;
	
	@Column
	private String zipcode;
	
	@Column
	private Date membershipStartDate;
	
	@Column
	private Date membershipEndDate;
	
	@Column
	private String licenseState;
	
	@Column( unique = true )
	private String licenseId;
	
	@Column
	private boolean isActive;
	
	@Column
	private Long cardNumber;
	
	@Column
	private Byte cardExpiryMonth;
	
	@Column
	private Integer cardExpiryYear;
	
	@Column
	private Short cardCvv;
	
	public Integer getId() {
		return id;
	}
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getApt() {
		return apt;
	}

	public void setApt(String apt) {
		this.apt = apt;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public Date getMembershipStartDate() {
		return membershipStartDate;
	}

	public void setMembershipStartDate(Date membershipStartDate) {
		this.membershipStartDate = membershipStartDate;
	}

	public Date getMembershipEndDate() {
		return membershipEndDate;
	}

	public void setMembershipEndDate(Date membershipEndDate) {
		this.membershipEndDate = membershipEndDate;
	}

	public String getLicenseState() {
		return licenseState;
	}

	public void setLicenseState(String licenseState) {
		this.licenseState = licenseState;
	}

	public String getLicenseId() {
		return licenseId;
	}

	public void setLicenseId(String licenseId) {
		this.licenseId = licenseId;
	}

	public boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}

	public Long getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(Long cardNumber) {
		this.cardNumber = cardNumber;
	}

	public Byte getCardExpiryMonth() {
		return cardExpiryMonth;
	}

	public void setCardExpiryMonth(Byte cardExpiryMonth) {
		this.cardExpiryMonth = cardExpiryMonth;
	}

	public Integer getCardExpiryYear() {
		return cardExpiryYear;
	}

	public void setCardExpiryYear(Integer cardExpiryYear) {
		this.cardExpiryYear = cardExpiryYear;
	}

	public Short getCardCvv() {
		return cardCvv;
	}

	public void setCardCvv(Short cardCvv) {
		this.cardCvv = cardCvv;
	}
}
