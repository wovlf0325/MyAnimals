<%@page import="com.calendar.dto.VolunteerDto"%>
<%@page import="com.calendar.dto.CalendarDto"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Calendar"%>
<%@page import="com.calendar.dao.calendarDaoImpl"%>
<%@page import="com.calendar.dao.calendarDao"%>
<%@page import="com.calendar.dao.Util"%>
<%@page import="com.plan.dto.planDto"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<% request.setCharacterEncoding("UTF-8"); %>
<% response.setContentType("text/html; charset=UTF-8"); %>    
    
<html>
<head>
<meta charset="UTF-8">

<title>Insert title here</title>

<style type="text/css">

	#calendar{
		border-collapse: collapse;
		border: 1px solid gray;
	}
	
	#calendar th{
		width: 80px;
		border: 1px solid gray;
	}
	
	#calendar td{
		width: 80px;
		height: 80px;
		border: 1px solid gray;
		text-align: left;
		vertical-align: top;
		position: relative;
	}
	a{
	text-decoration: none;
	color: black;
	}
	.clist > p {
	font-size: 10px;
	margin: 1px;
	background-color: skyblue;
	}
	
	.cpreview{
		position: absolute;
		top: -30px;
		left: 10px;
		background-color: skyblue;
		width: 40px;
		height: 40px;
		text-align: center;
		line-height: 49px;
		border-radius: 40px 40px 40px 1px;
	}
	
	

</style>

</head>
<body>
	<h1>보호소</h1>
	
	<div id="map" style="width:500px;height:400px;"></div>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d88d544f75c4ee7cfb6abfeda2856aa6"></script>
<script>

var planDto = '<% planDto planDto = (planDto)request.getAttribute("planDto"); %>';

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng('<%=planDto.getCenter_latitude()%>', '<%=planDto.getCneter_longitude()%>'), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng('<%=planDto.getCenter_latitude()%>', '<%=planDto.getCneter_longitude()%>'); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

var iwContent = '<div style="padding:5px;"><%=planDto.getCenter_name() %> <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

//인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({
position : iwPosition, 
content : iwContent 
});

//마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
infowindow.open(map, marker); 

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// marker.setMap(null);    
</script>

	
	<table border="1">
		<tr>
			<th>보호소 명: </th>
			<td><%=planDto.getCenter_name() %></td>
		</tr>
		<tr>
			<th>주소 : </th>
			<td><%=planDto.getCenter_addr()%></td>
		</tr>
		<tr>
			<th>연락처 : </th>
			<td><%=planDto.getCenter_phone() %></td>
		</tr>
	</table>
	
	
	<script type="text/javascript">

function addCalendar(){
	open("calendar.do?command=insertCalendar&Center_seq="+<%=planDto.getCenter_seq()%>,"","width=300,height=250");
}

</script>	
<script type="text/javascript" src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script type="text/javascript">

	$(function(){
		$(".countview").hover(function(){
			var aCountView = $(this);
			var year = $(".y").text().trim();
			var month = $(".m").text().trim();
			var cDate = aCountView.text().trim();
			var yyyyMMdd = year+isTwo(month)+isTwo(cDate);
			//alert(yyyyMMdd);
			
			$.ajax({
				type:"POST",						//전송 방식
				url:"calcountajax.do",				//요청 경로
				data:"id=kh&yyyyMMdd="+yyyyMMdd,	//전송 파라미터
				dataType:"json",					//받는 데이터의 타입
				async:false	,						//동기 (기본값을 true(비동기))
				success:function(msg){
					var count = msg.count;
					aCountView.after("<div class='cpreview'>"+count+"</div>");
					
				},
				error:function(){
					alert("서버통신실패")
				}
			})
			
		}, function(){
			$(".cpreview").remove();
			
		});
	});
	function isTwo(n){
		return (n.length<2)?"0"+n:n;
	}
	
</script>
	

	
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
	List<VolunteerDto> clist = dao.getCalViewList("kh", yyyyMM); 
	
	

%>
	
	<table id="calendar">
		<caption>
			<a href="calendar.do?command=detail&seq=<%=planDto.getCenter_seq() %>&year=<%=year-1%>&month=<%=month%>">◁</a>
			<a href="calendar.do?command=detail&seq=<%=planDto.getCenter_seq() %>&year=<%=year%>&month=<%=month-1%>">◀</a>
			
			<span class="y"><%=year %></span>년
			<span class="m"><%=month %></span>월
			
			<a href="calendar.do?command=detail&seq=<%=planDto.getCenter_seq() %>&year=<%=year%>&month=<%=month+1%>">▶</a>
			<a href="calendar.do?command=detail&seq=<%=planDto.getCenter_seq() %>&year=<%=year+1%>&month=<%=month%>">▷</a>
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
		<a href="calendar.do?command=volunteerApply&year=<%=year%>&month=<%=month%>&date=<%=i%>&lastday=<%=lastDay%>">
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
	
	<div id="button">
		<button onclick="addCalendar();">일정등록</button>
	</div>
 
	
	

</body>
</html>