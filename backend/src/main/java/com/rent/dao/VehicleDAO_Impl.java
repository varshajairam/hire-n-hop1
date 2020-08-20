package com.rent.dao;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TemporalType;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;

import com.rent.model.Vehicle;

import com.rent.model.VehicleType;
import com.rent.model.Customer;
import com.rent.model.Location;
import com.rent.model.Reservation;
import com.rent.model.Transaction;
import com.rent.model.User;
import java.util.Random;
import java.util.TimeZone;

@Repository
public class VehicleDAO_Impl implements VehicleDAO {
	
	@Autowired
	private EntityManager entityManager; 
	
	@Override
	public List<Vehicle> getByLocation(String zipcode, String startdatetime, String enddatetime) {
		
		Session currentSession = entityManager.unwrap(Session.class);
		
		Query<Location> query = currentSession.createQuery("from Location where zipcode =:zipcode", Location.class);
		query.setParameter("zipcode", zipcode);
		Location locqresult = query.uniqueResult();	
		
		
		if(locqresult != null) {
			
			Query<Vehicle> query1 = currentSession.createQuery("select v from Vehicle v JOIN "
					+ "Reservation r on v.id = r.vehicle_id and "+
					" (r.end_time > : startdatetime and r.end_time < :enddatetime)" +
					" and "+
					"v.rental_location =:locid and v.status>0", Vehicle.class);
			
			query1.setString("startdatetime", startdatetime);
			query1.setString("enddatetime", enddatetime);
			query1.setParameter("locid",locqresult.getId());
			List<Vehicle> list1 = query1.getResultList();
			
			
			Query<Vehicle> query5 = currentSession.createQuery("select v from Vehicle v JOIN "
					+ "Reservation r on v.id = r.vehicle_id and " +
					"(r.start_time > :startdatetime and r.start_time < :enddatetime) and " +
					"v.rental_location =:locid and v.status>0", Vehicle.class);
			
			
			query5.setString("startdatetime",startdatetime);
			query5.setString("enddatetime", enddatetime);
			query5.setParameter("locid",locqresult.getId());
			List<Vehicle> list5 = query5.getResultList();
			
			
			Query<Vehicle> query4 = currentSession.createQuery("select v from Vehicle v JOIN "
					+ "Reservation r on v.id = r.vehicle_id and " +
					"(r.end_time > :startdatetime and r.end_time > :enddatetime) and " +
					"(r.start_time < :startdatetime and r.start_time < :enddatetime) and " +
					"v.rental_location =:locid and v.status>0", Vehicle.class);
			
			query4.setString("startdatetime",startdatetime);
			query4.setString("enddatetime", enddatetime);
			query4.setParameter("locid",locqresult.getId());
			List<Vehicle> list4 = query4.getResultList();
			
			Query<Vehicle> query2 = currentSession.createQuery("select v from Vehicle v where " +
			"rental_location=:locid and v.status>0", Vehicle.class);
			query2.setParameter("locid",locqresult.getId());
			List<Vehicle> list2 = query2.getResultList();
			
			List<Vehicle> list3 = new ArrayList<Vehicle>();

			
			list1.addAll(list5);
			list1.addAll(list4);
			for(Vehicle temp: list2) {
				if(!list1.contains(temp) ){
					list3.add(temp);}
			}
			return list3;
			}
		else {
			List<Vehicle> list = Collections.<Vehicle> emptyList();
			return list;
		}
	}
	
	@Override
	public HashSet<String> getVehicle(String type){
		
		Session currentSession = entityManager.unwrap(Session.class);
		
		if(type.isEmpty() == false) {
			Query<Vehicle> query = currentSession.createQuery("from Vehicle where vehicle_type = :vtype", Vehicle.class);
			query.setParameter("vtype", type);
		
			List<Vehicle> list = query.getResultList();
			HashSet<String> makemodel = new HashSet<String>();
			
			for(Vehicle temp:list) {
				makemodel.add(temp.getMake() + "," + temp.getModel());
			}
			
			return makemodel;}
		else {
			Query<Vehicle> query = currentSession.createQuery("select distinct make,model from Vehicle", Vehicle.class);
			
		
			List<Vehicle> list = query.getResultList();
			HashSet<String> makemodel = new HashSet<String>();
			
			for(Vehicle temp:list) {
				makemodel.add(temp.getMake() + "," + temp.getModel());
			}
			
			return makemodel;
		}
	}
	
	@Override
	public List<Vehicle> vehicleRequest(String zipcode, String make, String model, String startdatetime, String enddatetime){
		
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Location> query = currentSession.createQuery("from Location where zipcode = :zipcode", Location.class);
		query.setParameter("zipcode", zipcode);

		Location locqresult = query.uniqueResult();	
		
		Query<Vehicle> query1 = currentSession.createQuery("select v from Vehicle v JOIN "
				+ "Reservation r on v.id = r.vehicle_id and "+
				" (r.end_time > : startdatetime and r.end_time < :enddatetime)" +
				" and v.rental_location =:locid and v.make =:make and v.model=:model and v.status>0", Vehicle.class);
		
		query1.setString("startdatetime", startdatetime);
		query1.setString("enddatetime", enddatetime);
		query1.setParameter("locid",locqresult.getId());
		query1.setParameter("make", make);
		query1.setParameter("model", model);
		List<Vehicle> list1 = query1.getResultList();
		
		
		Query<Vehicle> query2 = currentSession.createQuery("select v from Vehicle v JOIN "
				+ "Reservation r on v.id = r.vehicle_id and " +
				"(r.start_time > :startdatetime and r.start_time < :enddatetime) and " +
				"v.rental_location =:locid and v.make =:make and v.model=:model and v.status>0", Vehicle.class);
		
		
		query2.setString("startdatetime",startdatetime);
		query2.setString("enddatetime", enddatetime);
		query2.setParameter("locid",locqresult.getId());
		query2.setParameter("make", make);
		query2.setParameter("model", model);
		List<Vehicle> list2 = query2.getResultList();
		
		
		Query<Vehicle> query3 = currentSession.createQuery("select v from Vehicle v JOIN "
				+ "Reservation r on v.id = r.vehicle_id and " +
				"(r.end_time > :startdatetime and r.end_time > :enddatetime) and " +
				"(r.start_time < :startdatetime and r.start_time < :enddatetime) and " +
				"v.rental_location =:locid and v.make =:make and v.model=:model and v.status>0", Vehicle.class);
		
		query3.setString("startdatetime",startdatetime);
		query3.setString("enddatetime", enddatetime);
		query3.setParameter("locid",locqresult.getId());
		query3.setParameter("make", make);
		query3.setParameter("model", model);
		List<Vehicle> list3 = query3.getResultList();

		
		Query<Vehicle> query4 = currentSession.createQuery("from Vehicle where rental_location = :locid and make= :make and model=:model and status>0", Vehicle.class);
		query4.setParameter("locid", locqresult.getId());
		query4.setParameter("make", make);
		query4.setParameter("model", model);
		
		List<Vehicle> list4 = query4.getResultList();
		
		List<Vehicle> list5 = new ArrayList<Vehicle>();
		
		list1.addAll(list2);
		list2.addAll(list3);
		for(Vehicle temp: list4) {
			if(!list1.contains(temp) ){
				list5.add(temp);}
		}
		if(list5.isEmpty() == false) {
			return list5;
		}
		else {
			return vehicleSimilar(make, model,startdatetime,enddatetime);
		}
	
		
	}
	
	@Override
	public List<Vehicle> vehicleSimilar(String make, String model, String startdatetime, String enddatetime ){
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Vehicle> query1 = currentSession.createQuery("select v from Vehicle v JOIN "
				+ "Reservation r on v.id = r.vehicle_id and "+
				" (r.end_time > : startdatetime and r.end_time < :enddatetime)" +
				" and v.make =:make and v.model=:model and v.status>0", Vehicle.class);
		
		query1.setString("startdatetime", startdatetime);
		query1.setString("enddatetime", enddatetime);
		query1.setParameter("make", make);
		query1.setParameter("model", model);
		List<Vehicle> list1 = query1.getResultList();
		
		
		Query<Vehicle> query2 = currentSession.createQuery("select v from Vehicle v JOIN "
				+ "Reservation r on v.id = r.vehicle_id and " +
				"(r.start_time > :startdatetime and r.start_time < :enddatetime) and " +
				"v.make =:make and v.model=:model and v.status>0", Vehicle.class);
		
		
		query2.setString("startdatetime",startdatetime);
		query2.setString("enddatetime", enddatetime);
		query2.setParameter("make", make);
		query2.setParameter("model", model);
		List<Vehicle> list2 = query2.getResultList();
		
		
		Query<Vehicle> query3 = currentSession.createQuery("select v from Vehicle v JOIN "
				+ "Reservation r on v.id = r.vehicle_id and " +
				"(r.end_time > :startdatetime and r.end_time > :enddatetime) and " +
				"(r.start_time < :startdatetime and r.start_time < :enddatetime) and " +
				"v.make =:make and v.model=:model and v.status>0", Vehicle.class);
		
		query3.setString("startdatetime",startdatetime);
		query3.setString("enddatetime", enddatetime);
		query3.setParameter("make", make);
		query3.setParameter("model", model);
		List<Vehicle> list3 = query3.getResultList();

		
		Query<Vehicle> query4 = currentSession.createQuery("from Vehicle where make= :make and model=:model and status>0", Vehicle.class);
		query4.setParameter("make", make);
		query4.setParameter("model", model);
		
		List<Vehicle> list4 = query4.getResultList();
		
		List<Vehicle> list5 = new ArrayList<Vehicle>();
		
		list1.addAll(list2);
		list2.addAll(list3);
		for(Vehicle temp: list4) {
			if(!list1.contains(temp) ){
				list5.add(temp);}
		}
		return list5;
	
	}
	
	@Override
	public List<Vehicle> getAllVehicle(){
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Vehicle> query = currentSession.createQuery("from Vehicle where status > 0", Vehicle.class);
		List<Vehicle> list = query.getResultList();
		return list;
	}
	
	@Override
	public List<VehicleType> getVehicleType(){
		Session currentSession = entityManager.unwrap(Session.class);
		Query<VehicleType> query = currentSession.createQuery("from VehicleType", VehicleType.class);
		List<VehicleType> list = query.getResultList();
		return list;
		
	}
	
	@Override
	public void reservation(Reservation r) {
		TimeZone.setDefault(TimeZone.getTimeZone("PDT"));
		int id = r.getVehicle_id();

		Session currentSession = entityManager.unwrap(Session.class);
		String userEmail = r.getUser_email();
		Query<User> userQuery = currentSession.createQuery("from User where email =: userEmail", User.class);
		userQuery.setParameter("userEmail", userEmail);
		User user = userQuery.getSingleResult();
		r.setUser_id(user.getId());
		
		Query<Vehicle> query = currentSession.createQuery("from Vehicle where id= :id", Vehicle.class);
		query.setParameter("id", id);
		Vehicle v = query.uniqueResult();
		System.out.print(v.getVehicle_type());
		

		long milliseconds = r.getEnd_time().getTime() - r.getStart_time().getTime();
		int seconds = (int) milliseconds / 1000;
		int hours = seconds / 3600;
		String vt = v.getVehicle_type();
		
		Query<VehicleType> query2 = currentSession.createQuery("from VehicleType where vehicle_type= :vt and hours >= :hours order by hours asc	", 
				VehicleType.class);
		query2.setMaxResults(1);
		query2.setParameter("vt", vt);
		query2.setParameter("hours", hours);
		System.out.println(hours);
		
		List<VehicleType> list = query2.getResultList();
		String price = list.get(0).getPrice();
		price = String.valueOf(Float.valueOf(price) * (hours == 0 ? 1 : hours));
		
		Transaction t = new Transaction();
		long rand = (long) (Math.random() * 100000000000000L);
		t.setTransaction_id(String.valueOf(rand));

		t.setUser_id(r.getUser_id());
		t.setAmount(price);
		t.setStatus(0);
		System.out.println(price);
		currentSession.save(t);
		
		r.setAmount(price);
		currentSession.save(r);
	}
	
	
	public String getAddress(String zipcode) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Location> query = currentSession.createQuery("from Location where zipcode =:zipcode", Location.class);
		query.setParameter("zipcode", zipcode);
		Location locqresult = query.uniqueResult();
		return locqresult.getStreet() + ", " + locqresult.getCity() + ", " + locqresult.getState() + ", " + locqresult.getCountry() + ", " + locqresult.getZipcode();
	}
	
}
