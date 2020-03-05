<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
function forgot(){
	open("/MyAnimals/emailchk.do?command=forgotinfo","","width=300,height=300");
}
</script>
</head>
<body>
   <form action="/MyAnimals/member.do" method="post">
   <input type="hidden" name="command" value="login">
      <fieldset>
         <legend>로그인</legend>
         <table border="1">
           <col width="200">
	       <col width="200">
            <tr>
               <th>아이디</th>
               <td><input type="text" name="id"></td>
            </tr>
            <tr>
               <th>비밀번호</th>
               <td><input type="password" name="pw"></td>
            </tr>
            <tr>
               <td colspan="4">
                  <input type="submit" value="로그인">
                  <input type="button" value="회원가입" onclick="location.href='/MyAnimals/member.do?command=registselectres'">
                  <input type="button" value="아이디·비밀번호찾기" onclick="forgot()">
                  
               </td>
            </tr>
         </table>
      </fieldset>
   </form>
</body>
</html>