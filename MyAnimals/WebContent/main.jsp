<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<!--
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>


<head>
<title>MyAnimals</title>
<script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
<meta charset="utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, user-scalable=no" />
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
					<ul class="icons">
						<input type="button" onclick="location.href='Member/loginpage.jsp'" value="로그인">
						<input type="button" onclick="location.href='Member/registselect.jsp'" value="회원가입">
					</ul>
				</header>

					
				
				<script type="text/javascript">
				$(document).ready(function(){
					
						var currentDate = new Date();
						var divClock = document.getElementById("alarm");
						var msg = currentDate.getFullYear() +""+ currentDate.getMonth() +""+ currentDate.getDate();
						divClock.innerText = msg;
					$.ajax({
						url: "alarm.do",
						type: "POST",
						dataType: "String",
						data: {
							'date' : msg
						},
						success: function (data) {
						},
						error: function (request, status, error) {
						}
					});		  
				}); 
				</script>
				<div id="alarm" ></div>

				
				<section id="banner">
					<span class="graph" style="display: block; margin: auto;"> <%@ include
							file="./location.jsp"%></span>
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
						<li><a href="index.html">Homepage</a></li>
						<li><a href="shop.do?command=selectList">shop</a></li>
						<li><a href="elements.html">Elements</a></li>
						<li><span class="opener">Submenu</span>
							<ul>
								<li><a href="#">Lorem Dolor</a></li>
								<li><a href="#">Ipsum Adipiscing</a></li>
								<li><a href="#">Tempus Magna</a></li>
								<li><a href="#">Feugiat Veroeros</a></li>
							</ul></li>
					</ul>
				</nav>


				<!-- Footer -->
				<footer id="footer">
					<p class="copyright">
						&copy; Untitled. All rights reserved. Demo Images: <a
							href="https://unsplash.com">Unsplash</a>. Design: <a
							href="https://html5up.net">HTML5 UP</a>.
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