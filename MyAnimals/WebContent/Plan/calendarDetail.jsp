<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <% request.setCharacterEncoding("UTF-8"); %>
    <% response.setContentType("text/html; charset=UTF-8"); %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
	<link rel="stylesheet" href="http://localhost:8787/MyAnimals/assets/css/main.css" />
	<link rel="stylesheet" href="/MyAnimals/assets/css/main.css" />


</head>

<script type="text/javascript">

function apply(){
	open("/MyAnimals/calendar.do?command=applyInsert&volunteer_seq=${volunteerDto.volunteer_seq}","","width=600,height=500");
}

</script>

<body>

	<table border="1">
		<tr>
			<th>제목</th>
			<th>내용</th>
			<th>인원수</th>
			<th>날짜</th>
		</tr>
		<tr>
			<td>${volunteerDto.volunteer_title }</td>
			<td>${volunteerDto.volunteer_content }</td>
			<td>${volunteerDto.volunteer_nowvolunteer}/${volunteerDto.volunteer_maxvolunteer }</td>
			<td>${volunteerDto.volunteer_date }</td>
		</tr>
		<tr>
			<td colspan="4">
				<button onclick="apply();">봉사 신청</button>
				<button onclick="history.back();">취소</button>
	<c:if test="${volunteerDto.member_id eq memberDto.member_id}">
				<button onclick="location.href='calendar.do?command=volunteerDelete&volunteer_seq=${volunteerDto.volunteer_seq}&center_seq=${volunteerDto.center_seq}'">일정삭제</button>
 	</c:if> 
			</td>
		</tr>
	
	</table>

</body>
</html>