<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <% request.setCharacterEncoding("UTF-8"); %>
    <% response.setContentType("text/html; charset=UTF-8"); %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="/MyAnimals/js/jquery-3.4.1.js"></script>
<script type="text/javascript" src="/MyAnimals/js/weatherajax.js"></script>
</head>
<body>

		<!-- Sidebar -->
		<div id="sidebar">
			<div class="inner">

				<!-- Search -->
				<section id="search" class="alt">
					<form method="post" action="#">
						<input type="text" name="query" id="query" placeholder="Search" />
					</form>
				</section>

				<!-- Menu -->
				<nav id="menu">
					<header class="major">
						<h2>Menu</h2>
					</header>
					<ul>
						<li><a href="/MyAnimals/main.jsp">Homepage</a></li>
						<li><a href="/MyAnimals/planServlet?command=select">봉사 일정</a></li>
						<li><a href="/MyAnimals/shop.do?command=selectList">shop</a></li>						
						<li>
							<span class="opener">커뮤니티</span>
							<ul>
								<li><a href="/MyAnimals/answer.do?command=list&page=1">커뮤니티 게시판</a></li>
								<li><a href="/MyAnimals/chat.xhtml?name=${memberDto.member_id} }" onclick="window.open(this.href, '','width=650px, height=500px, left=500px, top=100px ');return false;" target="_blank">채팅방</a></li>
							</ul>
						</li>
					</ul>
				</nav>

				<!-- Section -->
				<section>
					<header class="major">
						<h2>Ante interdum</h2>
					</header>
					<div class="mini-posts">
						 <table border="1">
						    	<tr>
						    		<td colspan="8" bgcolor="skyblue"><b>지      역</b></td>
						    	</tr>
						    	<tr>
						    		<td colspan="3">주소를 선택하세요
						    			<select id="address"> 
						    				<option value="1168064000">서울시 강남구 역삼1동</option>
						    				<option value="1135064000">서울시 노원구 상계2동</option>
						    				<option value="4221056000">강원도 속초시 교동</option>
						    				<option value=""> </option>
						    			</select>	    		
						    	     </td>
						    	     <td>
						    	     	<input type="button" id="weaview" value="날씨보기">
						    	     </td>
						    	</tr>
						    	<tr>
						    		<td>좌표</td>
						    		<td colspan="3">
						    		위도:<input type="text" id="x" readonly="readonly">
						    		경도:<input type="text" id="y" readonly="readonly">
						    		</td>
						    	</tr>
						    	<tr>
						    		<td colspan="4" bgcolor="skyblue"><b>현재날씨</b></td>
						    	</tr>
						    	<tr>
						    		<td>기준시간</td>
						    		<td colspan="2" >
						    			<input type="text" id="pubDate" size="50%" readonly="readonly">
						    		</td>
						    		<td rowspan="5" align="center">
						    			<img alt="날씨정보" src="" id="weather_img"  width="150" height="150">
						    		</td>
						    	</tr>
						    	<tr>
						    		<td>날씨</td>
						    		<td colspan="2">
						    			<input type="text" id="wfKor" readonly="readonly">
						    		</td>
						    	</tr>
						    	<tr>
						    		<td>기온</td>
						    		<td colspan="2">
						    			<input type="text" id="temp" readonly="readonly">
						    		</td>
						    	</tr>
						    	<tr>
						    		<td>습도</td>
						    		<td colspan="2">
						    			<input type="text" id="reh" readonly="readonly">
						    		</td>
						    	</tr>
						    	<tr>
						    		<td>강수확률</td>
						    		<td colspan="2">
						    			<input type="text" id="pop" readonly="readonly">
						    		</td>
						    	</tr>
						    </table>
						
						
					</div>
					<ul class="actions">
						<li><a href="#" class="button">More</a></li>
					</ul>
				</section>

				<!-- Section -->
				<section>
					<header class="major">
						<h2>Get in touch</h2>
					</header>
					<p>Sed varius enim lorem ullamcorper dolore aliquam aenean ornare velit lacus, ac varius enim lorem
						ullamcorper dolore. Proin sed aliquam facilisis ante interdum. Sed nulla amet lorem feugiat
						tempus aliquam.</p>
					<ul class="contact">
						<li class="icon solid fa-envelope"><a href="#">information@untitled.tld</a></li>
						<li class="icon solid fa-phone">(000) 000-0000</li>
						<li class="icon solid fa-home">1234 Somewhere Road #8254<br />
							Nashville, TN 00000-0000</li>
					</ul>
				</section>

				<!-- Footer -->
				<footer id="footer">
					<p class="copyright">&copy; Untitled. All rights reserved. Demo Images: <a
							href="https://unsplash.com">Unsplash</a>. Design: <a href="https://html5up.net">HTML5
							UP</a>.</p>
				</footer>

			</div>
		</div>
</body>
</html>