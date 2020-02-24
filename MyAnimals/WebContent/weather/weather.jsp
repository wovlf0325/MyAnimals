<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
function parseWeather(){
	loadJSON(function(response){
		var jsonData = JSON.parse(response);
	document.getElementById("todayWeather").innerHTML = jsonData["list"][0]["weather"][0]["main"];
	});
}

function loadJSON(callback){
	var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Busan,KR&cnt=7&APPID=0fcde51d43c81c13e57e8085693a9d85";
	var request = new XMLHttpRequest();
	request.overrideMime Type("application/json");
	request.open("POST",url,true);
	
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == "200"){
			callback(request.responseText);
		}
	};
	request.send(null);
}
   window.onload = function(){
	   parseWeather();
   }
</script>
</head>
<body>
	<span id="todaysWeather"></span>
</body>
</html>