<%@page import="com.board.dto.PagingDto"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<!--
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>

<% request.setCharacterEncoding("UTF-8");%>
<% response.setContentType("text/html; charset=UTF-8");%>

<head>
<style type="text/css">
   th{text-align: center !important}
   table{margin: auto;}
#write{
background-color: #f56a6a !important;
color: #ffffff !important;
font-family: "Roboto Slab", serif;
font-size: 0.8em;
font-weight: 700;
height: 3.5em;

}
#cancle{
background-color: #f56a6a !important;
color: #ffffff !important;
font-family: "Roboto Slab", serif;
font-size: 0.8em;
font-weight: 700;
height: 3.5em;

}
</style>
	<title>Editorial by HTML5 UP</title>
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
			
<%@ include file="/form/header.jsp" %>
	

				<!-- Banner -->
				<section id="banner">
					<div class="content">
						<header>
							<h1></h1>
						</header>
						
						
					</div>
					
				</section>

				<!-- Section -->
				<section>
					<div class="features">
						<!-- 테이블 시작 -->
						
					
						
							<form action="answer.do" method="post">
								<input type="hidden" name="command" value="writeres"/>
								<table border="1">
									<tr>
										<th>작성자</th>
										<td><input type="text" name="boardNickname"/></td>
									</tr>
									<tr>
										<th>제목</th>
										<td><input type="text" name="boardTitle" /></td>
									</tr>
									<tr>
										<th>내용</th>
										<td><textarea rows="10" cols="60" name="boardContent"></textarea></td>
									</tr>
									<tr>
										<td colspan="2" align="right">
											<input type="submit" value="write" id="write"/>
											<input type="button" value="cancle" onclick="location.href='answer.do?command=list'" id="cancle"/>
										</td>
									</tr>
								</table>
							</form>
					</div>
				</section>

			

			</div>
		</div>

<!-- 사이드바 시작  -->
<%@ include file="/form/footer.jsp" %>
	
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