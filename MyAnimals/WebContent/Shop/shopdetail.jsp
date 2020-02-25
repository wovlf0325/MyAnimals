<%@page import="com.member.dto.MemberDto"%>
<%@page import="com.shop.dto.ShopDto"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

<head>
<title>MyAnimals</title>
<script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
<meta charset="utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, user-scalable=no" />
<link rel="stylesheet" href="assets/css/main.css" />
</head>
<%
	ShopDto shopDto = (ShopDto)request.getAttribute("shopDto");
%>



<body class="is-preload">

	<!-- Wrapper -->
	<div id="wrapper">
		<!-- Main -->
		<div id="main">
			<div class="inner">

				<!-- Header -->
				<header id="header">
					<a href="index.html" class="logo"><strong>후원물품</strong></a>
					<ul class="icons" id="roleChk()">
						<li><a href="#" class="button big">수정하기</a></li>
					</ul>
				</header>

				<section id="banner">
					<div class="content">
						<header>
							<h1>
								<%=shopDto.getShop_name() %><br/>
							</h1>
						</header>
						<p>
							<%=shopDto.getShop_content() %><br/>
						</p>
						<ul class="actions">
							<li><a href="#" class="button big">후원하기</a></li>
						</ul>
					</div>
					<span class="image object"> <img src="images/pic10.jpg"alt="" />
						잔여량 : <%=shopDto.getShop_quantity() %>
					</span>
				</section>
			</div>
		</div>

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
						<li><a href="index.html">Homepage</a></li>
						<li><a href="generic.html">Generic</a></li>
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