<%@page import="com.plan.dto.planDto"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<% request.setCharacterEncoding("UTF-8"); %>
<% response.setContentType("text/html; charset=UTF-8"); %>    
    
<html>
<head>
<meta charset="UTF-8">

<title>Insert title here</title>

    <link href='fullcalendar/core/main.css' rel='stylesheet' />
    <link href='fullcalendar/daygrid/main.css' rel='stylesheet' />

    <script src='fullcalendar/core/main.js'></script>
    <script src='fullcalendar/daygrid/main.js'></script>


</head>
<body>
	<h1>보호소</h1>
	
	<div id="map" style="width:500px;height:400px;"></div>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d88d544f75c4ee7cfb6abfeda2856aa6"></script>
<script>
var dto = '<% planDto dto = (planDto)request.getAttribute("dto"); %>';



var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng('<%=dto.getCenter_latitude()%>', '<%=dto.getCneter_longitude()%>'), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng('<%=dto.getCenter_latitude()%>', '<%=dto.getCneter_longitude()%>'); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

var iwContent = '<div style="padding:5px;"><%=dto.getCenter_name() %> <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
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


<script>

      document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
          plugins: [ 'dayGrid' ]
        });

        calendar.render();
      });

</script>
	
	<table border="1">
		<tr>
			<th>보호소 명: </th>
			<td><%=dto.getCenter_name() %></td>
		</tr>
		<tr>
			<th>주소 : </th>
			<td><%=dto.getCenter_addr()%></td>
		</tr>
		<tr>
			<th>연락처 : </th>
			<td><%=dto.getCenter_phone() %></td>
		</tr>
	</table>
	
	<div id="calendar"></div>
	
	
	

</body>
</html>