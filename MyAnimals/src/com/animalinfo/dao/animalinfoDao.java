package com.animalinfo.dao;

import java.io.IOException;
import java.util.List;
import java.util.Map;



public interface animalinfoDao {
	public Map<String, String[]> selectAll() throws IOException;
	public Map<String, String[]> selectLocation(String sido);
	
}
