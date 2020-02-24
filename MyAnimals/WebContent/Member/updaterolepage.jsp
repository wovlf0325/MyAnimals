<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ page import="com.member.dto.MemberDto" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<script type="text/javascript">

	function popUp(id,role){
	  var newpage=open("/MyAnimals/member.do?command=updaterole&id="+id+"&role="+role," ","width=500px, height=500px");	
	}

</script>
</head>
<body>
   <form action="/MyAnimals/member.do" method="post">
   <input type="hidden" name="command" value="updateroleres">
   <input type="hidden" name="id" value="${dto.member_id }">
      <table border="1">
         <tr>
            <th>탈퇴여부</th>
			<th>등급</th>
			<th>닉네임</th>
			<th>아이디</th>
			<th>이름</th>
			<th>생일</th>
			<th>성별</th>
			<th>핸드폰번호</th>
			<th>이메일</th>
			<th>주소</th>
			<th>가입날짜</th>
         </tr>
         <c:choose>
            <c:when test="${empty list }">
               <tr>
                  <td colspan="11">----------회원이없다.----------</td>
               </tr>
            </c:when>
            
            <c:otherwise>
               <c:forEach items="${list }" var="dto">
                  <tr>
						<td>${dto.member_delflag }</td>
						<td>${dto.member_role }</td>
						<td>${dto.member_nickname }</td>
						<td>${dto.member_id }</td>
						<td>${dto.member_name }</td>
						<td>${dto.member_birth }</td>
						<td>${dto.member_gender }</td>
						<td>${dto.member_phone }</td>
						<td>${dto.member_email }</td>
						<td>${dto.member_address }</td>
						<td>${dto.member_regdate }</td>
						<td><input type="button" value="등급조정" onclick="popUp('${dto.member_id }','${dto.member_role }');"/></td>
					</tr>
					
					
               </c:forEach>
            </c:otherwise>
         </c:choose>
         <tr>
            <td>
               <input type="button" value="메인" onclick="location.href='Member/adminmain.jsp'">
            </td>
         </tr>
      </table>
   </form>
</body>
</html>