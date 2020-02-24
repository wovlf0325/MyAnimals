package com.board.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.board.biz.BoardBiz;
import com.board.dto.BoardDto;
import com.board.dto.PagingDto;


@WebServlet("/answer.do")
public class BoardServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
    public BoardServlet() {
       
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=UTF-8");
		doPost(request, response);
	
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");

		String command = request.getParameter("command");
		System.out.println("<" + command + ">");
		BoardBiz biz = new BoardBiz();

		if (command.equals("list")) {
			int page = Integer.parseInt(request.getParameter("page"));
			PagingDto pdto = new PagingDto();
			pdto.setPage(page);
			pdto.setRows(10);
			pdto.setPagescale(3);
			pdto.setTotalpage(biz.totalPage(pdto.getRows()));
			List<BoardDto> list = biz.selectList(pdto);
			request.setAttribute("pdto",pdto);
			request.setAttribute("list", list);
			dispatch("Board/answerlist.jsp", request, response);
		} else if (command.equals("writeform")) {
			response.sendRedirect("write.jsp");
		} else if (command.equals("writeres")) {
			String writer = request.getParameter("nickname");
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			BoardDto dto = new BoardDto(writer, title, content);

			int res = biz.insert(dto);
			if (res > 0) {
				jsResponse("글 작성 성공", "answer.do?command=list", response);
			} else {
				jsResponse("글 작성 실패", "answer.do?command=writeform", response);
			}
		} else if (command.equals("detail")) {
			int boardno = Integer.parseInt(request.getParameter("boardno"));
			BoardDto dto = biz.selectOne(boardno);
			// (request.getSession() 메서드는 session이 생성되어 있는 경우 생성된 session을 리턴하고,
			// 생성되어 있지 않은 경우 새롭게 session을 생성하여 리턴한다.)
			// 조회수 새로고침 증가 방지
//			HttpSession session = request.getSession();
//			session.setAttribute("dto", dto);
//
//			response.sendRedirect("Board/detail.jsp");
			System.out.println("board Servlet 도착");
			
			request.setAttribute("dto", dto);
			dispatch("reply.do?command=list", request, response);

		} else if (command.equals("updateform")) {
			int boardno = Integer.parseInt(request.getParameter("boardno"));
			BoardDto dto = biz.selectOne(boardno);
			request.setAttribute("dto", dto);
			dispatch("Board/update.jsp", request, response);
		} else if (command.equals("updateres")) {
			int boardno = Integer.parseInt(request.getParameter("boardno"));
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			BoardDto dto = new BoardDto();
			dto.setBoard_title(title);
			dto.setBoard_content(content);
			dto.setBoard_seq(boardno);
			int res = biz.update(dto);
			if (res > 0) {
				jsResponse("글 수정 성공", "answer.do?command=detail&boardno=" + boardno, response);
			} else {
				jsResponse("글 수정 실패", "answer.do?command=updateform&boardno=" + boardno, response);
			}
		} else if (command.equals("delete")) {
			int boardno = Integer.parseInt(request.getParameter("boardno"));

			int res = biz.delete(boardno);
			if (res > 0) {
				jsResponse("글 삭제 성공", "answer.do?command=list", response);
			} else {
				jsResponse("글 삭제 실패", "answer.do?command=detail&boardno=" + boardno, response);
			}
		} else if (command.equals("answer")) {
			int boardno = Integer.parseInt(request.getParameter("boardno"));
			BoardDto dto = biz.selectOne(boardno);
			request.setAttribute("dto", dto);
			dispatch("Board/answerform.jsp", request, response);

		} else if (command.equals("answerres")) {
			int parentboardno = Integer.parseInt(request.getParameter("parentboardno"));
			String writer = request.getParameter("nickname");
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			BoardDto dto = new BoardDto();
			dto.setBoard_seq(parentboardno);
			dto.setMember_nickname(writer);
			dto.setBoard_title(title);
			dto.setBoard_content(content);
			int res = biz.insert_answer(dto);

			if (res > 0) {
				jsResponse("답변 작성 성공", "answer.do?command=list", response);
			} else {
				jsResponse("답변 작성 실패", "answer.do?command=answer&boardno=" + parentboardno, response);
			}
		}
		// doGet(request, response);
	}
	private void jsResponse(String msg, String url, HttpServletResponse response) throws IOException {
		PrintWriter out = response.getWriter();
		out.println("<script type='text/javascript'>");
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
