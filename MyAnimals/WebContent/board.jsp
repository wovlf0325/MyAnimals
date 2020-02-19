<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.plan.dto.planDto"%>
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<%
	List<planDto> list = new ArrayList<>();
	list = (List<planDto>) request.getAttribute("list");
	String gugun = (String) request.getAttribute("gugun");
	String sido = (String) request.getAttribute("sido");
	System.out.println(gugun + "    " + sido);
%>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

<body>
	<table border="1">
		<tr>
			<td>번호</td>
			<td>이름</td>
			<td>주소</td>
			<td>전화번호</td>
			<td>위도</td>
			<td>경도</td>
		</tr>
		<%
			int j=1;
			if (sido.equals("전국")) {
				for (int i = 0; i < list.size(); i++) {
		%>
		<tr>
			<td><%=j++%></td>
			<td><a href="planServlet?command=detail&seq=<%=list.get(i).getCenter_seq() %>"><%=list.get(i).getCenter_name()%></a></td>
			<td><%=list.get(i).getCenter_addr()%></td>
			<td><%=list.get(i).getCenter_phone()%></td>
			<td><%=list.get(i).getCenter_latitude() %></td>
			<td><%=list.get(i).getCneter_longitude() %></td>
			
		</tr>
		<%
				}
			} else {
				for (int i = 0; i < list.size(); i++) {
					if (list.get(i).getCenter_addr().contains(sido)) {
						if (list.get(i).getCenter_addr().contains(gugun)) {
							
		%>
		<tr>
			<td><%=j++%></td>
			<td><a href="planServlet?command=detail&seq=<%=list.get(i).getCenter_seq()%>"><%=list.get(i).getCenter_name()%></a></td>
			<td><%=list.get(i).getCenter_addr()%></td>
			<td><%=list.get(i).getCenter_phone()%></td>
			<td><%=list.get(i).getCenter_latitude() %></td>
			<td><%=list.get(i).getCneter_longitude() %></td>
		</tr>

		<%
			}
					}
				}
			}
			if(j==1){
				%>
				<tr>
					<td colspan="6">---------검색된 보호센터가 없습니다--------</td>
				</tr>
				<%
			}
		%>

	</table>
</body>

</html>