<%@page import="java.util.ArrayList"%>
<%@page import="com.animalinfo.dto.animalinfoDto"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<%@ include file="./form/selectlocation.jsp" %>
</head>
<body>
<%
	List<animalinfoDto> list = new ArrayList<>();
	list = (List<animalinfoDto>)request.getAttribute("list");

%>

	<!-- 
	private int animalNo;					// 유기동물 번호
	private String animalHappenPlace;		// 유기동물 발견장소
	private String animalKindCd;			// 유기동물 종
	private String animalHappenDt;			// 유기동물 발견날짜
	private String animalSexCd;				// 유기동물 성별
	private String animalAge;				// 유기동물 나이
 	-->
	<table border="1">
		<tr>
			<td>번호</td>
			<td>발견장소</td>
			<td>발견날짜</td>
			<td>종</td>
			<td>성별</td>
			<td>나이</td>
		</tr>
		<%
		for(int i=0; i<list.size(); i++){
			%>
			<tr>
				<td><%=list.get(i).getAnimalNo() %></td>
				<td><%=list.get(i).getAnimalHappenPlace() %></td>
				<td><%=list.get(i).getAnimalHappenDt() %></td>
				<td><%=list.get(i).getAnimalKindCd() %></td>
				<td><%=list.get(i).getAnimalSexCd() %></td>
				<td><%=list.get(i).getAnimalAge() %></td>
			</tr>
			<%
		}
		
		%>


	</table>
</body>
</html>