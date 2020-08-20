package com.rent.dao;

import java.util.List;

public interface SearchDAO {

	List<String> getMake(String vehicle_type);

	List<String> getModel(String vehicle_type, String make);
}
