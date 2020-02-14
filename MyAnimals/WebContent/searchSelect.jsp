<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<div id="area">
		<select name="sido" id="sido"></select>
		<select name="gugun" id="gugun"></select>
		<input type="button" value="검색" id="selectlocation" onclick="getData('location')">
	</div>
	<div id="animalKind" style="display: none;">
		<select name="kind" id="kind">
			<option>전체</option>
			<option>개</option>
			<option>고양이</option>
			<option>기타</option>
		</select>
		<input type="button" value="검색" id="selectkind" onclick="getData('kind')">
	</div>
</body>
</html>