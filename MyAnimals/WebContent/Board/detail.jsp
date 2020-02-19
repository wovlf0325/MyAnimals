<%
	// 브라우저가 캐시에 화면(응답된 도큐먼트) 저장하지 않도록 설정
	response.setHeader("Pragma", "no-cache");				// http 1.0
	response.setHeader("Cache-control", "no-store");		// http 1.1
	response.setHeader("Expires", "0");						// proxy server
	// 회원명단에서 command=login으로 갈 때 세션이 캐시 영역에 자동으로 저장해두기 때문에 에러가 나지않고 이동할 수 있다.
	// 하지만 우리는 그렇게 이동하지 않게 하기 위해 캐시를 지워주고 바로 adminmain.jsp로 이동시켰다.
%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<% request.setCharacterEncoding("UTF-8"); %>
<% response.setContentType("text/html; charset=UTF-8"); %>
<%
	
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<h1>글 상세 보기</h1>

	<table border="1">
		<tr>
			<th>작성자</th>
			<td>${dto.member_nickname }</td>
		</tr>
		<tr>
			<th>제목</th>
			<td>${dto.board_title }</td>
		</tr>
		<tr>
			<th>내용</th>
			<td><textarea rows="10" cols="60" readonly="readonly">${dto.board_content }</textarea></td>
		</tr>
		<tr>
			<td colspan="2" align="right">
				<input type="button" value="수정" onclick="location.href='answer.do?command=updateform&boardno=${dto.board_seq}'"/>
				<input type="button" value="삭제" onclick="location.href='answer.do?command=delete&boardno=${dto.board_seq}'"/>
				<input type="button" value="목록" onclick="location.href='answer.do?command=list'"/>
				<input type="button" value="답변" onclick="location.href='answer.do?command=answer&boardno=${dto.board_seq}'"/>
			</td>
		</tr>
	</table>
	<hr>
	
	<div class="container">
    <form action="reply.do"  method="post" >
    <input type="hidden" name="command" value="commentres">
    <input type="hidden" name="boardseq" value="${dto.board_seq }">
    <br><br>
        <div>
            <div>
                <span><strong>Comments</strong></span> <span id="cCnt"></span>
            </div>
            <div>
                <table class="table">                    
                    <tr>
                        <td>
                            <textarea style="width: 500px" rows="3" cols="30"  name="content" placeholder="댓글을 입력하세요"></textarea>
                            <br>
                            <div align="right">
                                <input type="submit"  value="등록">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <%-- <input type="hidden" id="b_code" name="b_code" value="${result.code }" />         --%>
        
        
	<!-- 댓글 리스트 -->
	<h2>CommentList</h2>
	<table border="1">
		<col width="100">
		<col width="100">
		<col width="200">
		<col width="100">
		<tr>
			<th>번호</th>
			<th>아이디</th>
			<th>내용</th>
			<th>작성일</th>
		</tr>
		<c:choose>
			<c:when test="${empty list}">
			<tr>
				<td colspan="4">----------작성된 글이 존재하지 않습니다.----------</td>
			</tr>
			</c:when>
			<c:otherwise>
				<c:forEach items="${list }" var="dto">
					
						
							<tr>
								<td>${dto.reply_seq }</td>
								<td>${dto.member_id }</td>
								<td>${dto.reply_content }</td>
								<td>${dto.reply_regdate }</td>
							</tr>
						
					
				</c:forEach>
			</c:otherwise>
		</c:choose>
	</table>
	
    </form>
</div>
	
	
	
	


</body>
</html>




