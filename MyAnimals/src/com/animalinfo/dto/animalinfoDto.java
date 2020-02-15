package com.animalinfo.dto;

public class animalinfoDto {
	private int animalNo;					// 유기동물 번호
	private String animalHappenPlace;		// 유기동물 발견장소
	private String animalKindCd;			// 유기동물 종
	private String animalHappenDt;			// 유기동물 발견날짜
	private String animalSexCd;				// 유기동물 성별
	private String animalAge;				// 유기동물 나이
	public int getAnimalNo() {
		return animalNo;
	}
	public void setAnimalNo(int animalNo) {
		this.animalNo = animalNo;
	}
	public String getAnimalHappenPlace() {
		return animalHappenPlace;
	}
	public void setAnimalHappenPlace(String animalHappenPlace) {
		this.animalHappenPlace = animalHappenPlace;
	}
	public String getAnimalKindCd() {
		return animalKindCd;
	}
	public void setAnimalKindCd(String animalKindCd) {
		this.animalKindCd = animalKindCd;
	}
	public String getAnimalHappenDt() {
		return animalHappenDt;
	}
	public void setAnimalHappenDt(String animalHappenDt) {
		this.animalHappenDt = animalHappenDt;
	}
	public String getAnimalSexCd() {
		return animalSexCd;
	}
	public void setAnimalSexCd(String animalSexCd) {
		this.animalSexCd = animalSexCd;
	}
	public String getAnimalAge() {
		return animalAge;
	}
	public void setAnimalAge(String animalAge) {
		this.animalAge = animalAge;
	}
	public animalinfoDto(int animalNo, String animalHappenPlace, String animalKindCd, String animalHappenDt,
			String animalSexCd, String animalAge) {
		super();
		this.animalNo = animalNo;
		this.animalHappenPlace = animalHappenPlace;
		this.animalKindCd = animalKindCd;
		this.animalHappenDt = animalHappenDt;
		this.animalSexCd = animalSexCd;
		this.animalAge = animalAge;
	}
	public animalinfoDto() {
		
	}

}
