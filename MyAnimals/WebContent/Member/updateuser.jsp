<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

</head>
<body>
<form action="/MyAnimals/member.do" method="post">
<input type="hidden" name="command" value="updateuserres">
<input type="hidden" name="id" value="${dto.member_id }"/>
   <table border="1">
      <tr>
         <th>이름</th>
         <td><input type="text" name="name" readonly="readonly" value="${dto.member_name }"></td>
      </tr>
      <tr>
         <th>아이디</th>
         <td><input type="text" name="id" readonly="readonly" value="${dto.member_id }"></td>
      </tr>
      <tr>
         <th>비밀번호</th>
         <td><input type="password" name="pw" value="${dto.member_pw }"></td>
      </tr>
      <tr>
         <th>비밀번호 확인</th>
         <td><input type="password" name="pwpw" value="${dto.member_pw }"></td>
      </tr>
      <tr>
         <th>닉네임</th>
         <td><input type="text" name="nickname" value="${dto.member_nickname }"></td>
      </tr>
      <tr>
         <th>생일</th>
         <td><input type="text" name="birth" readonly="readonly" value="${dto.member_birth }"></td>
      </tr>
      <tr>
         <th>이메일</th>
         <td><input type="text" name="email" readonly="readonly" value="${dto.member_email }"></td>
      </tr>
      <tr>
         <th>성별</th>
         <td><input type="text" name="gender" readonly="readonly" value="${dto.member_gender }"></td>
      </tr>
      <tr>
         <th>주소</th>
         <td><input type="text" name="address" value="${dto.member_address }"></td>
      </tr>
      <tr>
         <th>핸드폰</th>
         <td><input type="text" name="phone" value="${dto.member_phone }"></td>
      </tr>
      <tr>
         <th>가입 날짜</th>
         <td><input type="text" name="regdate" readonly="readonly" value="${dto.member_regdate }"></td>
      </tr>
      <tr>
         <th>등급</th>
         <td><input type="text" name="role" readonly="readonly" value="${dto.member_role }"></td>
      </tr>
      <tr> 
         <td>
            <input type="submit" value="수정">
            <input type="button" value="취소" onclick="location.href='/MyAnimals/member.do?command=myinfo'">
         </td>
      </tr>
   </table>
</form>
</body>
</html>