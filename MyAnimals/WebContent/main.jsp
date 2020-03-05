<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML>
<!--
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>
<!--icon brands fa-snapchat-ghost-->
<style>
	.nav-counter {
		position: absolute;
		top: -1px;
		right: 1px;
		min-width: 8px;
		height: 20px;
		line-height: 20px;
		margin-top: -11px;
		padding: 0 6px;
		font-weight: normal;
		font-size: small;
		color: white;
		text-align: center;
		text-shadow: 0 1px rgba(0, 0, 0, 0.2);
		background: #e23442;
		border: 1px solid #911f28;
		border-radius: 11px;
		background-image: -webkit-linear-gradient(top, #e8616c, #dd202f);
		background-image: -moz-linear-gradient(top, #e8616c, #dd202f);
		background-image: -o-linear-gradient(top, #e8616c, #dd202f);
		background-image: linear-gradient(to bottom, #e8616c, #dd202f);
		-webkit-box-shadow: inset 0 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px rgba(0, 0, 0, 0.12);
		box-shadow: inset 0 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px rgba(0, 0, 0, 0.12);
	}
	.chat-bubble {
    background-color: #ededed;
    border: 2px solid #666;
    font-size: 15px;
    line-height: 1.3em;
    margin: 10px auto;
    padding: 10px;
    position: relative;
    text-align: center;
    width: 200px;
    -moz-border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-box-shadow: 0 0 5px #888;
    -webkit-box-shadow: 0 0 5px #888;
    font-family: 'Bangers', arial, serif;
    left: 124px;
    top: -12px; 
}
.chat-bubble-arrow-border {
    border-color: #666 transparent transparent transparent;
    border-style: solid;
    border-width: 20px;
    height: 0;
    width: 0;
    position: absolute;
    bottom: -42px;
    left: 30px;
}
.chat-bubble-arrow {
    border-color: #ededed transparent transparent transparent;
    border-style: solid;
    border-width: 20px;
    height: 0;
    width: 0;
    position: absolute;
    bottom: -39px;
    left: 30px;
}
</style>

<head>
	<title>MyAnimals</title>
	<script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
	<link rel="stylesheet" href="assets/css/main.css" />
</head>


<body class="is-preload">
	<!-- Wrapper -->
	<div id="wrapper">

		<!-- Main -->
		<div id="main">
			<div class="inner">

				<!-- Header -->
				<header id="header">
					<a href="index.html" class="logo"><strong>MyAnimals</strong></a>
					<c:choose>
						<c:when test="${empty memberDto }">
							<ul class="icons">
								<li><a href="#" id="alarm" class="icon brands fa-snapchat-ghost"
										style="position: relative; display: none;"><span class="nav-counter"
											style="display: none;"></span></a></li>
								<input type="button" onclick="location.href='Member/loginpage.jsp'" value="로그인">
								<input type="button" onclick="location.href='Member/registselect.jsp'" value="회원가입">
							</ul>
						</c:when>
						<c:otherwise>
							<ul class="icons">
								<div class="chat-bubble" style="display: none;">
          							<div class="chat-bubble-arrow-border"></div>
          							<div class="chat-bubble-arrow"></div>
        						</div>
								<li><a href="#" id="alarm" class="icon brands fa-snapchat-ghost"
										style="position: relative;"><span id="redAlarm" class="nav-counter" style="display: none;"></span></a></li>
								<input type="button" onclick="location.href='/MyAnimals/member.do?command=myinfo'" value="내정보">
								<input type="button" value="로그아웃" onclick="location.href='/MyAnimals/member.do?command=logout'">
							</ul>
						</c:otherwise>
					</c:choose>
					
				</header>


				<script type="text/javascript">
					$(document).ready(
						function () {
							var currentDate = new Date();
							var year = currentDate.getFullYear();
							var month = currentDate.getMonth();
							var date = currentDate.getDate();
							var count = 0;
							$.ajax({
								url: "alarm.do",
								type: "POST",
								dataType: "json",
								data: {
									'year': year,
									'month': month,
									'date': date
								},
								success: function(data, textStatus, xhr) {
							         $.each(data, function(key, val){
							             console.log('key:' + key + ' / ' + 'value:' + val['volunteer_title']);
							             console.log(val['volunteer_dayLeft']);
							             $('.chat-bubble').append('D-day : '+val['volunteer_dayLeft'] +val['volunteer_title']+'<br>');
							             count++;
							         });
							         $('#redAlarm').html(count);
							         $('#redAlarm').css("display","");
							         
								},
								error: function (request, status, error) {
								}
							});
							
						});
					 $('#alarm').click( function() {
				          $('.chat-bubble').toggle();
				          $('#redAlarm').css("display","none");
				     });
				</script>

				<section id="banner">
					<span class="graph" style="display: block; margin: auto;"> 
					<%@ includefile="./location.jsp"%></span>
				</section>
			</div>
		</div>

		<!-- Sidebar -->
		<div id="sidebar">
			<div class="inner">
				<!-- Menu -->
				<nav id="menu">
					<header class="major">
						<h2>Menu</h2>
					</header>
					<ul>
						<li><a href="main.jsp">Homepage</a></li>
						<li><a href="shop.do?command=selectList">shop</a></li>
						<li><a href="elements.html">Elements</a></li>
						<li><span class="opener">Submenu</span>
							<ul>
								<li><a href="#">Lorem Dolor</a></li>
								<li><a href="#">Ipsum Adipiscing</a></li>
								<li><a href="#">Tempus Magna</a></li>
								<li><a href="#">Feugiat Veroeros</a></li>
							</ul>
						</li>
					</ul>
				</nav>


				<!-- Footer -->
				<footer id="footer">
					<p class="copyright">
						&copy; Untitled. All rights reserved. Demo Images: <a href="https://unsplash.com">Unsplash</a>.
						Design: <a href="https://html5up.net">HTML5 UP</a>.
					</p>
				</footer>

			</div>
		</div>

	</div>

	<!-- Scripts -->
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/browser.min.js"></script>
	<script src="assets/js/breakpoints.min.js"></script>
	<script src="assets/js/util.js"></script>
	<script src="assets/js/main.js"></script>

</body>

</html>