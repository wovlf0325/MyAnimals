<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="js/jquery-3.4.1.js"></script>
<script type="text/javascript">

	function allChk(bool){
		var chks = document.getElementsByName("chk");
		for(var i = 0; i < chks.length; i++){
			chks[i].checked = bool;
		}
	}
	
	function letter_open(){
		var seq = $("#seq").title();
		var id = "ADMIN" //${USER.id}
		console.log(seq);
		console.log(id);
		open("/MyAnimals/letter.do?command=detail&seq="+seq+"&id="+id, "", "width=280px, height=460px, left=650px top=100px ");
	}

</script>
</head>
<body>

	<table border="1" style="margin-left: auto; margin-right: auto;">
		<col width="50px">
		<col width="75px">
		<col width="150px">
		<col width="300px">
		<col width="250px">
		<tr>
			<th>번호</th>
			<th>보낸사람</th>
			<th>제목</th>
			<th>작성일</th>
		</tr>
		<c:choose>
			<c:when test="${empty letterList }">
				<tr>
					<td colspan="4" align="center">- - - - - - - - - - 작성된 게시글이 없습니다. - - - - - - - - - -</td>
				</tr>
			</c:when>
			<c:otherwise>
				<c:forEach items="${letterList }" var="dto">
					<tr>
						<td align="center">
							<input type="checkbox" name="chk" value="${dto.letter_seq }"/>
						</td>
						<td align="center">${dto.letter_seq }</td>
						<td align="center">${dto.member_to }</td>
						<td><a href="#">${dto.letter_title }</a></td>
						<td align="center">${dto.letter_regdate }</td>
					</tr>
				</c:forEach>
			</c:otherwise>
		</c:choose>
		
	</table>

</body>
</html>