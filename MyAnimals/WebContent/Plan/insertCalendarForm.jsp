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

<%  CalendarDto calendarDto = new CalendarDto(); %>
<% String Member_id = (String)(request.getAttribute("Member_id")); %>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

		<h1>봉사일정 등록</h1>
			<form action="calendar.do" method="post">
				<input type="hidden" name="command" value="insert"/>
				<input type="hidden" name="Member_id" value="<%=Member_id%>"/>
			<table border="1">
		<tr>
			<th>일정명</th>
			<td><input type="text" name="volunteer_title"/></td>
		</tr>
		<tr>
			<th>내용</th>
			<td><input type="text" name="volunteer_content"/></td>
		</tr>
		<tr>
			<th>최대인원</th>
			<td><input type="text" name="volunteer_maxvolunteer"/></td>
		</tr>
		<tr>
			<th>날짜</th>
			<td><input type="text" name="volunteer_date" id="date"/></td>
		</tr>
		<tr>
			<td colspan="2">
				<input type="submit" value="일정 작성"/>
				<input type="button" value="취소" onclick="self.close()"/>
			</td>
		</tr>
	</table>
	</form>	

</body>
</html>