package com.animalinfo.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.animalinfo.dao.animalinfoDao;
import com.animalinfo.dao.animalinfoDaoImpl;
import com.animalinfo.dto.animalinfoDto;
import com.google.gson.Gson;
import com.google.gson.JsonIOException;

@WebServlet("/animalinfocontroller.do")
public class animalinfocontroller extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		String command = request.getParameter("command");
		System.out.println("command : " + command);
		animalinfoDao dao = new animalinfoDaoImpl();
		if (command.equals("select")) {
			System.out.println("ajax로 무엇이왔을까");
			String sido = request.getParameter("sido");
			String gugun = request.getParameter("gugun");

			List<animalinfoDto> list = new ArrayList<>();
			list = dao.selectAnimal(9854, sido, gugun);
			request.setAttribute("list", list);

			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			
			String gson = new Gson().toJson(list);
			try {
                //ajax로 리턴해주는 부분
                response.getWriter().write(gson);
            } catch (JsonIOException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
			
			
		}
	}

	private void dispatch(String url, HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		RequestDispatcher dispatch = request.getRequestDispatcher(url);
		dispatch.forward(request, response);
	}

	private void jsResponse(String msg, String url, HttpServletResponse response) throws IOException {
		PrintWriter out = response.getWriter();
		out.println("<script type='text/javascript'>");
		out.println("alert('" + msg + "')");
		out.println("location.href='" + url + "'");
		out.println("</script>");
	}
}
