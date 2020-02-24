package com.alarm.biz;

import java.util.List;

import com.alarm.dao.AlarmDao;
import com.alarm.dao.AlarmDaoImpl;
import com.alarm.dto.AlarmDto;

public class AlarmBizImpl implements AlarmBiz {
	AlarmDao dao = new AlarmDaoImpl();
	@Override
	public List<Integer> getDate(String date) {
		
		return dao.getDate(date);
	}

}
