package com.calendar.biz;

import java.util.List;

import com.calendar.dto.CalendarDto;

public interface calendarBiz {
	
	public CalendarDto selectOne(int seq);
	public int insert(CalendarDto dto);
	public int update(CalendarDto dto);
	public int delete(int seq);
	public List<CalendarDto> getCalViewList(String member_id, String yyyyMM);
	public int getCalCount(String id, String yyyyMMdd);
	public int insertCalBoard(CalendarDto dto);

}
