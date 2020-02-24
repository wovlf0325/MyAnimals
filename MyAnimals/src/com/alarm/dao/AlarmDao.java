package com.alarm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;



import com.mybatis.db.SqlMapConfig;

public class AlarmDao extends SqlMapConfig{
	String namespace = "alarm.";

	public List<Integer> getDate(String date) {
		SqlSession session = null;
	    List<Integer> list = null;
	    
	    
	    
	    try {
			session = getSqlSessionFactory().openSession();
			list = session.selectList(namespace+"getDate", date);
		} catch (Exception e) {
			// TODO: handle exception
		}finally {
			session.close();
		}
		return list;
	}
}
