package com.animalinfo.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.animalinfo.dao.animalinfoDao;
import com.animalinfo.dao.animalinfoDaoImpl;
import com.google.gson.Gson;
import com.google.gson.JsonIOException;

@WebServlet("/state.do")
public class AnimalInfoStateController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");

		animalinfoDao dao = new animalinfoDaoImpl();

		String state = request.getParameter("state");

		if (state.equals("상태")) {

		}

	}

}
