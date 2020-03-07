package com.calendar.dao;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.calendar.dto.CalendarDto;
import com.calendar.dto.VolunteerDto;
import com.member.dto.MemberDto;
import com.mybatis.db.SqlMapConfig;

public class calendarDaoImpl extends SqlMapConfig implements calendarDao {

	String namespace = "calendar.";
	@Override
	public CalendarDto selectOne(int seq) {
		
		return null;
	}

	@Override
	public int insert(VolunteerDto dto) {
		
		
		SqlSession session = null;
		int res = 0;
		try {
			session = getSqlSessionFactory().openSession();
			res = session.insert(namespace+"insert",dto);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("여기는 마이바티스");
			e.printStackTrace();
		}finally {
			session.commit();
			session.close();
		}
		
		return res;
		
	}

	@Override
	public int update(CalendarDto dto) {
		
		
		
		return 0;
	}

	@Override
	public int delete(int seq) {
		
		return 0;
	}
	
	@Override
	public List<VolunteerDto> getCalViewList(String member_id, String yyyyMM, int center_seq){
		
		
		SqlSession session = null;
		List<VolunteerDto> list = null;
		
		HashMap<String, String> map = new HashMap<>();
		map.put("member_id", member_id);
		map.put("yyyyMM", yyyyMM);
		map.put("center_seq", Integer.toString(center_seq));
		
		
		try {
			session = getSqlSessionFactory().openSession();
			list = session.selectList(namespace+"getCalView",map);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("여기는 마이바티스");
			e.printStackTrace();
		}finally {
			session.close();
		}
		return list;
	}
	
	@Override
	public int getCalCount(String id, String yyyyMMdd) {
		
		
		return 0;
	}
	
	/*
	 * public int insertCalBoard(CalendarDto dto) {
	 * 
	 * SqlSession session = null; int res = 0; try { session =
	 * getSqlSessionFactory().openSession(); res =
	 * session.insert(namespace+"insertCalBoard",dto); } catch (Exception e) { //
	 * TODO: handle exception System.out.println("여기는 마이바티스"); e.printStackTrace();
	 * }finally { session.commit(); session.close(); }
	 * 
	 * return res;
	 * 
	 * }
	 */

}
