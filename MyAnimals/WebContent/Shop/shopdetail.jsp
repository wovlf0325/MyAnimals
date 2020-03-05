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
	MemberDto memberDto = (MemberDto)session.getAttribute("memberDto");
%>
<script type="text/javascript">

	$(document).ready(function() {
		var id = $("#member_id").text();
		var role = $("#member_role").text();
		$("#member_id").hide();
		$("#member_role").hide();
		console.log(role);
		if(role == 'ADMIN'|| id =='<%=shopDto.getShop_owner()%>'){
			$("#update").css("display","");
		}else{
			$("#update").css("display","none");
		}	
	});
</script>


<body class="is-preload">

	<!-- Wrapper -->
	<div id="wrapper">
		<!-- Main -->
		<div id="main">
			<div class="inner">
			<div id="member_id"><%=memberDto.getMember_id()%></div>
			<div id="member_role"><%=memberDto.getMember_role()%></div>

				<!-- Header -->
				<header id="header">
					<div class="logo"><strong>후원물품</strong></div>
					<ul class="icons">
						<li><a href="shop.do?command=update&shop_seq=${shopDto.shop_seq}" class="button big" id="update">수정하기</a></li>
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
					<span class="image object"> <img src="${shopDto.shop_photo}" style="width: 500px; height: 400px;"/>
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