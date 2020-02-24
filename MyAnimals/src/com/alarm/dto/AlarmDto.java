package com.alarm.dto;

import java.util.Date;

public class AlarmDto {
	private Date date;

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public AlarmDto(Date date) {
		super();
		this.date = date;
	}
	public AlarmDto() {
		
	}
}
