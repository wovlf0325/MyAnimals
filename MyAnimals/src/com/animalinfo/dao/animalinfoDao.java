package com.animalinfo.dao;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.animalinfo.dto.animalinfoDto;

public interface animalinfoDao {
	public List<animalinfoDto> selectAnimal(int total, String sido, String gugun);
	public Map<String, String[]> selectAll() throws IOException;
	public Map<String, String[]> selectLocation(String sido);
	
}
