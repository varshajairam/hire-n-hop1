package com.rent.service;

import java.util.List;

public interface SearchService {

	List<String> getMake(String vehicle_type);

	List<String> getModel(String vehicle_type, String make);

}
