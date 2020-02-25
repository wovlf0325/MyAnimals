<%@page import="com.calendar.dto.CalendarDto"%>
<%@page import="java.util.List"%>
<%@page import="com.calendar.dao.Util"%>
<%@page import="com.calendar.dao.calendarDaoImpl"%>
<%@page import="com.calendar.dao.calendarDao"%>
<%@page import="java.util.Calendar"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
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

<%
	Calendar cal = Calendar.getInstance(); //Singlton이라서 객체 생성 new연산자 사용 x / 한번 만들면 만들어진 애가 계속 리턴된다.
	int year = cal.get(Calendar.YEAR);
	int month = cal.get(Calendar.MONTH)+1;	//0번지 부터 시작이라 +1
	
	String paramYear = request.getParameter("year");
	String paramMonth = request.getParameter("month");
	
	if(paramYear != null){
		year = Integer.parseInt(paramYear);
	}
	if(paramMonth != null){
		month = Integer.parseInt(paramMonth);
	}
	
	if(month<1){
		month = 12;
		year--;
	}
	
	if(month>12){
		month = 1;
		year++;
	}
	
	//현재년도, 현재월, 해당 월의 1일로 셋팅
	cal.set(year,month-1,1);
	
	//1일의 요일
	int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
	//현재 월의 마지막 일
	int lastDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
	
	
 	//달력에 일정 표현
	calendarDao dao = new calendarDaoImpl();
	String yyyyMM = year +Util.isTwo(String.valueOf(month));
	List<CalendarDto> clist = dao.getCalViewList("kh", yyyyMM); 
	
	

%>
	
	<table id="calendar">
		<caption>
			<a href="calendar.jsp?year=<%=year-1%>&month=<%=month%>">◁</a>
			<a href="calendar.jsp?year=<%=year%>&month=<%=month-1%>">◀</a>
			
			<span class="y"><%=year %></span>년
			<span class="m"><%=month %></span>월
			
			<a href="calendar.jsp?year=<%=year%>&month=<%=month+1%>">▶</a>
			<a href="calendar.jsp?year=<%=year+1%>&month=<%=month%>">▷</a>
		</caption>
		
		<tr>
			<th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
		</tr>
		<tr>
<%
	for(int i=0; i<dayOfWeek-1; i++){	//calendar클래스는 일요일이 1 월요일이2
		out.print("<td>&nbsp;</td>");
	}

	for(int i=1; i<=lastDay; i++){
%>
	<td>
		<a class="countview" href="calendar.do?command=list&year=<%=year%>&month=<%=month%>&date=<%=i%>" style="color:<%=Util.fontColor(i,dayOfWeek)%>"><%=i %></a>
		<a href="insertcalboard.jsp?year=<%=year%>&month=<%=month%>&date=<%=i%>&lastday=<%=lastDay%>">
			<img alt="일정추가" src="img/pen.png" style="width: 10px;" height="10px;">	
		</a>
		<div class="clist">
			<%=Util.getCalView(i, clist) %>
		</div>
	</td>

<%
	if((dayOfWeek-1+i)%7==0){
		out.print("</tr><tr>");
		
	}
	
	}

	for(int i=0; i<(7-(dayOfWeek-1+lastDay)%7)%7; i++){
		out.print("<td>&nbsp;</td>");
	}

%>
		</tr>

	</table>
	
	<div id="al">
		<img alt="아이콘" src="">
	</div>
	

</body>
</html>