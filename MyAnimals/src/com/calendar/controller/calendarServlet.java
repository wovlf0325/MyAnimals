package com.calendar.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.calendar.biz.calendarBiz;
import com.calendar.biz.calendarBizImpl;
import com.calendar.dao.Util;
import com.calendar.dao.calendarDao;
import com.calendar.dao.calendarDaoImpl;
import com.calendar.dto.CalendarDto;
import com.calendar.dto.VolunteerDto;

/**
 * Servlet implementation class calendarServlet
 */
@WebServlet("/calendar.do")
public class calendarServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public calendarServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    private void dispatch(String url, HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException {
		
		RequestDispatcher dispatch = request.getRequestDispatcher(url);
		dispatch.forward(request, response);
	}
	
	private void jsResponse(String msg, String url, HttpServletResponse response) throws IOException {
		String res = "<script type='text/javascript'>"+" alert('"+msg+"');"+" location.href='"+url+"';"+"</script>";
		
		PrintWriter out = response.getWriter();
		out.println(res);
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		
		HttpSession session = request.getSession();
		String command = request.getParameter("command");
		System.out.println("command : " + command);
		
		calendarBiz biz = new calendarBizImpl();
		
		if(command.equals("insertCalendar")) {
			
			int Center_seq = Integer.parseInt(request.getParameter("Center_seq"));
			System.out.println("seq"+Center_seq);
			
			request.setAttribute("Center_seq", Center_seq);
			
			dispatch("insertCalendarForm.jsp", request, response);
			
		}else if(command.equals("insert")) {
			
			String volunteer_title = request.getParameter("volunteer_title");
			String volunteer_content = request.getParameter("volunteer_content");
			int volunteer_maxvolunteer = Integer.parseInt(request.getParameter("volunteer_maxvolunteer"));
			String volunteer_date = request.getParameter("volunteer_date");
			//int volunteer_date = Integer.parseInt(request.getParameter("volunteer_date"));
		
			System.out.println(volunteer_date);
			
			VolunteerDto volunteerDto = new VolunteerDto();
			volunteerDto.setVolunteer_title(volunteer_title);
			volunteerDto.setVolunteer_content(volunteer_content);
			volunteerDto.setVolunteer_maxvolunteer(volunteer_maxvolunteer);
			volunteerDto.setVolunteer_date(volunteer_date);
			System.out.println("ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ");
			System.out.println("여기는 캘린더 서블릿이지롱...");
			System.out.println("성훈아 왜이리 화가나있니");
			System.out.println("그거 알려주기로했짢아 숫자만 가져오는거!");
			System.out.println("너는 디비 만든거 컬럼 알려달라고 시~벌탱");
			
			
			int res = biz.insert(volunteerDto);
			
			if(res>0) {
				jsResponse("입력성공", "", response);
			}else{
				jsResponse("입력실패", "", response);
			}
			
		}
		
		
	}

}
