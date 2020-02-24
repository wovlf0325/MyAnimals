<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<input type="button" value="받은쪽지함" onclick="location.href='/MyAnimals/letter.do?command=receiveList&id=ADMIN'"/>
	<input type="button" value="보낸쪽지함" onclick="location.href='/MyAnimals/letter.do?command=sendList&id=ADMIN'"/>

</body>
</html>