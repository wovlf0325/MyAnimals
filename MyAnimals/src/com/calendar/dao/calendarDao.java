package com.calendar.dao;

import java.util.List;

import com.calendar.dto.CalendarDto;
import com.calendar.dto.VolunteerDto;

public interface calendarDao {
	
	public CalendarDto selectOne(int seq);
	public int insert(VolunteerDto dto);
	public int update(CalendarDto dto);
	public int delete(int seq);
	public List<VolunteerDto> getCalViewList(String member_id, String yyyyMM);
	public int getCalCount(String id, String yyyyMMdd);
	public int insertCalBoard(CalendarDto dto);
}
