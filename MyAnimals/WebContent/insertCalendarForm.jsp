<%@page import="com.calendar.dto.CalendarDto"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <% request.setCharacterEncoding("UTF-8"); %>
    <% response.setContentType("text/html; charset=UTF-8"); %>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="//mugifly.github.io/jquery-simple-datetimepicker/jquery.simple-dtpicker.css">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="//mugifly.github.io/jquery-simple-datetimepicker/jquery.simple-dtpicker.js"></script><script type="text/javascript">


$(function(){
    $('#date').appendDtpicker({'locale':'ko'});
});

</script>

<%  CalendarDto dto = new CalendarDto(); %>
<% int Center_seq = (int)(request.getAttribute("Center_seq")); %>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

		<h1>일정 작성</h1>
	<form action="calendar.do" method="post">
		<input type="hidden" name="command" value=""/>
	<table border="1">
		<tr>
			<th>작성자</th>
			<td><input type="text" name="writer"/></td>
		</tr>
		<tr>
			<th>일정 이름</th>
			<td><input type="text" name="title"/></td>
		</tr>

		<tr>
			<th>날짜</th>
			<td><input type="text" name="date" id="date"/></td>
		</tr>
		<tr>
			<td colspan="2">
				<input type="submit" value="일정 작성"/>
				<input type="button" value="취소" onclick="calendar.do?command=detail&Center_seq=<%=Center_seq%>"/>
			</td>
		</tr>
	</table>
	
	</form>	

</body>
</html>