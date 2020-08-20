package com.rent.dao;

import java.util.ArrayList;
import java.util.List;

public class VehicleTypeGroup {
	private String vehicleType;
	private List<Integer> hourList = new ArrayList();
	private List<String> priceList = new ArrayList();
	
	public VehicleTypeGroup() {
		vehicleType = "";
		hourList = new ArrayList();
		priceList = new ArrayList();
	}
	
	public String getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}

	public List<Integer> getHourList() {
		return hourList;
	}

	public void setHourList(List<Integer> hourList) {
		this.hourList = hourList;
	}

	public List<String> getPriceList() {
		return priceList;
	}

	public void setPriceList(List<String> priceList) {
		this.priceList = priceList;
	}

	VehicleTypeGroup(String type) {
		this.vehicleType = type;
	}
	
	void addInHourList(Integer hr) {
		hourList.add(hr);
	}
	void addInPriceList(String hr) {
		priceList.add(hr);
	}
}

