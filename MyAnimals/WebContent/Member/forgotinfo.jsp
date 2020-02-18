<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("UTF-8");
%>
<%
	response.setContentType("text/html, charset=UTF-8");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원님의 정보를 입력해주세요</title>
</head>
<script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
<body>
	<input type="button" value="아이디" name="id" onclick="check(name)">
	<input type="button" value="비밀번호" name="pw" onclick="check(name)"><br>
	<script type="text/javascript">
		function check(e) {
			if(e==='id'){
				$("#checkid").css("display","");
				$("#checkpw").css("display","none");
			}else if(e==='pw'){
				$("#checkpw").css("display","");
				$("#checkid").css("display","none");
			}
		}
	</script>
	<div id="checkid" style="display: none">
		<form action="emailchk.do">
			<input type="hidden" id="chk" name="command" value="forgotid">
			이름 : <input type="text" name="name" value="" required="required"><br>
			이메일 : <input type="text" name="email" value="" required="required"><br>
			<input type="submit" value="찾기">
		</form>
	</div>
	
	<div id="checkpw" style="display: none">
		<form action="emailchk.do">
			<input type="hidden" id="chk" name="command" value="forgotpw">
			아이디 : <input type="text" name="id" value="" required="required"><br>
			이름 : <input type="text" name="name" value="" required="required"><br>
			이메일 : <input type="text" name="email" value="" required="required"><br>
			<input type="submit" value="찾기">
		</form>
	</div>

	
	
</body>
</html>