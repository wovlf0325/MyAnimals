<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
</head>
<%@ include file="./form/selectlocation.jsp"%>

<body>
	<canvas id="myChart" width="10" height="300"></canvas>
	<script type="text/javascript">
		
		$("#selectlocation").click(function () {
			var getgugun = new Array();
			var locationCount = new Array();
			$.ajax({
				url: "animalinfocontroller.do?command=select",
				type: "POST",
				dataType: "json",
				data: {
					'sido': $('#sido').val(),
					'gugun': $('#gugun').val()
				},
				success: function (data) {
					$.each(data, function (key, val) {
						if(key==='gugun'){
							for(var i=0; i<val.length; i++){
								getgugun[i] = val[i];
								console.log(getgugun[i]);
							}
						}else if(key=='index'){
							for(var i=0; i<val.length; i++){
								locationCount[i] = val[i];
								console.log(locationCount[i]);
							}
						}
						
					});
					var ctx = document.getElementById("myChart").getContext('2d');
					var myChart = new Chart(ctx, {
						type: 'bar',
						data: {
							labels: getgugun,
							datasets: [{
								label: '# of Votes',
								data: locationCount,
								backgroundColor: ['rgba(255, 99, 132, 0.2)',
									'rgba(54, 162, 235, 0.2)',
									'rgba(255, 206, 86, 0.2)',
									'rgba(75, 192, 192, 0.2)',
									'rgba(153, 102, 255, 0.2)',
									'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)',
									'rgba(54, 162, 235, 0.2)',
									'rgba(255, 206, 86, 0.2)',
									'rgba(75, 192, 192, 0.2)',
									'rgba(153, 102, 255, 0.2)',
									'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)',
									'rgba(54, 162, 235, 0.2)',
									'rgba(255, 206, 86, 0.2)'],
								borderColor: ['rgba(255,99,132,1)',
									'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
									'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)',
									'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)',
									'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
									'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)',
									'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)',
									'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
								borderWidth: 1
							}]
						},
						options: {
							maintainAspectRatio: false, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
							scales: {
								yAxes: [{
									ticks: {
										beginAtZero: true
									}
								}]
							}
						}
					});

				},
				error: function (request, status, error) {
				}
			});
		})

	</script>

</body>

</html>