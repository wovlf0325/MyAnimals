package com.animalinfo.dao;

import java.util.List;

import com.animalinfo.dto.animalinfoDto;

public interface animalinfoDao {
	public List<animalinfoDto> selectAnimal(int Page);
}
