<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1, user-scalable=no" />
<link rel="stylesheet" href="/MyAnimals/assets/css/main.css" />

</head>
<body class="is-preload">
	<jsp:useBean id="memberDto" class="com.member.dto.MemberDto"
		scope="session"></jsp:useBean>
	<!-- Wrapper -->
	<div id="wrapper">

		<!-- Main -->
		<div id="main">
			<div class="inner">
				<%@ include file="/form/header.jsp"%>
				<!-- Header -->
				<!-- 				<header id="header">
					<a href="index.html" class="logo"><strong>Editorial</strong> by HTML5 UP</a>
					<ul class="icons">
						<li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
						<li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
						<li><a href="#" class="icon brands fa-snapchat-ghost"><span class="label">Snapchat</span></a>
						</li>
						<li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
						<li><a href="#" class="icon brands fa-medium-m"><span class="label">Medium</span></a></li>
					</ul>
				</header> -->


				<!-- Section -->
				<section>
					<header class="major">

						<h2>내 정보</h2>
					</header>
					<div class="features">



						<table border="1">
							<col width="auto">
							<col width="auto">
							<col width="auto">
							<col width="auto">
							<col width="auto">
							<col width="auto">
							<col width="auto">
							<col width="auto">
							<col width="auto">
							<col width="auto">
							<tr>
								<th>아이디</th>
								<td><jsp:getProperty property="member_id" name="memberDto" /></td>
							</tr>
							<tr>
								<th>닉네임</th>
								<td><jsp:getProperty property="member_nickname"
										name="memberDto" /></td>
							</tr>
							<tr>
								<th>이름</th>
								<td><jsp:getProperty property="member_name"
										name="memberDto" /></td>
							</tr>
							<tr>
								<th>생년월일</th>
								<td><jsp:getProperty property="member_birth"
										name="memberDto" /></td>
							</tr>
							<tr>
								<th>이메일</th>
								<td><jsp:getProperty property="member_email"
										name="memberDto" /></td>
							</tr>
							<tr>
								<th>핸드폰</th>
								<td><jsp:getProperty property="member_phone"
										name="memberDto" /></td>
							</tr>
							<tr>
								<th>주소</th>
								<td><jsp:getProperty property="member_address"
										name="memberDto" /></td>
							</tr>
							<tr>
								<td><input type="button" value="수정"
									onclick="location.href='/MyAnimals/member.do?command=updateuserform'">
									<input type="button" value="계정삭제"
									onclick="location.href='/MyAnimals/member.do?command=userdeleteres&id=${memberDto.member_id}'">
									<input type="button" value="메인"
									onclick="location.href='/MyAnimals/main.jsp'"></td>
							</tr>
						</table>
					</div>
				</section>

				<!-- Section -->


			</div>
		</div>

		<!-- 사이드바 시작  -->
		<%@ include file="/form/footer.jsp"%>

		<!-- 사이드바 끝 -->
	</div>

	<!-- Scripts -->
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/browser.min.js"></script>
	<script src="assets/js/breakpoints.min.js"></script>
	<script src="assets/js/util.js"></script>
	<script src="assets/js/main.js"></script>

</body>
</html>