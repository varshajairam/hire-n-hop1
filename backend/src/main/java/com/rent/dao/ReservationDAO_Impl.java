package com.rent.dao;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rent.model.Reservation;
import com.rent.model.User;
import com.rent.model.Vehicle;
import com.rent.model.VehicleType;

@Repository
public class ReservationDAO_Impl implements ReservationDAO {
	
	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Reservation> getReservations(String email) {
		TimeZone.setDefault(TimeZone.getTimeZone("PDT"));
		Session currentSession = entityManager.unwrap(Session.class);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		Timestamp timestamp = new java.sql.Timestamp(System.currentTimeMillis());
		Timestamp st = new java.sql.Timestamp(timestamp.getTime() - (420 * 60* 1000));
		Query<User> userQuery = currentSession.createQuery("from User where email =: userEmail", User.class);
		userQuery.setParameter("userEmail", email);
		User user = userQuery.getSingleResult();
		
		Query<Reservation> query = currentSession.createQuery("from Reservation r where user_id = :user_id and r.return_status = 0 and r.start_time >= : current_time order by r.id desc ", Reservation.class);
		query.setParameter("user_id", user.getId());
		query.setString("current_time",sdf.format(st));
		return query.getResultList();	
	}
	
	@Override
	public List<Reservation> pastReservations(String email) {
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		Session currentSession = entityManager.unwrap(Session.class);
		TimeZone.setDefault(TimeZone.getTimeZone("PDT"));
//		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		Timestamp timestamp = new java.sql.Timestamp(System.currentTimeMillis());
		Timestamp st = new java.sql.Timestamp(timestamp.getTime() - (420 * 60* 1000));
		Query<User> userQuery = currentSession.createQuery("from User where email =: userEmail", User.class);
		userQuery.setParameter("userEmail", email);
		User user = userQuery.getSingleResult();
	
		Query<Reservation> query = currentSession.createQuery("from Reservation r where user_id = :user_id and (r.return_status in (-1, 1) or r.return_time <= :current_time) or (r.return_status = 0 and r.end_time <= :current_time)  order by r.id desc ", Reservation.class);
		query.setParameter("user_id", user.getId());
		query.setString("current_time",sdf.format(st));
		return query.getResultList();	
	}
	
	@Override
	public List<Reservation> currentReservations(String email) {
		TimeZone.setDefault(TimeZone.getTimeZone("PDT"));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		Timestamp timestamp = new java.sql.Timestamp(System.currentTimeMillis());
		Timestamp st = new java.sql.Timestamp(timestamp.getTime() - (420 * 60* 1000));
		Session currentSession = entityManager.unwrap(Session.class);
		Query<User> userQuery = currentSession.createQuery("from User where email =: userEmail", User.class);
		userQuery.setParameter("userEmail", email);
		User user = userQuery.getSingleResult();
	
		Query<Reservation> query = currentSession.createQuery("from Reservation r where user_id = :user_id and r.return_status = 2 or (r.return_status = 0 and r.end_time >= :current_time) and r.start_time <= :current_time and r.return_time IS NULL order by r.id desc ", Reservation.class);
		query.setParameter("user_id", user.getId());
		query.setString("current_time",sdf.format(st));
		return query.getResultList();	
	}
	
	@Override
	public List<Reservation> upcomingReservations(String email) {
		TimeZone.setDefault(TimeZone.getTimeZone("PDT"));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		Timestamp timestamp = new java.sql.Timestamp(System.currentTimeMillis());
		Timestamp st = new java.sql.Timestamp(timestamp.getTime() - (420 * 60* 1000));
		Session currentSession = entityManager.unwrap(Session.class);
		Query<User> userQuery = currentSession.createQuery("from User where email =: userEmail", User.class);
		userQuery.setParameter("userEmail", email);
		User user = userQuery.getSingleResult();
		System.out.println(sdf.format(st));
		Query<Reservation> query = currentSession.createQuery("from Reservation r where user_id = :user_id and (r.return_status order = 0 and r.start_time >= :current_time) by r.id desc ", Reservation.class);
		query.setParameter("user_id", user.getId());
		query.setString("current_time",sdf.format(st));
		return query.getResultList();	
	}

	@Override
	@Transactional
	public void endReservation(Reservation id) {
		TimeZone.setDefault(TimeZone.getTimeZone("PDT"));
		TimeZone.setDefault(TimeZone.getTimeZone("PDT"));
		Session currentSession = entityManager.unwrap(Session.class);
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Query endReservationQuery = currentSession.createQuery("Update Reservation r set r.return_time= :current_time, r.return_status = :status, r.amount= :amount where r.id = :id ");
		endReservationQuery.setParameter("id",id.getId());
		endReservationQuery.setString("amount", id.getAmount());
		endReservationQuery.setParameter("status",1);
		endReservationQuery.setString("current_time",sdf.format(timestamp));
		endReservationQuery.executeUpdate();
	}

	@Override
	@Transactional
	public List<String> cancelReservation(Reservation id) {
		TimeZone.setDefault(TimeZone.getTimeZone("PDT"));
		Session currentSession = entityManager.unwrap(Session.class);
		TimeZone.setDefault(TimeZone.getTimeZone("PDT"));
		Query<Reservation> reservationQuery = currentSession.createQuery("from Reservation where id =: id", Reservation.class);
		reservationQuery.setParameter("id", id.getId());
		Reservation reservation = reservationQuery.getSingleResult();
		Timestamp timestamp = new java.sql.Timestamp(System.currentTimeMillis());
		 Date date= new Date(System.currentTimeMillis());
			Timestamp st = new java.sql.Timestamp(reservation.getStart_time().getTime() + (420 * 60* 1000));
			long milliseconds = st.getTime() - timestamp.getTime() ;
			int seconds = (int) milliseconds / 1000;
			int hours = seconds / 3600;
			int mins = seconds * 60 / 3600;
			int subtract = 0;
			subtract = ((mins - (hours * 60)) * 60);
			int extraSeconds = (int) (seconds - (hours  * 3600 )- subtract);
			
			Query<Vehicle> query = currentSession.createQuery("from Vehicle where id= :id", Vehicle.class);
			query.setParameter("id", reservation.getVehicle_id());
			Vehicle v = query.uniqueResult();
			System.out.print(v.getVehicle_type());
			
			String vt = v.getVehicle_type();
			
			Query<VehicleType> query2 = currentSession.createQuery("from VehicleType where vehicle_type= :vt and hours >= :hours order by hours asc	", 
					VehicleType.class);
			query2.setMaxResults(1);
			query2.setParameter("vt", vt);
			query2.setParameter("hours", 0);

			List<VehicleType> list = query2.getResultList();
			String price = list.get(0).getPrice();
			
			if(mins <= 60) {
				List<String> result = new ArrayList();
				result.add("apply cancellation fees");
				result.add(price);
				
				Query endReservationQuery = currentSession.createQuery("Update Reservation r set r.return_status = :status,  r.amount= :amount  where r.id = :id ");
				endReservationQuery.setParameter("id",id.getId());
				endReservationQuery.setParameter("status",-1);
				endReservationQuery.setParameter("amount", String.valueOf(Float.parseFloat(reservation.getAmount()) + Float.parseFloat(price)));
				endReservationQuery.executeUpdate();
				
				return result;
				
			} else {
		
		Query endReservationQuery = currentSession.createQuery("Update Reservation r set r.return_status = :status where r.id = :id ");
		endReservationQuery.setParameter("id",id.getId());
		endReservationQuery.setParameter("status",-1);
		endReservationQuery.executeUpdate();
		
		List<String> result = new ArrayList();
		result.add("no cancellation fees");
		result.add("0");
		
		return result;
			}
		
	}

	@Override
	@Transactional
	public List<Integer> startReservations(Reservation id) {
		TimeZone.setDefault(TimeZone.getTimeZone("PDT"));
		Session currentSession = entityManager.unwrap(Session.class);
		
		Query<Reservation> reservationQuery = currentSession.createQuery("from Reservation where id =: id", Reservation.class);
		reservationQuery.setParameter("id", id.getId());
		id = reservationQuery.getSingleResult();
		System.out.println("asd" + id.getEnd_time().getTimezoneOffset());
		
		Timestamp timestamp = new java.sql.Timestamp(System.currentTimeMillis());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Query endReservationQuery = currentSession.createQuery("Update Reservation r set r.return_status = :status where r.id = :id ");
		endReservationQuery.setParameter("id",id.getId());
		endReservationQuery.setParameter("status",2);
		endReservationQuery.executeUpdate();
		 Date date= new Date(System.currentTimeMillis());
		System.out.println("id.getEnd_time().getTime()" + (id.getEnd_time()));
		System.out.println("timestamp.getTime()" + timestamp);
		Timestamp st = new java.sql.Timestamp(id.getEnd_time().getTime() + (420 * 60* 1000));
		System.out.println("new timespta" + st);
		long milliseconds = st.getTime() - timestamp.getTime() ;
		int seconds = (int) milliseconds / 1000;
		int hours = seconds / 3600;
		int mins = seconds * 60 / 3600;
		int subtract = 0;
		subtract = ((mins - (hours * 60)) * 60);
		int extraSeconds = (int) (seconds - (hours  * 3600 )- subtract);
		
		List<Integer> result = new ArrayList();
		result.add(mins);
		result.add(extraSeconds);
		
		return result;
		
	}

	@Override
	public List<Integer> getCurrentReservationStatus(String email) {
		TimeZone.setDefault(TimeZone.getTimeZone("PDT"));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		Session currentSession = entityManager.unwrap(Session.class);
		Query<User> userQuery = currentSession.createQuery("from User where email =: userEmail", User.class);
		userQuery.setParameter("userEmail", email);
		User user = userQuery.getSingleResult();
	
		Query<Reservation> query = currentSession.createQuery("from Reservation r where user_id = :user_id and r.return_status = 2 order by r.id desc ", Reservation.class);
		query.setParameter("user_id", user.getId());
		query.setMaxResults(1);
		List<Integer> result = new ArrayList();
		if(query.getResultList().size() > 0) {
			Reservation id =  query.getSingleResult();	
			System.out.println("id.getEnd_time().getTime()" + (id.getEnd_time()));
			Timestamp st = new java.sql.Timestamp(id.getEnd_time().getTime() + (420 * 60* 1000));
			System.out.println("id.getEnd_time().getTime()" + (st));
			long milliseconds = st.getTime() - timestamp.getTime() ;
			int seconds = (int) milliseconds / 1000;
			int hours = seconds / 3600;
			int mins = seconds * 60 / 3600;
			int subtract = 0;
			System.out.println("new timespta" + hours);
			subtract = ((mins - (hours * 60)) * 60);
			int extraSeconds = (int) (seconds - (hours  * 3600 )- subtract);
			
			
			result.add(mins);
			result.add(extraSeconds);
		}
		
		
		return result;
	} 
	
	

}