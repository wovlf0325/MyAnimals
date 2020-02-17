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
   <input type="hidden" name="command" value="updaterole"/>
      <table border="1">
         <tr>
            <th>아이디</th>
            <td>${dto.member_id }</td>
         </tr>
         <tr>
            <th>등급</th>
            <td>
               <select name="popuprole">
                  <option>USER</option>
                  <option>CENTER</option>
                  <option>ADMIN</option>
               </select>
            </td>
         </tr>
      </table>
   </form>
</body>
</html>