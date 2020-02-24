package com.shop.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.shop.biz.ShopBiz;
import com.shop.biz.ShopBizImpl;
import com.shop.dto.ShopDto;


@WebServlet("/shop.do")
public class ShopController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		ShopBiz biz = new ShopBizImpl();
		
		String command = request.getParameter("command");
		System.out.println("command = "+command);
		if(command.equals("selectList")) {
			List<ShopDto> list = biz.selectShopList();
			System.out.println("controller dto :"+list.get(0).getShop_name());
			request.setAttribute("list", list);
			dispatch("Shop/shopmain.jsp", request, response);
			
		}else if(command.equals("detail")) {
			int shop_seq = Integer.parseInt(request.getParameter("shop_seq"));
			ShopDto dto = biz.selectShopOne(shop_seq);
			request.setAttribute("dto", dto);
			dispatch("Shop/shopdetail.jsp", request, response);
		}else if(command.equals("insert")) {
			response.sendRedirect("Shop/shopinsertform.jsp");
		}else if(command.equals("search")) {
			String searchTitle = request.getParameter("searchTitle");
			String searchContent = request.getParameter("searchContent");
			List<ShopDto> list = biz.search(searchTitle,searchContent);
			request.setAttribute("list", list);
			System.out.println("controller list"+list.get(0).getShop_content());
			dispatch("Shop/shopmain.jsp", request, response);
		}
	}
	
	private void jsResponse(String msg, String url, HttpServletResponse response) throws IOException {
		PrintWriter out = response.getWriter();
		out.println("<script type=\"text/javascript\">");
		out.println("alert('" + msg + "')");
		out.println("location.href='" + url + "'");
		out.println("</script>");
	}

	private void dispatch(String url, HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		RequestDispatcher dispatch = request.getRequestDispatcher(url);
		dispatch.forward(request, response);
	}

}
