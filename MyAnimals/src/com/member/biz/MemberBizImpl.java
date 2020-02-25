package com.member.biz;

import java.util.List;

import com.member.dao.MemberDao;
import com.member.dao.MemberDaoImpl;
import com.member.dto.MemberDto;

public class MemberBizImpl implements MemberBiz {
   private MemberDao dao = new MemberDaoImpl();
	@Override
	public List<MemberDto> selectList() {
		// TODO Auto-generated method stub
		return dao.selectList();
	}

	@Override
	public List<MemberDto> selectUser() {
		// TODO Auto-generated method stub
		return dao.selectUser();
	}

	@Override
	public List<MemberDto> selectCenter() {
		// TODO Auto-generated method stub
		return dao.selectCenter();
	}
	

	@Override
	public int updateRole(String id,String role) {
		// TODO Auto-generated method stub
		return dao.updateRole(id,role);
	}

	@Override
	public MemberDto selectOne(String id) {
		// TODO Auto-generated method stub
		return dao.selectOne(id);
	}

	@Override
	public int updateInfo(MemberDto dto) {
		// TODO Auto-generated method stub
		return dao.updateInfo(dto);
	}

	@Override
	public int delete(String id) {
		// TODO Auto-generated method stub
		return dao.delete(id);
	}

	@Override
	public MemberDto login(String id, String pw) {
		// TODO Auto-generated method stub
		return dao.login(id, pw);
	}

	@Override
	public int regist(MemberDto dto) {
		// TODO Auto-generated method stub
		return dao.regist(dto);
	}

	@Override
	public String findId(String email) {
		// TODO Auto-generated method stub
		return dao.findId(email);
	}

//	@Override
//	public int findPw(String id, String email) {
//		// TODO Auto-generated method stub
//		return dao.findPw(id, email);
//	}

	@Override
	public int findPw(String id, String email) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public MemberDto idChk(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MemberDto nicknameChk(String nickname) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MemberDto emailChk(String email) {
		// TODO Auto-generated method stub
		return null;
	}
	public int changePw(String id, String pw) {
		// TODO Auto-generated method stub
		return dao.changePw(id, pw);
	}
	




	

}