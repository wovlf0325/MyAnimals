rf<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<% request.setCharacterEncoding("UTF-8"); %>
<% response.setContentType("text/html; charset=UTF-8"); %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<h1>답변글 작성</h1>
	
	<form action="answer.do" method="post">
		<input type="hidden" name="command" value="answerres"/>
		<input type="hidden" name="parentboardno" value="${dto.board_seq }"/>
		<table border="1">
			<tr>
				<th>작성자</th>
				<td><input type="text" name="nickname"/></td>
			</tr>
			<tr>
				<th>제목</th>
				<td><input type="text" name="title" value="RE:${dto.board_title }"/></td>
			</tr>
			<tr>
				<th>내용</th>
				<td><textarea rows="10" cols="60" name="content" ></textarea></td>
			</tr>
			<tr>
				<td colspan="2" align="right">
					<input type="submit" value="답변 작성"/>
					<input type="button" value="답변 취소" onclick="history.back()"/>
				</td>
			</tr>
		</table>
	</form>

</body>
</html>