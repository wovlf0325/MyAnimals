<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
	<style type="text/css">
		*{
			padding: 0px;
			margin: 0px;
		}
		.html5{
			border: 1px dotted blue;
			margin: 10px;
		}
		section{
			height: 400px;
		}
		#left{
			width: 48%;
			height: 90%;
			float: left;
		}
		#right{
			width: 48%;
			height: 90%;
			float: right;
		}
	
	
	</style>
</head>
<body>
   <fieldset style="margin-right: auto; margin-left: auto;">
      <legend>둘중에 하나~ 골라 골라~</legend>

	<section class="html5">
		<article class="html5" id="left">
			<h1>봉사자</h1>
			<img alt="봉사자 회원가입 폼" src="image/minions.jpg" width="100%" height="100%" 
			onclick="location.href='/MyAnimals/member.do?command=registuser&name=${name}&email=${email }'">
		</article>
		<article class="html5" id="right">
			<h1>센터</h1>
			<img alt="센터 회원가입 폼" src="image/arrow.jpg" width="100%" height="100%" 
			onclick="location.href='/MyAnimals/member.do?command=registcenter&name=${name}&email=${email }'">
		</article>
	</section>
   </fieldset>
<script type="text/javascipt">

	console.log(${name});
	console.log(${email});

</script>
</body>
</html>