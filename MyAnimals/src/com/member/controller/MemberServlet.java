package com.member.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;

import com.member.dto.MemberDto;

import com.member.biz.MemberBiz;
import com.member.biz.MemberBizImpl;

@WebServlet("/member.do")
public class MemberServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		HttpSession session = request.getSession();
		String command = request.getParameter("command");
		System.out.println("command : " + command);
		
		MemberBiz biz = new MemberBizImpl();
			
		    if (command.equals("login")) {
			String id = request.getParameter("id");
			String pw = request.getParameter("pw");
			
			MemberDto memberDto = biz.login(id, pw);
			

				 if(memberDto != null) {
						if(memberDto.getMember_delflag().equals("Y")) {
							jsResponse("탈퇴한 회원입니다", "Member/loginpage.jsp", response);
							
						} else if(memberDto.getMember_delflag().equals("N")) {
							session.setAttribute("memberDto", memberDto);
							
							
							if(memberDto.getMember_role().equals("ADMIN")) {
								jsResponse("환영한다 닝겐이여"+id, "main.jsp", response);
							}else if(memberDto.getMember_role().equals("USER")){
								jsResponse("환영한다 닝겐이여"+id, "main.jsp", response);
							}else if(memberDto.getMember_role().equals("CENTER")) {
								jsResponse("환영합니다"+id, "main.jsp", response);
		
							}
							
						}else{
							jsResponse("아이디 와 비밀번호를 확인해 주세요 ㅠ.ㅠ", "main.jsp", response);
						}
				}	
			//유저전체정보'0
		}else if(command.equals("selectall")) {
			List<MemberDto> list = biz.selectList();
			request.setAttribute("memberList", list);
			dispatch("Member/selectalluser.jsp", request, response);
			
			//등급이 USER인 회원정보
		}else if(command.equals("volunteer")) {
			List<MemberDto> memberList = biz.selectUser();
			request.setAttribute("memberList", memberList);
			
			dispatch("Member/selectroleuser.jsp", request, response);
			System.out.println(memberList);
			
			//등급이 CENTER인 회원정보
		}else if(command.equals("centerallinfo")) {
			List<MemberDto> memberList = biz.selectCenter();
			request.setAttribute("memberList", memberList);
			dispatch("Member/selectrolecenter.jsp", request, response);
			System.out.println(memberList);
			
		}else if(command.equals("updateroleform")) {
			List<MemberDto> memberList = biz.selectList();
			request.setAttribute("memberList", memberList);
			dispatch("Member/updaterolepage.jsp", request, response);
		   	
		}else if(command.equals("updaterole")) {
			String id = request.getParameter("id");
			String role = request.getParameter("role");
			System.out.println(id);
			System.out.println(role);
			MemberDto memberDto = biz.selectOne(id);
			memberDto.setMember_id(id);
			memberDto.setMember_role(role);
			request.setAttribute("memberDto", memberDto);
			
			dispatch("Member/realupdaterolepage.jsp", request, response);
		}else if(command.equals("updaterolepopup")) {
			String id = request.getParameter("id");
			String role = request.getParameter("selectrole");
			MemberDto memberDto = new MemberDto();
			memberDto.setMember_id(id);
			memberDto.setMember_role(role);
			
			int res = biz.updateRole(id, role);
			if(res > 0) {
				jsResponse("등급이 변경되었습니다.", "Member/main.jsp", response);
			}else {
				jsResponse("등급 조정 실패", "Member/main.jsp", response);
			}
			
	}else if(command.equals("loginform")) {
			dispatch("Member/loginpage.jsp", request, response);
			
		}else if(command.equals("registselectres")) {
			request.setAttribute("name", request.getAttribute("name"));
			request.setAttribute("email", request.getAttribute("email"));
			dispatch("Member/registselect.jsp", request, response);
			
		}else if(command.equals("registkakao")){
			request.setAttribute("name", request.getParameter("name"));
			request.setAttribute("email", request.getParameter("email"));
			dispatch("Member/registselect.jsp", request, response);
			
		}else if(command.equals("registcenter")) {
			dispatch("Member/registcenterform.jsp", request, response);
			
		}else if(command.equals("registcenterres")) {
			String id = request.getParameter("id");
			String pw = request.getParameter("pw");
			String name = request.getParameter("name");
			int birth = Integer.parseInt(request.getParameter("birth"));
			String email = request.getParameter("email");
			String gender = request.getParameter("gender");
			String address = request.getParameter("address");
			String phone = request.getParameter("phone");
			String nickname = request.getParameter("nickname");
			System.out.println(id);
			System.out.println(pw);
			System.out.println(name);
			System.out.println(birth);
			System.out.println(email);
			System.out.println(gender);
			System.out.println(address);
			System.out.println(phone);
			System.out.println(nickname);
			
			MemberDto memberDto = new MemberDto();
			
			memberDto.setMember_id(id);
			memberDto.setMember_pw(pw);
			memberDto.setMember_name(name);
			memberDto.setMember_birth(birth);
			memberDto.setMember_email(email);
			memberDto.setMember_gender(gender);
			memberDto.setMember_address(address);
			memberDto.setMember_phone(phone);
			memberDto.setMember_nickname(nickname);
			memberDto.setMember_role("CENTER");
			int res = biz.regist(memberDto);
			
			if(res>0) {
				String msg = "가입 성공";
				String url = "Member/loginpage.jsp";
				
				jsResponse(msg, url, response);
			}else {
				jsResponse("실패", "Member/registselect.jsp", response);
			}
			
			
		}else if(command.equals("registuser")) {
			String name = request.getParameter("name");
			String email = request.getParameter("email");
			
			System.out.println(name);
			System.out.println(email);
			
			request.setAttribute("name", name);
			request.setAttribute("email", email);
			
			dispatch("Member/registform.jsp", request, response);
			
			
		}else if(command.equals("registres")) {
			String id = request.getParameter("id");
			String pw = request.getParameter("pw");
			String name = request.getParameter("name");
			int birth = Integer.parseInt(request.getParameter("birth"));
			String email = request.getParameter("email");
			String gender = request.getParameter("gender");
			String address = request.getParameter("address");
			String phone = request.getParameter("phone");
			String nickname = request.getParameter("nickname");
			System.out.println(id);
			System.out.println(pw);
			System.out.println(name);
			System.out.println(birth);
			System.out.println(email);
			System.out.println(gender);
			System.out.println(address);
			System.out.println(phone);
			System.out.println(nickname);
			
			MemberDto memberDto = new MemberDto();
			
			memberDto.setMember_id(id);
			memberDto.setMember_pw(pw);
			memberDto.setMember_name(name);
			memberDto.setMember_birth(birth);
			memberDto.setMember_email(email);
			memberDto.setMember_gender(gender);
			memberDto.setMember_address(address);
			memberDto.setMember_phone(phone);
			memberDto.setMember_nickname(nickname);
			memberDto.setMember_role("USER");
			int res = biz.regist(memberDto);
			
			if(res>0) {
				String msg = "가입 성공";
				String url = "Member/loginpage.jsp";
				
				jsResponse(msg, url, response);
			}else {
				historyBack(response);
			}
			
		}else if(command.equals("myinfo")) {
			String id = request.getParameter("id");
			MemberDto one = biz.selectOne(id);
			request.setAttribute("one", one);
			dispatch("Member/myinfoform.jsp", request, response);
			
		}else if(command.equals("updateuserform")) {
			String id = request.getParameter("id");
			
			MemberDto one = biz.selectOne(id);
			
			request.setAttribute("one", one);
			
			dispatch("Member/updateuser.jsp", request, response);
			
		}else if(command.equals("updateuserres")) {
			String pw = request.getParameter("pw");
			String nickname = request.getParameter("nickname");
			String address = request.getParameter("address");
			String phone = request.getParameter("phone");
			String id = request.getParameter("id");
			
			MemberDto memberDto = new MemberDto();
			
			memberDto.setMember_pw(pw);
			memberDto.setMember_nickname(nickname);
			memberDto.setMember_address(address);
			memberDto.setMember_phone(phone);
			memberDto.setMember_id(id);
			
			int res = biz.updateInfo(memberDto);
			memberDto = biz.login(id, pw);
			session.setAttribute("memberDto", memberDto);
			
			if(res > 0) {
				jsResponse("수정 되셨다", "main.jsp", response);
			}else {
				historyBack(response);
			}
			
		}else if(command.equals("loginmain")) {
			response.sendRedirect("Member/loginmain.jsp");
			
		}else if(command.equals("userdeleteres")) {
			String id = request.getParameter("id");
			MemberDto memberDto = new MemberDto();
			memberDto.setMember_id(id);
			
			int res = biz.delete(id);
			
			
			if(res > 0) {
				jsResponse("계정삭제완료", "main.jsp", response);
			}else {
				historyBack(response);
			}
			
		}else if(command.equals("logout")) {
			session.invalidate();

			jsResponse("로그아웃됬다", "main.jsp", response);


			

		} else if(command.equals("idChk")) {
			String id = request.getParameter("id");
			MemberDto memberDto = biz.idChk(id);
			JSONObject obj = new JSONObject();
			if(memberDto == null || memberDto.getMember_id().equals(null) || memberDto.getMember_id() == null) {
				obj.put("idchk", "false");				
			} else if(memberDto.getMember_id() == id || memberDto.getMember_id().equals(id))  {
				obj.put("idchk", "true");
			}
			
			String res = obj.toJSONString();
			System.out.println("servlet에서 만들어짐" + res);
			
			PrintWriter out = response.getWriter();
			out.print(res);
		}
		
		
	}
	
	
	private void jsResponse(String msg, String url, HttpServletResponse response) throws IOException {
		PrintWriter out = response.getWriter();
		out.println("<script type='text/javascript'>");
		out.println("alert('"+msg+"');");
		out.println("location.href='"+url+"';");
		out.println("</script>");
	}
	
	private void dispatch(String url, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		RequestDispatcher dispatch = request.getRequestDispatcher(url);
		dispatch.forward(request, response);
	}
	
	
	private void historyBack(HttpServletResponse response) throws IOException {
		PrintWriter out = response.getWriter();
		out.println("<script type='text/javascript'>");
		out.println("history.back()");
		out.println("</script>");
	}

}
