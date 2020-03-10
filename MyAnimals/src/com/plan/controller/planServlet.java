package com.plan.controller;

import java.io.File;
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

import com.calendar.biz.calendarBiz;
import com.calendar.biz.calendarBizImpl;
import com.calendar.dto.VolunteerDto;
import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.plan.biz.planBiz;
import com.plan.biz.planBizImpl;
import com.plan.dto.planDto;

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
				response.sendRedirect("/MyAnimals/Plan/plantest.jsp");
				
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
					List<planDto> plist = new ArrayList<>();
					int nameIndex = 0;
					int addressIndex = 4;
					int phoneIndex = 25;
					int latitudeIndex = 6;	
					int longitudeIndex = 7;	
					if (sido.equals("전국")) {
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
				}
					
				 else {
					System.out.println("와바라");

					for (int i = 0; i < nodeList.getLength(); i++) {
						NodeList child = nodeList.item(i).getChildNodes();
						planDto dto = new planDto();
						dto.setCenter_seq(i + 1);

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

						plist.add(dto);
					}
					for (int j = 0; j < plist.size(); j++) {
						System.out.println(gugun);
						if (plist.get(j).getCenter_addr().contains(gugun)) {
							planDto dto = new planDto();
							dto.setCenter_seq(plist.get(j).getCenter_seq());
							dto.setCenter_addr(plist.get(j).getCenter_addr());
							dto.setCenter_name(plist.get(j).getCenter_name());
							dto.setCenter_phone(plist.get(j).getCenter_phone());
							list.add(dto);
						}

					}

					/*
					 * if(list.size()==0) { System.out.println("안오니?");
					 * System.out.println("왔는데 왜 안돼 listsize:"+list.size());
					 * 
					 * jsResponse("검색결과 x", command, response); }
					 */

				}

				System.out.println("listsize : " + list.size());
				request.setAttribute("list", list);

				// 타입을 json으로 바꿔줘야됨
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");

				// DTO 타입의 어레이리스트를 json 형태로 바꿔주는 구문(라이브러리 필수, zip->jar 확장자명 꼭 확인)
				String gson = new Gson().toJson(list);

				try {
					// ajax로 리턴해주는 부분

					response.getWriter().write(gson);

					System.out.println(gson);
				} catch (JsonIOException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}

				/*
				 * request.setAttribute("list", list); int res = biz.insertList(list); if(res ==
				 * list.size()) { System.out.println("삽입 성공"); }
				 */

			} catch (Exception e) {
				System.out.println(e);
			}
				
		} else if (command.equals("detail")) {
			
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