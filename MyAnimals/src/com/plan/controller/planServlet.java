package com.plan.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.plan.biz.planBiz;
import com.plan.biz.planBizImpl;
import com.plan.dto.planDto;
import java.io.*;

import javax.xml.transform.*;
import javax.xml.transform.stream.*;
import javax.xml.transform.dom.*;
import org.w3c.dom.*;

/**
 * Servlet implementation class localxml
 */
@WebServlet("/planServlet")
public class planServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	planBiz biz = new planBizImpl();

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");

		HttpSession session = request.getSession();
		String command = request.getParameter("command");
		System.out.println("command : " + command);

		if (session.getAttribute("memberDto") == null) {
			jsResponse("로그인을 먼저 해주세요", "Member/loginpage.jsp", response);
		} else {
		
			if (command.equals("select")) {
				response.sendRedirect("/MyAnimals/Plan/selectlocal.jsp");
				
			} else if (command.equals("showxml")) {
	
				String sido = request.getParameter("sido");
				String gugun = request.getParameter("gugun");
				Document doc;
				
				try {
					
					DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
					factory.setIgnoringElementContentWhitespace(true);
				
					DocumentBuilder builder = factory.newDocumentBuilder();
	
					
					doc = builder.parse(new File("C:\\Git_semi\\MyAnimals\\MyAnimals\\WebContent\\WEB-INF\\data.xml"));
	
					XPathFactory xpathFactory = XPathFactory.newInstance();
					XPath xpath = xpathFactory.newXPath();
					XPathExpression expr = xpath.compile("//records/record");
					NodeList nodeList = (NodeList) expr.evaluate(doc, XPathConstants.NODESET);
					List<planDto> list = new ArrayList<>();
					int nameIndex = 0;
					int addressIndex = 4;
					int phoneIndex = 25;
					int latitudeIndex = 6;	
					int longitudeIndex = 7;	
	
					for (int i = 0; i < nodeList.getLength(); i++) {
						NodeList child = nodeList.item(i).getChildNodes();
						planDto dto = new planDto();
						dto.setCenter_seq(i+1);
						
						Node node = child.item(nameIndex);
						dto.setCenter_name(node.getTextContent());
						node = child.item(addressIndex);
						if (node.getTextContent() == "") {
							node = child.item(addressIndex + 1);
						}
						dto.setCenter_addr(node.getTextContent());
						node = child.item(phoneIndex);
						dto.setCenter_phone(node.getTextContent());
						
						node = child.item(latitudeIndex);
						dto.setCenter_latitude(node.getTextContent());
						node = child.item(longitudeIndex);
						dto.setCneter_longitude(node.getTextContent());
						
						list.add(dto);
					}
					request.setAttribute("list", list);
					request.setAttribute("gugun", gugun);
					request.setAttribute("sido", sido);
					/*
					int res = biz.insertList(list);
					if(res == list.size()) {
						System.out.println("삽입 성공");
					}
					*/
					
					dispatch("/Plan/planBoard.jsp", request, response);
					
					
	
				} catch (Exception e) {
					System.out.println(e);
				}
			}else if(command.equals("detail")) {
				
				int seq = Integer.parseInt(request.getParameter("seq"));
				System.out.println(seq);
				
				planDto planDto = biz.selectOne(seq);
				
				session.setAttribute("planDto", planDto);
				
				dispatch("/Plan/planDetail.jsp", request, response);
				
				
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