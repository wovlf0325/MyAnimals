package com.alarm.biz;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.alarm.dao.AlarmDao;
import com.alarm.dao.AlarmDaoImpl;
import com.alarm.dto.AlarmDateDto;
import com.alarm.dto.AlarmDto;

public class AlarmBizImpl implements AlarmBiz {
	AlarmDao dao = new AlarmDaoImpl();

	@Override
	public List<AlarmDateDto> getDate(String member_id, String date) {

		List<AlarmDto> datelist = dao.getDate(member_id);
		List<AlarmDateDto> list = new ArrayList<AlarmDateDto>();

		DateFormat sdFormat = new SimpleDateFormat("yyyyMMdd");
		if (datelist.size() != 0) {
			try {
				for (int i = 0; i < datelist.size(); i++) {
					Date today = sdFormat.parse(date);
					Date volunteer_date = sdFormat.parse(datelist.get(i).getVolunteer_date());
					long dayLeft = (volunteer_date.getTime()-today.getTime())/(24*60*60*1000);
					if(dayLeft<=1000||dayLeft>=0) {
						AlarmDateDto dto = new AlarmDateDto();
						dto.setVolunteer_title(datelist.get(i).getVolunteer_title());
						dto.setVolunteer_dayLeft((int)dayLeft);
						list.add(dto);
						System.out.println("alarm biz volunteer_date : "+volunteer_date);
						System.out.println("alarm biz dayLeft : "+dayLeft);
					}
				}
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return list;
	}
}
