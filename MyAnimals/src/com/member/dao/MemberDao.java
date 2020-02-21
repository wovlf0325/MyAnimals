package com.member.dao;

import java.util.List;

import com.member.dto.MemberDto;

public interface MemberDao {
	
	// 관리자 메뉴
	// 전체 검색
	public List<MemberDto> selectList();
	// 봉사자 검색
	public List<MemberDto> selectUser();
	// 센처장 검색
	public List<MemberDto> selectCenter();
	// 등급변경
	public int updateRole(String id,String role);
	
	// 회원 메뉴
	// 내 정보
	public MemberDto selectOne(String id);
	// 내 정보 수정
	public int updateInfo(MemberDto dto);
	// 회원 탈퇴 (delflag로 관리)
	public int delete(String id);
		
	// 로그인 & 회원가입
	// 로그인
	public MemberDto login(String id, String pw);
	// 회원가입
	public int regist(MemberDto dto);
	// 아이디 찾기
	public MemberDto findId(String email);
	// 비밀번호 찾기
	public MemberDto findPw(String id, String email);
    
}