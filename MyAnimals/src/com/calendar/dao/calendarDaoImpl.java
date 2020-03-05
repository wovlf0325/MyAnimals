package com.calendar.dao;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
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
	public List<VolunteerDto> getCalViewList(String member_id, String yyyyMM){
		
		/*
		 * String resource = "com/mybatis/config.xml"; InputStream inputStream = null;
		 * 
		 * // 자 주석이다 //SELECT * FROM (SELECT (ROW_NUMBER() OVER(PARTITION BY
		 * SUBSTR(VOLUNTEER_MDATE,1,8) ORDER BY VOLUNTEER_MDATE)) RN, VOLUNTEER_SEQ,
		 * MEMBER_ID, VOLUNTEER_TITLE, VOLUNTEER_CONTENT, VOLUNTEER_MDATE,
		 * VOLUNTEER_REGDATE FROM VOLUNTEER WHERE MEMBER_ID=#{member_id} AND
		 * SUBSTR(VOLUNTEER_MDATE,1,6)=#{volunyeer_mdate,1,6} // WHERE RN BETWEEN 1 AND
		 * 3 " try { inputStream = Resources.getResourceAsStream(resource); } catch
		 * (IOException e) { // TODO Auto-generated catch block e.printStackTrace(); }
		 * SqlSessionFactory sqlSessionFactory = new
		 * SqlSessionFactoryBuilder().build(inputStream); SqlSession session =
		 * sqlSessionFactory.openSession(); List<CalendarDto> list =
		 * session.selectList("com.calendar.mapper.getCalView"); System.out.println();
		 * return list;
		 */
		
		SqlSession session = null;
		List<VolunteerDto> list = null;
		String user = "ADMIN";
		
		try {
			session = getSqlSessionFactory().openSession();
			list = session.selectList(namespace+"getCalView",user);
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
	
	public int insertCalBoard(CalendarDto dto) {
		
		SqlSession session = null;
		int res = 0;
		try {
			session = getSqlSessionFactory().openSession();
			res = session.insert(namespace+"insertCalBoard",dto);
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

}
