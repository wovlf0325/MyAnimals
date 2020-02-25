<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import="java.net.URLEncoder" %>
<%@ page import="java.security.SecureRandom" %>
<%@ page import="java.math.BigInteger" %>
    
<%
	// 브라우저가 캐시에 화면(응답된 도큐먼트) 저장하지 않도록 설정
	response.setHeader("Pragma", "no-cache");				// http 1.0
	response.setHeader("Cache-control", "no-store");		// http 1.1
	response.setHeader("Expires", "0");						// proxy server
	// 회원명단에서 command=login으로 갈 때 세션이 캐시 영역에 자동으로 저장해두기 때문에 에러가 나지않고 이동할 수 있다.
	// 하지만 우리는 그렇게 이동하지 않게 하기 위해 캐시를 지워주고 바로 adminmain.jsp로 이동시켰다.

    String clientId = "YCcGSt6BfvkHKq2CsQHK";//애플리케이션 클라이언트 아이디값";
    String redirectURI = URLEncoder.encode("http://localhost:8787/MyAnimals/naver.do", "UTF-8");
    SecureRandom random = new SecureRandom();
    String state = new BigInteger(130, random).toString();
    String apiURL = "https://nid.naver.com/oauth2.0/authorize?response_type=code";
    apiURL += "&client_id=" + clientId;
    apiURL += "&redirect_uri=" + redirectURI;
    apiURL += "&state=" + state;
    session.setAttribute("state", state);
 %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width"/>
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
<script type="text/javascript">
function forgot(){
	open("/MyAnimals/emailchk.do?command=forgotinfo","","width=600,height=400");
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
                  <input type="button" value="비밀번호 찾기" onclick="forgot()">
               </td>
            </tr>
            <tr>
            	<td>
            		<a id="kakao-login-btn"></a>
            	</td>
            </tr>
            <tr>
            	<td>
            		<a href="<%=apiURL%>"><img height="50" src="/MyAnimals/image/naver.PNG"/></a>
            	</td>
            </tr>
         </table>
      </fieldset>
   </form>


<script type='text/javascript'>
  //<![CDATA[
    // 사용할 앱의 JavaScript 키를 설정해 주세요.
    Kakao.init('8700b83b51bde744ad5aebd0c5ebe1f1');
    // 카카오 로그인 버튼을 생성합니다.
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: function(authObj) {
        // 로그인 성공시, API를 호출합니다.
        Kakao.API.request({
          url: '/v2/user/me',
          success: function(res) {
        	var data = JSON.stringify(res);
            alert(data);
            console.log(data);
            console.log(JSON.stringify(res.id));
            console.log(JSON.stringify(res.properties.nickname));
            console.log(JSON.stringify(res.kakao_account.email));
            console.log(JSON.stringify(res.kakao_account.birthday))
            
            var nickname = "&nickname="+res.properties.nickname;
            var email = "&email="+res.kakao_account.email;
            
            location.href='/MyAnimals/member.do?command=registuser'+nickname+email;

          },
          fail: function(error) {
            alert(JSON.stringify(error));
          }
        });
      },
      fail: function(err) {
        alert(JSON.stringify(err));
      }
    });
  //]]>
  
</script>

<input type="button" value="카카오톡 로그아웃" onclick="logout();"/>
<script type="text/javascript">

	function logout(){
		Kakao.Auth.logout(function(){
			setTimeout(function(){
				alert("로그아웃");
			},1000);
		});
	};

</script>

</body>
</html>