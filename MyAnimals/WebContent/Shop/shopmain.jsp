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
		List<ShopDto> shopList = (List<ShopDto>) request.getAttribute("shopList");
	%>

<head>
<title>MyAnimals</title>
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
					<strong>후원물품</strong>

					<c:choose>
						<c:when
							test="${memberDto.member_role == 'ADMIN' || memberDto.member_role == 'CENTER'}">
							<ul class="icons">
								<li><a href="shop.do?command=insert" class="button big">후원
										등록하기</a></li>
							</ul>
						</c:when>
						<c:otherwise>
							<ul class="icons">
								<li><a href="shop.do?command=insert" class="button big"
									style="display: none;">후원 등록하기</a></li>
							</ul>
						</c:otherwise>
					</c:choose>

				</header>
				<form action="shop.do">
					<input type="hidden" name="command" value="search"> <select
						name="searchTitle">
						<option>이름</option>
						<option>상품종류</option>
					</select> <input type="text" name="searchContent"> <input
						type="submit" value="검색">
				</form>


				<!-- Section -->
				<section>
					<c:choose>
						<c:when test="${empty list }">
							<div class="posts">
								<article>
									<h3 style="text-align: right;">상품이 존재하지 않습니다.</h3>
								</article>
							</div>
						</c:when>
						<c:otherwise>
							<div class="posts">
								<c:forEach items="${list }" var="shopDto">
									<c:choose>
										<c:when test="${shopDto.shop_quantity eq 0 }">
											<article>
												<div class="image">
													<img src="${shopDto.shop_photo}" alt=""
														style="width: 400px; height: 400px;" />
												</div>
												<h3>품절</h3>
												<ul class="actions">
													<li>${shopDto.shop_price }원</li>
												</ul>
											</article>
										</c:when>
										<c:otherwise>
											<article>
												<a href="shop.do?command=detail&shop_seq=${shopDto.shop_seq}"
													class="image"><img src="${shopDto.shop_photo}" alt=""
													style="width: 400px; height: 400px;" /></a>
												<h3>${shopDto.shop_name }</h3>

												<p>${shopDto.shop_content }</p>
												<ul class="actions">
													<li>${shopDto.shop_price }원</li>
												</ul>
											</article>
										</c:otherwise>
									</c:choose>
								</c:forEach>
							</div>
						</c:otherwise>
					</c:choose>
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