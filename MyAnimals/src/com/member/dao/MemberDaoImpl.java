package com.member.dao;

import java.util.List;

import com.member.dto.MemberDto;
import com.mybatis.db.SqlMapConfig;

public class MemberDaoImpl extends SqlMapConfig implements MemberDao {

	@Override
	public List<MemberDto> selectList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<MemberDto> selectUser() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<MemberDto> selectCenter() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateRole(String id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public MemberDto selectOne(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateInfo(MemberDto dto) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int delete(String id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public MemberDto login(String id, String pw) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int regist(MemberDto dto) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public MemberDto findId(String email) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MemberDto findPw(String id, String email) {
		// TODO Auto-generated method stub
		return null;
	}

}
