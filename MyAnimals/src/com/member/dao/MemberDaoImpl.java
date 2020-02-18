package com.member.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.member.dto.MemberDto;

public class MemberDaoImpl extends SqlMapConfig implements MemberDao {
	
	String namespace = "member.";

	//관리자 메뉴
	
	//전체 검색
	@Override
	public List<MemberDto> selectList() {
	    SqlSession session = null;
	    List<MemberDto> list = null;
	    
	    try {
			session = getSqlSessionFactory().openSession();
			list = session.selectList(namespace+"selectList");
		} catch (Exception e) {
			// TODO: handle exception
		}finally {
			session.close();
		}
		return list;
	}
    //봉사자 검색
	@Override
	public List<MemberDto> selectUser() {
		SqlSession session = null;
		List<MemberDto> list = null;
		
		try {
			session = getSqlSessionFactory().openSession();
			list = session.selectList(namespace+"selectUser");
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(list);
		}finally {
			session.close();
		}
		return list;
	}
	
	//센처장 검색
	@Override
	public List<MemberDto> selectCenter() {
		SqlSession session = null;
		List<MemberDto> list = null;
		
		try {
			session = getSqlSessionFactory().openSession();
			list = session.selectList(namespace+"selectCenter");
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(list);
		}finally {
			session.close();
		}
		return list;
	}
	
	//등급 변경
	@Override
	public int updateRole(String id,String role) {
		SqlSession session = null;
		int res = 0;
		
		MemberDto dto = new MemberDto();
		dto.setMember_id(id);
		dto.setMember_role(role);
		
		try {
			session = getSqlSessionFactory().openSession();
			res = session.update(namespace+"updateRole",dto);
			
			if(res>0) {
				session.commit();
			}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("error");
		}finally {
			session.close();
		}
		return res;
	}
	// 회원 메뉴
		// 내 정보
	@Override
	public MemberDto selectOne(String id) {
		SqlSession session = null;
		MemberDto dto = new MemberDto();
		
		dto.setMember_id(id);
		
		try {
			session = getSqlSessionFactory().openSession();
			dto = session.selectOne(namespace+"selectOne",id);
		} catch (Exception e) {
			// TODO: handle exception
		}finally {
			session.close();
		}
		return dto;
	}
	// 내 정보 수정
	@Override
	public int updateInfo(MemberDto dto) {
		SqlSession session = null;
		int res = 0;
		
		try {
			session = getSqlSessionFactory().openSession();
			res = session.update(namespace+"updateInfo",dto);
			
			if(res>0) {
				session.commit();
			}
		} catch (Exception e) {
			// TODO: handle exception
		}finally {
			session.close();
		}
		return res;
	}
	// 회원 탈퇴 (delflag로 관리)
	@Override
	public int delete(String id) {
		SqlSession session = null;
		int res = 0;
		
		MemberDto dto = new MemberDto();
		
		dto.setMember_id(id);
		
		try {
			session = getSqlSessionFactory().openSession();
			res = session.update(namespace+"delete",id);
			
			if(res > 0) {
				session.commit();
			}
		} catch (Exception e) {
			// TODO: handle exception
		}finally {
			session.close();
		}
		return res;
	}
   //로그인 및 회원가입
	
	// 로그인
	@Override
	public MemberDto login(String id, String pw) {
		SqlSession session = null;
		MemberDto dto = new MemberDto();
		Map<String, String> map = new HashMap<>();
		map.put("id",id);
		map.put("pw", pw);
		
		try {
			session = getSqlSessionFactory().openSession();
			dto = session.selectOne(namespace+"login",map);
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}finally {
			session.close();
		}
		return dto;
	}
	// 회원가입
	@Override
	public int regist(MemberDto dto) {
		SqlSession session = null;
		int res = 0;
		System.out.println(dto.getMember_id());
		
		try {
			session = getSqlSessionFactory().openSession();
			res = session.insert(namespace+"regist",dto);
			
			if(res>0) {
				session.commit();
			}
		} catch (Exception e) {
			// TODO: handle exception
		}finally {
			session.close();
		}System.out.println(res);
		return res;
	}
	// 아이디 찾기
	@Override
	public int findId(String email) {
		int res = 0;
		System.out.println(email);
		SqlSession session = null;
		try {
			session = getSqlSessionFactory().openSession();
			res = session.selectOne(namespace + "selectOneFindId",email);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("[error] : selectOneFindId");
			e.printStackTrace();
		} finally {
			session.close();
		}
		
		return res;
	}
	// 비밀번호 찾기
	@Override
	public int findPw(String id, String email) {
		int res = 0;
		
		Map<String, String> map = new HashMap<>();
		map.put("id", id);
		map.put("email", email);
		SqlSession session = null;
		try {
			session = getSqlSessionFactory().openSession();
			res = session.selectOne(namespace + "selectOneFindPw",map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("[error] : selectOneFindPw");
			e.printStackTrace();
		} finally {
			session.close();
		}
		
		return res;
		
	}
	
	// 비밀번호 변경
	@Override
	public int changePw(String id, String pw) {
		int res = 0;
		
		Map<String, String> map = new HashMap<>();
		map.put("id", id);
		map.put("pw", pw);
		System.out.println("임시비번 : "+pw);
		SqlSession session = null;
		try {
			session = getSqlSessionFactory().openSession();
			res = session.update(namespace + "changePw",map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("[error] : changePw");
			e.printStackTrace();
		} finally {
			session.commit();
			session.close();
		}
		return res;
	}
	// 아이디 가져오기
	@Override
	public MemberDto getId(String email) {
		MemberDto dto = null;
		SqlSession session = null;
		try {
			session = getSqlSessionFactory().openSession();
			dto = session.selectOne(namespace + "getId",email);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("[error] : getId");
			e.printStackTrace();
		} finally {
			session.commit();
			session.close();
		}
		return dto;
	}
	

}
