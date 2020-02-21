<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ page import="com.member.dto.MemberDto" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
function updaterolechk(){
	 if (confirm("정말 변경 하시겠습니까??") == true){    //확인
		document.getElementById("popuprole").submit();
		
	    opener.location.href='Member/adminmain.jsp';
	    self.close();
	 }else{   //취소
		
	     return false;
	     self.close();
	 }
		
}	
</script>
</head>
<body>

<h1>등급조정</h1>
	<form action="/MyAnimals/member.do" method="post" id="popuprole">
	 <input type="hidden" name="command" value="updaterolepopup">
	 <input type="hidden" name="id" value="${dto.member_id }">
	<table>
	   <tr>
	      <th>아이디</th>
	      <td>${dto.member_id }<td>
	 
	      <td>
	      	<select name="selectrole">
		  	  <option value="USER" ${dto.member_role == "USER" ? "selected" : ""}>USER</option>
		   	  <option value="CENTER" ${dto.member_role == "CENTER" ? "selected" : ""} >CENTER</option>
		 	  <option value="ADMIN" ${dto.member_role == "ADMIN" ? "selected" : ""} >ADMIN</option>
		   </select>
	      </td>
	   </tr>
	</table>		
	</form>
		<input type="button" value="변경" onclick="updaterolechk()">
</body>
</html>