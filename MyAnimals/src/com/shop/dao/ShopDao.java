package com.shop.dao;

import java.util.List;

import com.shop.dto.ShopDto;

public interface ShopDao {
	public List<ShopDto> selectShopList();
	public ShopDto selectShopOne(int shop_seq);
	public int insertShopList(ShopDto dto);
	public int deleteShopList(int shop_seq);
	public int updateShopList(ShopDto dto);
	
	public List<ShopDto> search(String searchTitle,String searchContent);
	
	
	
}
