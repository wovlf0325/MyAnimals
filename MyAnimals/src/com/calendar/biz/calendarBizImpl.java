package com.calendar.biz;

import java.util.List;

import com.calendar.dao.calendarDao;
import com.calendar.dao.calendarDaoImpl;
import com.calendar.dto.CalendarDto;

public class calendarBizImpl implements calendarBiz {
	
	calendarDao dao = new calendarDaoImpl();

	@Override
	public CalendarDto selectOne(int seq) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int insert(CalendarDto dto) {
		// TODO Auto-generated method stub
		return dao.insert(dto);
	}

	@Override
	public int update(CalendarDto dto) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int delete(int seq) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	public List<CalendarDto> getCalViewList(String member_id, String yyyyMM){
		return dao.getCalViewList(member_id, yyyyMM);
	}
	
	public int getCalCount(String id, String yyyyMMdd) {
		return 0;
		
	}
	
	public int insertCalBoard(CalendarDto dto) {
		return dao.insertCalBoard(dto);
		
	}

}
