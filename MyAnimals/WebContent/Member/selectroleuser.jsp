<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	
	<h1>전체회원정보(탈퇴한 회원 포함)</h1>

	<table border="1">
		<tr>
			<th>탈퇴여부</th>
			<th>등급</th>
			<th>닉네임</th>
			<th>아이디</th>
			<th>이름</th>
			<th>생일</th>
			<th>성별</th>
			<th>핸드폰번호</th>
			<th>이메일</th>
			<th>주소</th>
			<th>가입날짜</th>
		</tr>


		<c:choose>
			<c:when test="${empty list }">
				<tr>
					<td colspan="11">----------유저 정보가 없습니다----------</td>
				</tr>
			</c:when>
			<c:otherwise>
				<c:forEach items="${list }" var="dto">
					<tr>
						<td>${dto.member_delflag }</td>
						<td>${dto.member_role }</td>
						<td>${dto.member_nickname }</td>
						<td>${dto.member_id }</td>
						<td>${dto.member_name }</td>
						<td>${dto.member_birth }</td>
						<td>${dto.member_gender }</td>
						<td>${dto.member_phone }</td>
						<td>${dto.member_email }</td>
						<td>${dto.member_address }</td>
						<td>${dto.member_regdate }</td>
					</tr>
				</c:forEach>
			</c:otherwise>
		</c:choose>
		</table>
	
</body>
</html>