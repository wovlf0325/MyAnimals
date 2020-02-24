package com.alarm.dto;



public class AlarmDto {
	private String date;

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public AlarmDto(String date) {
		super();
		this.date = date;
	}
	public AlarmDto() {
		
	}
}
