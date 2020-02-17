<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

   <jsp:useBean id="dto" class="com.member.dto.MemberDto" scope="session" ></jsp:useBean>
   <h1>내 정보</h1>
   
   <table border="1">
   	  <tr>
   	     <th>아이디</th>
   	     <td><jsp:getProperty property="member_id" name="dto"/></td>
   	  </tr>
      <tr>
         <th>닉네임</th>
         <td><jsp:getProperty property="member_nickname" name="dto"/></td>
      </tr>
      <tr>
         <th>이름</th>
         <td><jsp:getProperty property="member_name" name="dto"/></td>
      </tr>
      <tr>
         <th>생년월일</th>
         <td><jsp:getProperty property="member_birth" name="dto"/></td>
      </tr>
      <tr>
         <th>이메일</th>
         <td><jsp:getProperty property="member_email" name="dto"/></td>
      </tr>
      <tr>
         <th>핸드폰</th>
         <td><jsp:getProperty property="member_phone" name="dto"/></td>
      </tr>
      <tr>
         <th>주소</th>
         <td><jsp:getProperty property="member_address" name="dto"/></td>
      </tr>
      <tr>
         <td>
            <input type="button" value="수정" onclick="location.href='/MyAnimals/member.do?command=updateuserform'">
            <input type="button" value="계정삭제" onclick="location.href='/MyAnimals/member.do?command=userdeleteres&id=${dto.member_id}'">
            <input type="button" value="메인" onclick="location.href='/MyAnimals/member.do?command=loginmain'">
         </td>
      </tr>
   </table>
   
</body>
</html>