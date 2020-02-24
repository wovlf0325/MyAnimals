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
			
			MemberDto dto = biz.login(id, pw);
			
			if(dto != null) {
				if(dto.getMember_delflag().equals("Y")) {
					jsResponse("탈퇴한 회원입니다", "Member/loginpage.jsp", response);
					
				} else if(dto.getMember_delflag().equals("N")) {
					session.setAttribute("dto", dto);
					session.setMaxInactiveInterval(10*60);
					
					if(dto.getMember_role().equals("ADMIN")) {
						jsResponse("환영한다 닝겐이여"+id, "Member/adminmain.jsp", response);
					}else if(dto.getMember_role().equals("USER")){
						jsResponse("환영한다 닝겐이여"+id, "Member/loginmain.jsp", response);
					}else if(dto.getMember_role().equals("CENTER")) {
						jsResponse("환영합니다"+id, "Member/loginmain.jsp", response);
					}
					else {
						jsResponse("아이디 와 비밀번호를 확인해 주세요 ㅠ.ㅠ", "Member/loginpage.jsp", response);
					}
				}
				
		}
			//유저전체정보
		}else if(command.equals("selectall")) {
			List<MemberDto> list = biz.selectList();
			request.setAttribute("list", list);
			dispatch("Member/selectalluser.jsp", request, response);
			
			//등급이 USER인 회원정보
		}else if(command.equals("volunteer")) {
			List<MemberDto> list = biz.selectUser();
			request.setAttribute("list", list);
			
			dispatch("Member/selectroleuser.jsp", request, response);
			System.out.println(list);
			
			//등급이 CENTER인 회원정보
		}else if(command.equals("centerallinfo")) {
			List<MemberDto> list = biz.selectCenter();
			request.setAttribute("list", list);
			dispatch("Member/selectrolecenter.jsp", request, response);
			System.out.println(list);
			
		}else if(command.equals("updateroleform")) {
			List<MemberDto> list = biz.selectList();
			request.setAttribute("list", list);
			dispatch("Member/updaterolepage.jsp", request, response);
		   	
		}else if(command.equals("updaterole")) {
			String id = request.getParameter("id");
			String role = request.getParameter("role");
			System.out.println(id);
			System.out.println(role);
			MemberDto dto = biz.selectOne(id);
			dto.setMember_id(id);
			dto.setMember_role(role);
			request.setAttribute("dto", dto);
			
			dispatch("Member/realupdaterolepage.jsp", request, response);
		}else if(command.equals("updaterolepopup")) {
			String id = request.getParameter("id");
			String role = request.getParameter("selectrole");
			MemberDto dto = new MemberDto();
			dto.setMember_id(id);
			dto.setMember_role(role);
			
			int res = biz.updateRole(id, role);
			if(res > 0) {
				jsResponse("등급이 변경되었습니다.", "Member/updaterolepage.jsp", response);
			}else {
				jsResponse("등급 조정 실패", "Member/updaterolepage.jsp", response);
			}
			
	}else if(command.equals("loginform")) {
			response.sendRedirect("Member/loginpage.jsp");
			
		}else if(command.equals("registselectres")) {
			response.sendRedirect("Member/registselect.jsp");
			
		}else if(command.equals("registcenter")) {
			response.sendRedirect("Member/registcenterform.jsp");
			
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
			
			MemberDto dto = new MemberDto();
			
			dto.setMember_id(id);
			dto.setMember_pw(pw);
			dto.setMember_name(name);
			dto.setMember_birth(birth);
			dto.setMember_email(email);
			dto.setMember_gender(gender);
			dto.setMember_address(address);
			dto.setMember_phone(phone);
			dto.setMember_nickname(nickname);
			dto.setMember_role("CENTER");
			int res = biz.regist(dto);
			
			if(res>0) {
				String msg = "가입 성공";
				String url = "Member/loginpage.jsp";
				
				jsResponse(msg, url, response);
			}else {
				jsResponse("실패", "Member/registselect.jsp", response);
			}
			
			
		}else if(command.equals("registuser")) {
			response.sendRedirect("Member/registform.jsp");
			
			
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
			
			MemberDto dto = new MemberDto();
			
			dto.setMember_id(id);
			dto.setMember_pw(pw);
			dto.setMember_name(name);
			dto.setMember_birth(birth);
			dto.setMember_email(email);
			dto.setMember_gender(gender);
			dto.setMember_address(address);
			dto.setMember_phone(phone);
			dto.setMember_nickname(nickname);
			dto.setMember_role("USER");
			int res = biz.regist(dto);
			
			if(res>0) {
				String msg = "가입 성공";
				String url = "Member/loginpage.jsp";
				
				jsResponse(msg, url, response);
			}else {
				historyBack(response);
			}
			
		}else if(command.equals("myinfo")) {
			response.sendRedirect("Member/myinfoform.jsp");
			
		}else if(command.equals("updateuserform")) {
			response.sendRedirect("Member/updateuser.jsp");
			
		}else if(command.equals("updateuserres")) {
			String pw = request.getParameter("pw");
			String nickname = request.getParameter("nickname");
			String address = request.getParameter("address");
			String phone = request.getParameter("phone");
			String id = request.getParameter("id");
			
			MemberDto dto = new MemberDto();
			
			dto.setMember_pw(pw);
			dto.setMember_nickname(nickname);
			dto.setMember_address(address);
			dto.setMember_phone(phone);
			dto.setMember_id(id);
			
			int res = biz.updateInfo(dto);
			dto = biz.login(id, pw);
			session.setAttribute("dto", dto);
			
			if(res > 0) {

				jsResponse("수정 되셨다", "Member/myinfoform.jsp", response);
			}else {
				historyBack(response);
			}
			
		}else if(command.equals("loginmain")) {
			response.sendRedirect("Member/loginmain.jsp");
			
		}else if(command.equals("userdeleteres")) {
			String id = request.getParameter("id");
			MemberDto dto = new MemberDto();
			dto.setMember_id(id);
			
			int res = biz.delete(id);
			
			
			if(res > 0) {
				jsResponse("계정삭제완료", "Member/loginmain.jsp", response);
			}else {
				historyBack(response);
			}
			
		}else if(command.equals("logout")) {
			session.invalidate();
<<<<<<< HEAD
			jsResponse("로그아웃됬다", "Member/member.do?command=loginmain", response);
			
		} else if(command.equals("idChk")) {
			String id = request.getParameter("id");
			MemberDto dto = biz.idChk(id);
			JSONObject obj = new JSONObject();
			if(dto == null || dto.getId().equals(null) || dto.getId() == null) {
				obj.put("idchk", "false");				
			} else if(dto.getId() == id || dto.getId().equals(id))  {
				obj.put("idchk", "true");
			}
			
			String res = obj.toJSONString();
			System.out.println("servlet에서 만들어짐" + res);
			
			PrintWriter out = response.getWriter();
			out.print(res);
			
=======
			jsResponse("로그아웃됬다", "Member/loginmain.jsp", response);
>>>>>>> afe6fec46afecc7d23cd490b4b5fd43afbe07408
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
