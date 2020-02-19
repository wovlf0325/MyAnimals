package com.reply.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.board.dto.BoardDto;
import com.reply.biz.ReplyBiz;
import com.reply.dto.ReplyDto;


@WebServlet("/reply.do")
public class ReplyServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public ReplyServlet() {
      
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		doPost(request, response);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		String command = request.getParameter("command");
		System.out.println("<"+command+">");
		ReplyBiz biz = new ReplyBiz();
		
		if(command.equals("list")) {
			System.out.println("reply Servlet 도착");
			BoardDto dto = (BoardDto)request.getAttribute("dto");
			int board_seq = dto.getBoard_seq();
			List<ReplyDto> list = biz.selectList(board_seq);
			request.setAttribute("list", list);
			request.setAttribute("dto", dto);
			dispatch("Board/detail.jsp", request, response);
					
		}else if(command.equals("commentres")) {
			String reply_content = request.getParameter("content");
			ReplyDto dto = new ReplyDto();
			dto.setReply_content(reply_content);
			int res = biz.insert(dto);
			if(res>0) {
				jsResponse("댓글 성공", "reply.do?command=detail", response);
			}else {
				jsResponse("댓글 실패", "board.do?command=detail", response);
			}
			
		}
	}
	
	private void dispatch(String url, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
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
