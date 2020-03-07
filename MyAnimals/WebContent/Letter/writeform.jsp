<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript">

	/* onsubmit=function(){
		opener.location.reload();
		opener.close();
		self.close();
	} */ 

</script>
</head>
<body>

	<form action="/MyAnimals/letter.do" method="post">
	<input type="hidden" name="command" value="insert"/>
		<table border="1">
			<tr>
				<th>받는사람</th>
				<td><input type="text" name="to"/></td>
			</tr>
			<tr>
				<th>보내는사람</th>
				<td><input type="text" id="from" name="from" value="${memberDto.member_id}" /></td>
			</tr>
			<tr>
				<th>제목</th>
				<td><input type="text" name="title"/></td>
			</tr>
			<tr>
				<th>내용</th>
				<td><textarea cols="20" rows="20" name="content"></textarea></td>
			</tr>
			<tr>
				<td colspan="2" align="right">
					<input type="submit" value="쪽지 보내기"/>
					<input type="button" value="취소" onclick="self.close()"/> 
				</td>
			</tr>
		</table>
	</form>

</body>
</html>