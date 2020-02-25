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
	<%
		List<ShopDto> list = (List<ShopDto>) request.getAttribute("list");
	%>

<head>
<title>MyAnimals</title>
<meta charset="utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, user-scalable=no" />
<link rel="stylesheet" href="../assets/css/main.css" />
</head>
<script type="text/javascript">
	function inNumber() {
		if (event.keyCode<48 || event.keyCode>57) {
			event.returnValue = false;
		}
	}
</script>

<body class="is-preload">

	<!-- Wrapper -->
	<div id="wrapper">

		<!-- Main -->
		<div id="main">
			<div class="inner">

				<!-- Header -->
				<header id="header">
					<a href="index.html" class="logo"><strong>후원물품</strong></a>
					<ul class="icons">

					</ul>
				</header>
				<section id="banner">
					<form action="shop.do" method="post">
						<input type="hidden" name="command" value="insertres">
						<div class="row gtr-uniform">
							<div class="col-6 col-12-xsmall">
								<input type="text" name="shop_name" id="demo-name" value=""
									placeholder="Name" />
							</div>
							<div class="col-12">
								<select name="shop_kind" id="demo-category">
									<option>종류</option>
									<option>Manufacturing</option>
									<option>Shipping</option>
									<option>Administration</option>
									<option>Human Resources</option>
								</select>
							</div>
							<div class="col-6 col-12-xsmall">
								<input type="text" name="shop_price" id="demo-email" value=""
									placeholder="가격" onkeypress="inNumber();" />
							</div>
							<div class="col-6 col-12-xsmall">
								<input type="text" name="shop_quantity" id="demo-email" value=""
									placeholder="수량" onkeypress="inNumber();" />
							</div>
							<div class="col-12">
								<textarea name="shop_content" id="demo-message"
									placeholder="제품 설명을 작성해 주세요" rows="6"></textarea>
							</div>
							<ul class="actions">
								<li><input type="submit" value="등록하기"></li>
								<li><a href="#" class="button icon solid fa-download">사진등록하기</a></li>
							</ul>
						</div>
						
					</form>
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
	<script src="../assets/js/jquery.min.js"></script>
	<script src="../assets/js/browser.min.js"></script>
	<script src="../assets/js/breakpoints.min.js"></script>
	<script src="../assets/js/util.js"></script>
	<script src="../assets/js/main.js"></script>

</body>
</html>