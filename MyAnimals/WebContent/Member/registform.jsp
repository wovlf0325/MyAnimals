<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript">


function idChkConfirm(){
	   var chk = document.getElementsByName("id")[0].title;
	   if(chk=="n"){
		   alert("ID 중복체크를 먼저 해주세요");
		   document.getElementsByName("id")[0].focus();
	   }
	 }


</script>
</head>
<body>
<h1>봉사자 회원가입</h1>
   <form action="/MyAnimals/member.do" method="post">
      <input type="hidden" name="command" value="registres">
      <table border="1">
         <tr>
            <th>아이디</th>
            <td>
               <input type="text" name="id" title="y" required="required" >
            </td>
         </tr>
         <tr>
            <th>비밀번호</th>
            <td><input type="password" name="pw" required="required" onclick="idChkConfirm()"></td>
         </tr>
         <tr>
            <th>비밀번호 확인</th>
            <td><input type="password" name="pwpw" required="required" onclick="idChkConfirm()"></td>
         </tr>
         <tr>
            <th>닉네임</th>
            <td>
               <input type="text" name="nickname" required="required" onclick="idChkConfirm()">
            </td>
         </tr>
         <tr>
            <th>이름</th>
            <td><input type="text" name="name" required="required" onclick="idChkConfirm()"></td>
         </tr>
         <tr>
            <th>성별</th>
            <td>
            	<input type="text" name="gender" value="M" readonly="readonly"/>
            <!-- 
               <input type="radio" name="gender" value="M">남자
               <input type="radio" name="gender" value="F">여자
             -->
            </td>
         </tr>
         <tr>
            <th>생년월일</th>
            <td><input type="text" name="birth" required="required" onclick="idChkConfirm()"></td>
         </tr>
         <tr>
            <th>이메일</th>
            <td>
               <input type="text" name="email" required="required" onclick="idChkConfirm()">
               <input type="button" name="emailChk" value="이메일확인" required="required" onclick="">   
            </td>
         </tr>
         <tr>
            <th>핸드폰</th>
            <td><input type="text" name="phone" required="required" onclick="idChkConfirm()"></td>
         </tr>
         <tr>
            <th>주소</th>
            <td><input type="text" name="address" required="required" onclick="idChkConfirm()"></td>
         </tr>
         <tr>
            <td colspan="2">
               <input type="submit" value="회원가입">
               <input type="button" value="취소" onclick="location.href='loginmain.jsp'">
            </td>
         </tr>
         
      </table>
   </form>
</body>
</html>