package com.alarm.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alarm.dao.AlarmDao;
import com.alarm.dto.AlarmDto;


@WebServlet("/alarm.do")
public class AlarmController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);		
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		String date = request.getParameter("date");
		System.out.println("alarm controller 날짜: "+date);
		AlarmDao dao = new AlarmDao();
		List<Integer> list = dao.getDate(date);
		for(int i=0; i<list.size(); i++) {
			if(list.get(i)<=7) {
				
			}
		}
		
		
	}

}
