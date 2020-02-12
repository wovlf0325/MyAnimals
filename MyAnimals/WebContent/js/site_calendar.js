var SITE_CALENDAR = function(){
	var board_data;
	//var calendar_data;
	var menu_url;
	var classify_list;
	var lun_list, holiday_list = [];
	var lang_code = '';		// 캘린더 다국어 지원을 위한 언어 코드
	var editor_sent = false;
	var isIOS, isSafari, $fr_m_custom, $write_header, m_sticky_container_trigger_top, $disabled_help, $toolbarContainer;
	var init = function(board_data_obj,m_url,lang_code_data,target){
		board_data = board_data_obj;
		menu_url = m_url;
		lang_code = lang_code_data;

		classify_list = classifyList();

		var date = "";
		var hash_data_temp = '';
		var hash_data = '';
		var ck_color = '';
		var datetime = new Date();
		var year = datetime.getFullYear();
		var month = datetime.getMonth()+1 < 10?'0'+(datetime.getMonth()+1):datetime.getMonth()+1;
		var	day = datetime.getDate() < 10?'0'+(datetime.getDate()):datetime.getDate();

		var default_time = year+'-'+month+'-'+day;
		var default_view_type = '';
		var header_setting = '';
		var use_calendar_view_type = board_data.calendar_option.use_view_type;
		var $container = $('#calendar');
		if(board_data.calendar_option.view_type){		// 캘린더 기본 형식이 지정되어 있지 않으면 month 를 기본 형식으로 지정
			default_view_type = board_data.calendar_option.view_type;
		}else{
			default_view_type = 'month';
		}
		if(use_calendar_view_type != 'N'){
			header_setting = 'month,agendaWeek,agendaDay';
		}else{
			$container.find('._toolbar_right').hide();
		}
		ck_color = classifyDefultColor();

		// 작성 후에 작성을 완료한 해당 날짜로 이동
		if(target != undefined && typeof target == 'object'){
			if(target.hasOwnProperty('date')){
				default_time = target['date'];
				date = default_time;
			}
			if(target.hasOwnProperty('view_type')){
				if(['month','agendaWeek','agendaDay'].indexOf(target['view_type']) > 0){
					default_view_type = target['view_type'];
				}
			}
		}

		if(location.hash){
			hash_data_temp = location.hash.split('#');
			hash_data = hash_data_temp[1].split('/');
			if(hash_data[0] == 'calendar' && hash_data[1] == 'Modify' && hash_data[2] == 'Form'){
				calendarModifyForm(hash_data[3],'move_link','', lang_code, true);
			}
		}
		document.onkeydown = function(evt) {
			if(evt.keyCode == 27){
				$('._select_option').remove();
				$('._calendar_modal_back').hide();
				$('#modify_calendar').remove();
				$('#add_calendar').remove();
				$('._fc_more').remove();
				$('#post_secret_password').remove();
			}
		};

		$('._calendar_modal_back').click(function(){
			$('._calendar_modal_back').hide();
			$('#post_secret_password').remove();
		});

		// 버튼 이동시 카테고리 유지를 위해 추가
		$('.fc-button-group').click(function(){
			showSelectedCategory();
		});

		var check_write_permission = true;
		var calendarCheckPermission = function(){
			$.ajax({
				type        : 'POST',
				data        : {'idx':board_data.idx,'board_code':board_data.code,'unit_code':board_data.unit_code,'site_code':board_data.site_code},
				url         : ('/ajax/calendar_check_write_permission.cm'),
				dataType    : 'json',
				async       : false,
				cache       : false,
				success     : function (result) {
					if(result.msg != 'SUCCESS'){
						check_write_permission = result.value;
					}
				}
			});
		};

		calendarCheckPermission();

		$('#calendar').fullCalendar({
			lang: lang_code,
			header: {
				left: 'prev,next today',
				center: 'title',
				right: header_setting
			},
			defaultView: default_view_type,
			defaultDate: default_time,
			editable: check_write_permission,
			droppable: true,
			height: 'auto',
			events : {
				url: '/ajax/calendar_data.cm',
				type: 'POST',
				data: {
					'board_code':board_data.code
				},
				success : function(){
					setTimeout(function(){
						showSelectedCategory();
					},5);

				},
				error: function() {
					alert('there was an error while fetching events!');
				}
			},
			//events: event_list,
			dropAccept: '.fc-day-grid-event',
			dayClick: function(date, jsEvent, view) {
				if(location.hash){
					location.hash = 'calendar/';
				}
				calendarAddForm(date.format('YYYY-MM-DD HH:mm:ss'),jsEvent);
				$(this).css('background-color', ck_color);
				$(this).css('opacity', 0.1);
			},
			eventClick: function(calEvent, jsEvent, view) {
				calendarModifyForm(calEvent.id,jsEvent,$(this), lang_code, false);
			},
			viewRender:function(view,element){

				$('.fc-day-number.fc-today').html("<span class='fc-today-number'>"+$('.fc-today').text()+"</span>");
				$('._calendar_time').text(view.title);
				var start_date = new Date(this.start._d);
				var end_date = new Date(this.end._d);
				if(board_data.use_highlight_sunday == 'Y') $('#calendar').find('.fc-sun').css('color','#ff6056');
				if(board_data.use_highlight_holiday == 'Y'){
					var holiday_data = getHolidayData(start_date.getFullYear(), end_date.getFullYear(), start_date.getMonth() + 1, end_date.getMonth() + 1);
					holiday_list = setholidayData(holiday_data);
					$('.fc-day-number').each(function(){
						var fc_day_obj = $(this);
						$.each(holiday_list, function(key, val){
							if(fc_day_obj.attr('data-date') == val){
								fc_day_obj.addClass('fc-holiday');
								if(lang_code === 'ko'){
									var fc_day_num = fc_day_obj.html();
									if(fc_day_obj.hasClass('fc-today')){
										fc_day_obj.html('<span class="fc-today-number">' + fc_day_num + '</span><span class="holiday_text">' + holiday_data[key].name + '</span>');
									}else{
										fc_day_obj.html(fc_day_num + '<span class="holiday_text">' + holiday_data[key].name + '</span>');
									}
								}
							}
						});
					});
					$('.fc-day-header').each(function(){
						var fc_day_obj = $(this);
						$.each(holiday_list, function(key, val){
							if(fc_day_obj.attr('data-date') == val){
								fc_day_obj.addClass('fc-holiday');
								if(lang_code === 'ko'){
									var fc_day_num = fc_day_obj.html();
									fc_day_obj.html(fc_day_num + '<span class="holiday_text">' + holiday_data[key].name + '</span>');
								}
							}
						});
					});
					$('#calendar').find('.fc-holiday').css('color','#ff6056');
				}
				if(board_data.use_lunday == 'Y' && lang_code === 'ko'){
					var lun_data = getLunData(start_date.getFullYear(), end_date.getFullYear(), start_date.getMonth() + 1, end_date.getMonth() + 1);
					lun_list = setLunData(lun_data);
					$('.fc-day-number').each(function(){
						var fc_day_obj = $(this);
						if(!fc_day_obj.hasClass('fc-holiday')){
							$.each(lun_list, function(key, val){
								if(fc_day_obj.attr('data-date') == val){
									var fc_day_num = fc_day_obj.html();
									var now_lun_data = lun_data[key];
									var lun_leap_month_text = now_lun_data.is_lun_leap_month == 'Y' ? '윤' : '';
									if(fc_day_obj.hasClass('fc-today')){
										fc_day_obj.html('<span class="fc-today-number">' + fc_day_num + '</span><span class="holiday_text"><span class="lunday_pc_text">(음) </span>' + lun_leap_month_text + now_lun_data.lun_month + '.' + now_lun_data.lun_day + '</span>');
									}else{
										fc_day_obj.html(fc_day_num + '<span class="holiday_text"><span class="lunday_pc_text">(음) </span>' + lun_leap_month_text + now_lun_data.lun_month + '.' + now_lun_data.lun_day + '</span>');
									}
								}
							});
						}
					});
					$('.fc-day-header').each(function(){
						var fc_day_obj = $(this);
						if(!fc_day_obj.hasClass('fc-holiday')){
							$.each(lun_list, function(key, val){
								if(fc_day_obj.attr('data-date') == val){
									var fc_day_num = fc_day_obj.html();
									var now_lun_data = lun_data[key];
									var lun_leap_month_text = now_lun_data.is_lun_leap_month == 'Y' ? '윤' : '';
									fc_day_obj.html(fc_day_num + '<span class="holiday_text"><span class="lunday_pc_text">(음) </span>' + lun_leap_month_text + now_lun_data.lun_month + '.' + now_lun_data.lun_day + '</span>');
								}
							});
						}
					});
				}
				setTimeout(function(){
					showSelectedCategory();
				},5);
			},
			eventMouseover: function (){
				$(this).toggleClass('fc-allow-mouse-resize', true);
			},
			eventMouseout:function(){
				$(this).toggleClass('fc-allow-mouse-resize', false);
			},
			eventDragStart: function(event){ //className에 hide가 들어가 있어 드래그시 객체가 보이지 않아 추가함(문제 발생시 제거)
				event.className[3] = '';
			},
			eventDrop: function(event, delta, revertFunc) {
				calendarDragEvent(event);
			},
			eventResize: function(event, delta, revertFunc){
				calendarDragEvent(event);
			},
			eventRender:function( event, element, view ) {
				element.css('transition','none');

				if(element.css('background-color') == 'transparent'  || !element.css('background-color')){
					element.addClass('fc-hover-control');
					if($(window).width() < 640){
						if(element.find('.fc-time').text() == ''){
							element.find('.fc-content').prepend('<span class="fc-circle-icon"></span><span class="fc-time">' + getLocalizeString('타이틀_하루종일', '', '하루종일') + '</span>');
						}
					}else{
						element.find('.fc-content').prepend('<span class="fc-circle-icon"></span>');
					}
				}else{
					element.addClass('no-icon');
				}
				if(view.name != 'month'){
					if(event.textColor && !event.backgroundColor){
						element.css('background-color', event.textColor);
					}
				}

				// 0분일때 분표기 제외
				var time_text = /(\s0분|\s0)/g;
				if(time_text.test(element.find('.fc-time').text())){
					element.find('.fc-time').html(element.find('.fc-time').text().replace(time_text, ''));
				}
				$('.fc-axis.fc-time.fc-widget-content').each(function(){
					if(time_text.test($(this).find('span').text())){
						$(this).find('span').html($(this).find('span').text().replace(time_text, ''));
					}
				});
			},
			eventAfterAllRender:function(view){
				view.el.find('a.fc-more').off('click.calendar').on('click.calendar',function(k,v){
					if($(window).width() < 640){
						moreMobileEvent();
					}else{
						morePcEvent();
					}
				});

				var calendar_width = view.el[0].getBoundingClientRect().width;
				if(calendar_width < 640){
					// 모바일이 아니더라도 여백 등으로 캘린더 위젯 너비가 좁으면 fc-small-view 클래스 추가
					view.el.addClass('fc-small-view');
				}else{
					view.el.removeClass('fc-small-view');
				}
			},
			windowResize: function(view) {
				view.el.find('a.fc-more').off('click.calendar').on('click.calendar',function(k,v){
					if($(window).width() < 640){
						moreMobileEvent();
					}else{
						morePcEvent();
					}
				});

				if($(window).width() > 640){
					$('#doz_header_wrap').css('display','block');
				}

				var calendar_width = view.el[0].getBoundingClientRect().width;
				if(calendar_width < 640){
					// 모바일이 아니더라도 여백 등으로 캘린더 위젯 너비가 좁으면 fc-small-view 클래스 추가
					view.el.addClass('fc-small-view');
				}else{
					view.el.removeClass('fc-small-view');
				}
			},
			eventOrder: ["title"]
		});




		// 모바일에서 달력 형식 변경
		var select_view = $container.find('._select_view');
		select_view.val(default_view_type);
		select_view.off('change')
			.on('change',function(e) {
				$('#calendar').fullCalendar('changeView', $(this).val());
			});
		$('._prev').click(function() {
			$('#calendar').fullCalendar('prev');
		});
		$('._next').click(function() {
			$('#calendar').fullCalendar('next');
		});
	};

	var moreMobileEvent = function(){
		$('#doz_header_wrap').css('display','none');
		var new_day;
		var new_month;
		var new_year;
		var new_time_temp;
		var new_time;
		var chang_time;
		new_time_temp = $('#calendar').find('.fc-header.fc-widget-header .fc-title').text().split(' ');
		chang_time = new_time_temp[1]+' '+new_time_temp[2];
		$('#calendar').find('.fc-header.fc-widget-header .fc-title').text(chang_time);
		new_day = new_time_temp[2].split('일');
		new_month = new_time_temp[1].split('월');
		new_year = new_time_temp[0].split('년');
		new_time = new_year[0]+'-'+new_month[0]+'-'+new_day[0];

		$('#calendar').find('.fc-header.fc-widget-header .fc-close').addClass('fc_close_left');
		$('#calendar').find('.fc-header.fc-widget-header .fc-close').removeClass('fc-icon');
		$('#calendar').find('.fc-header.fc-widget-header .fc-close').removeClass('fc-icon-x');
		$('#calendar').find('.fc-header.fc-widget-header .fc-close').removeClass('fc-close');
		$('#calendar').find('.fc-header.fc-widget-header .fc_close_left').click(function(){
			$('#calendar').find('.fc-more-popover').remove();
			$('#doz_header_wrap').css('display','block');
		});
		$('#calendar').find('.fc-header.fc-widget-header').prepend("<span class='fc_plus _fc_plus' onclick=\"SITE_CALENDAR.calendarAddForm('"+new_time+"',event)\"><a></a></span>");
	};




	var morePcEvent = function(){
		var new_time_temp;
		var chang_time;
		new_time_temp = $('#calendar').find('.fc-header.fc-widget-header .fc-title').text().split(' ');
		chang_time = new_time_temp[2].split('일');
		$('#calendar').find('.fc-header.fc-widget-header .fc-title').text(chang_time[0]);
		$('#calendar').find('.fc-header').css('background','#fff');
		$('#calendar').find('.fc-header').css('padding-bottom','2px');
	};



	/**
	 *
	 * @param data
	 * @returns {{}}
	 */
	var eventCreate = function(data){
		var event_data = {};
		var classify_name = '';
		var classify_class = '';
		var s_time = '';
		var e_time = '';
		var time_ck = false;
		var s_time_ck = '';
		var e_time_ck = '';
		var s_full_time = '';
		var e_full_time = '';
		s_full_time = data.start_time.split(' ');
		e_full_time = data.end_time.split(' ');
		$.each(board_data.calendar_option.classify,function(key1,val1){
			if(val1.classify_code == data.calendar_type){
				classify_name = board_data.calendar_option.classify[key1].name;
				classify_class = board_data.calendar_option.classify[key1].color_type;
			}
		});
		if(!classify_class){
			classify_name = board_data.calendar_option.classify[0]['name'];
			classify_class = board_data.calendar_option.classify[0]['color_type'];
		}
		if(data.is_secret_calendar == 'Y'){
			event_data.className = 'fc-secret';
		}
		s_time = data.start_time.split(' ');
		e_time = data.end_time.split(' ');
		if(data.full_time == 'Y'){
			e_time_ck = e_time[0].split('-');
			s_time_ck = s_time[0].split('-');
			if(e_time_ck[0] != '0000'){
				var new_end = moment(e_time[0],"YYYY-MM-DD");
				new_end = new_end.add(1, 'd');
				event_data.start = s_time[0];
				event_data.end = new_end.format('YYYY-MM-DD');
			}else{
				event_data.start = s_time[0];
			}
		}else{
			var s_hour_ck;
			var e_hour_ck;
			e_time_ck = e_time[0].split('-');
			s_time_ck = s_time[0].split('-');
			s_hour_ck = moment(data.start_time);
			e_hour_ck = moment(data.end_time);
			var hour_time;
			hour_time = parseInt(e_hour_ck.format('X')) - parseInt(s_hour_ck.format('X'));
			if(e_time_ck[0] != '0000'){
				if(e_time[0] != s_time[0]){
					if(hour_time >= 86400){
						var new_end = moment(data.end_time, "YYYY-MM-DD");
						new_end = new_end.add(1, 'd');
						event_data.end = new_end.format();
					}
				}else{
					event_data.end = data.end_time;
				}
				if(s_full_time[0] == e_full_time[0]){
					time_ck = true;
				}
				if(hour_time < 86400){
					classify_class +=' time-event';
				}
				event_data.start = data.start_time;
			}else{
				time_ck = true;
				event_data.start = data.start_time;
			}
		}
		event_data.id = data.idx;
		event_data.title = data.subject;
		event_data.className = classify_class;
		if(data.calendar_type != undefined){
			event_data.className += ' '+data.calendar_type;
		}
		return event_data;
	};

	/**
	 * 공휴일 데이터 변환
	 * @param holiday_data
	 */

	var setholidayData = function(holiday_data){
		if(holiday_data){
			var holiday_list_temp = [];
			$.each(holiday_data, function(key, val){
				holiday_list_temp.push(moment(val.year + '-' + val.month + '-' + val. day, 'YYYY-MM-DD').format('YYYY-MM-DD'));
			});
			return holiday_list_temp;
		}
	};

	var getHolidayData = function(start_year, end_year, start_month, end_month){
		var holiday_data;
		$.ajax({
			type        : 'POST',
			data        : {'start_year':start_year, 'end_year':end_year, 'start_month':start_month, 'end_month':end_month},
			url         : ('/ajax/get_holiday_data.cm'),
			dataType    : 'json',
			async       : false,
			cache       : false,
			success     : function (result) {
				if(result.msg === 'SUCCESS'){
					holiday_data = result.holiday_data;
				}
			}
		});
		return holiday_data;
	};

	var setLunData = function(lun_data){
		if(lun_data){
			var lun_list_temp = [];
			$.each(lun_data, function(key, val){
				lun_list_temp.push(moment(val.sol_year + '-' + val.sol_month + '-' + val. sol_day, 'YYYY-MM-DD').format('YYYY-MM-DD'));
			});
			return lun_list_temp;
		}
	};

	var getLunData = function(start_year, end_year, start_month, end_month){
		var lun_data;
		$.ajax({
			type        : 'POST',
			data        : {'start_year':start_year, 'end_year':end_year, 'start_month':start_month, 'end_month':end_month},
			url         : ('/ajax/get_lun_calendar_data.cm'),
			dataType    : 'json',
			async       : false,
			cache       : false,
			success     : function (result) {
				if(result.msg === 'SUCCESS'){
					lun_data = result.lun_data;
				}
			}
		});
		return lun_data;
	};
	/**
	 *
	 * @returns {*}
	 */
	var classifyDefultColor = function(unit_code){
		var defult_color;
		$.ajax({
			type        : 'POST',
			data        : {'unit_code':unit_code},
			url         : ('/ajax/calendar_classify_defult_color.cm'),
			dataType    : 'json',
			async       : false,
			cache       : false,
			success     : function (result) {
				defult_color = result.defult_color;
			}
		});
		return defult_color;
	};

	/**
	 *
	 * @returns {*}
	 */
	var classifyBodyColor = function(unit_code){
		var defult_color;
		$.ajax({
			type        : 'POST',
			data        : {'unit_code':unit_code},
			url         : ('/ajax/calendar_classify_body_color.cm'),
			dataType    : 'json',
			async       : false,
			cache       : false,
			success     : function (result) {
				defult_color = result.defult_color;
			}
		});
		return defult_color;
	};

	/**
	 * 일정 새로 등록시 나오는 폼
	 * @param b_data
	 * @param day
	 */
	var calendarAddForm = function(day,event){
		var defult_code = 0;
		var b_data = board_data;

		$('#modify_calendar').remove();
		$('#add_calendar').remove();
		$('#calendar_type').val(defult_code);
		$('#start_day').val(day);
		$('#full_time').val('Y');
		$('#board_code').val(b_data.code);
		$('#board_idx').val(b_data.idx);
		$('#unit_code').val(b_data.unit_code);
		$('#site_code').val(b_data.site_code);

		var create_calendar = createAddCalendar(day, lang_code);


		if(create_calendar.write_permission == 'require_login'){
			if(b_data.write_permission.type !== 'group'){
				SITE_MEMBER.openLogin(menu_url);
			}
		}else if(create_calendar.write_permission == 'wait'){
			alert(getLocalizeString('설명_가입승인이_필요한_서비스입니다', '', '가입승인이 필요한 서비스 입니다.'));
		}else if(create_calendar.write_permission == 'allow'){
			var view_type = $('#calendar').fullCalendar( 'getView' ).type;
			var add_url = $('#menu_url').val()+'?cmode=write&classify_type='+$('#calendar_type').val()+'&start_time='+day+'&board_idx='+$('#board_idx').val()+'&view_type='+view_type;

			if(create_calendar.no_member_ck){
				if(!$('#add_subject').val()){
					location.href = add_url;
				}else{
					location.href = add_url+'&subject='+$('#add_subject').val();
				}
			}else{
				var $clone_add_calendar = $(create_calendar.html);
				$('body').append($clone_add_calendar);

				var top = event.pageY - 79;
				var top_over_size = 0;
				var top_size = event.clientY;
				var left = event.pageX;
				var left_over_size = 0;
				var left_prong_size = 0;
				var right = 0;
				var right_over_size = 0;
				var right_prong_size = 0;
				right = $(window).width() - left;
				if(event.pageX < 195){
					left_over_size = 195-event.pageX;
					left_prong_size = 182 - left_over_size;
					left =left + left_over_size;
				}
				if(right < 195){
					right_over_size = 195-right;
					right_prong_size = 182 + right_over_size;
					left = left - right_over_size;
				}
				if(top_size < 160){
					$clone_add_calendar.find('._bottom_prong').removeClass('bottom-prong');
					$clone_add_calendar.find('._bottom_prong').addClass('top-prong');
					top = top + 180;
				}

				$clone_add_calendar.css({
					top : top,
					left : left
				});
				if(left_prong_size > 0){
					$clone_add_calendar.find('._bottom_prong').css({
						left : left_prong_size
					});
				}
				if(right_prong_size > 0){
					$clone_add_calendar.find('._bottom_prong').css({
						left : right_prong_size
					});
				}

				$clone_add_calendar.find('#add_subject').focus();

				calendarTypeSelect($clone_add_calendar, defult_code);

				$("body").off('mousedown.calendar').on('mousedown.calendar', function(e){
					var t3 = $(e.target);
					if(t3.closest($clone_add_calendar).length == 0 && t3.closest('.calendar_dropdown').length == 0){
						$clone_add_calendar.hide();
					}
				});

				$clone_add_calendar.find('._add_calendar').click(function(){
					$('#subject').val($clone_add_calendar.find('#add_subject').val());
					$('#link_url').val($clone_add_calendar.find('#add_link_url').val());
					calendarAdd($('#add_calendar_form'),$clone_add_calendar,defult_code,'add');
				});

				$('#add_subject').keypress(function(event){
					if(event.which == 13){
						$('#subject').val($('#add_subject').val());
						$('#link_url').val($clone_add_calendar.find('#add_link_url').val());
						calendarAdd($('#add_calendar_form'),$clone_add_calendar,defult_code,'add');
					}
				});

				$clone_add_calendar.find('._close_calendar').click(function(){
					$('._select_option').remove();
					$('#modify_calendar').remove();
					$('#add_calendar').remove();
					$('#doz_header_wrap').css('display','block');
				});

				$clone_add_calendar.find('._detail_calendar').click(function(){
					if(!$clone_add_calendar.find('#add_subject').val()){
						$clone_add_calendar.find('._detail_calendar').attr('href',add_url);
					}else{
						$clone_add_calendar.find('._detail_calendar').attr('href',add_url+'&subject='+$('#add_subject').val());
					}
				});
			}
		}
	};

	/**
	 * 일정 클릭 시 일정 정보/수정폼 노출
	 * @param id
	 * @param event
	 * @param $obj
	 * @param lang_code
	 * @param is_hash		새로고침이나 주소 공유의 해시로 인해 발동 시 true, 일정 클릭으로 인해 발동 시 false
	 */
	var calendarModifyForm = function(id,event,$obj, lang_code, is_hash){
		$('#add_calendar').remove();
		$('#modify_calendar').remove();
		$('._select_option').remove();

		var modify_calendar = createModifyCalendar(id, lang_code);
		if(modify_calendar != false){
			if($obj && modify_calendar.today_ck === false){
				$obj.addClass('active');
			}
			if(modify_calendar.secret_type != 'no_permission_member'){
				if(modify_calendar.secret_type == 'no_member'){
					if(event == 'move_link'){
						alert(LOCALIZE.설명_접근권한이없습니다());
						location.href = '';
					}else{
						SECRET_ARTICLE.confirmSecret(
							{'target' : $('#calendar')},
							modify_calendar.board_code,
							modify_calendar.idx, function(){
								$('#post_secret_password').hide();
								$('#modify_calendar').show();
								modifyForm(id, event, $obj, modify_calendar);
							},
							'calendar'
						);
					}
				}else{
					if(modify_calendar.is_modify || is_hash || !modify_calendar.link_url){
						modifyForm(id, event, $obj, modify_calendar);
					}else{
						// 작성자나 관리자가 아닌 경우 일정에 링크가 있으면 링크 연결
						if(modify_calendar.link_new_window !== 'N'){
							window.open(modify_calendar.link_url);
						}else{
							location.href = modify_calendar.link_url;
						}
					}
				}

			}
		}else{
			alert(getLocalizeString('버튼_게시물접근권한없음', '', '게시물 접근 권한이 없습니다. 해당 사이트 관리자에게 문의하세요.'));
		}
	};

	/**
	 *
	 * @param id
	 * @param event
	 * @param $obj
	 * @param modify_calendar
	 */
	var modifyForm = function(id,event,$obj,modify_calendar){
		if(modify_calendar.secret_type == 'no_permission_login'){
			SITE_MEMBER.openLogin(menu_url);
		}
		var $clone_modify_calendar = $(modify_calendar.html);
		if(typeof event === 'undefined' || event == '' || event == 'null' || event == 'move_link'){
			$('#calendar').append($clone_modify_calendar);
			var position = $('#calendar').offset();
			$('html, body').animate({scrollTop : position.top}, 100);

		}else{
			$('body').append($clone_modify_calendar);

			var modify_form_size = '';
			var explanation_size = '';
			var modify_form_top_size = '';
			var box_content_size = '';
			var top = '';
			explanation_size = $clone_modify_calendar.find('._board_explanation').css('height').split('px');
			explanation_size = parseInt(explanation_size[0]);
			explanation_size = explanation_size/2;
			modify_form_size = $clone_modify_calendar.css('height').split('px');
			modify_form_size = parseInt(modify_form_size[0]);
			modify_form_top_size = modify_form_size;
			box_content_size = $clone_modify_calendar.find('._box_content').css('height').split('px');
			box_content_size = parseInt(box_content_size[0]);


			if(explanation_size > 0){
				modify_form_size = modify_form_size/2 + explanation_size + 21;
			}else{
				modify_form_size = modify_form_size/2 + explanation_size + 12;
			}
			if(explanation_size == 26){
				top = event.pageY - modify_form_size-5;
			}else{
				top = event.pageY - box_content_size;
			}
			var top_over_size = 0;
			var top_size = event.clientY;
			var left = event.pageX;
			var left_over_size = 0;
			var left_prong_size = 0;
			var right = 0;
			var right_over_size = 0;
			var right_prong_size = 0;
			right = $(window).width() - left;
			if(event.pageX < 195){
				left_over_size = 195-event.pageX;
				left_prong_size = 182 - left_over_size;
				left =left + left_over_size;
			}
			if(right < 195){
				right_over_size = 195-right;
				right_prong_size = 182 + right_over_size;
				left = left - right_over_size;
			}
			if(top_size < modify_form_top_size){
				$clone_modify_calendar.find('._bottom_prong').removeClass('bottom-prong');
				$clone_modify_calendar.find('._bottom_prong').addClass('top-prong');
				if(explanation_size == 26){
					top = top + 213;
				}else{
					top = top + modify_form_top_size+25;
				}
			}
			$clone_modify_calendar.css({
				top : top,
				left : left
			});
			if(left_prong_size > 0){
				$clone_modify_calendar.find('._bottom_prong').css({
					left : left_prong_size
				});
			}
			if(right_prong_size > 0){
				$clone_modify_calendar.find('._bottom_prong').css({
					left : right_prong_size
				});
			}
		}

		$("body").off('mousedown.calendar').on('mousedown.calendar', function(e){
			var t3 = $(e.target);
			if(t3.closest($clone_modify_calendar).length == 0 && t3.closest('#post_secret_password').length == 0){
				$clone_modify_calendar.hide();
				if($obj && modify_calendar.today_ck === false){
					$obj.removeClass('active');
				}
				if(t3.closest('.fc-widget-content').length == 0){
					$('#_fc_more').hide();
				}
				location.hash = 'calendar/';
				$("body").off('mousedown.calendar');
			}
		});

		$clone_modify_calendar.find('._close_calendar').click(function(){
			$('#modify_calendar').remove();
			$('#add_calendar').remove();
			$('#doz_header_wrap').css('display','block');
		});

		location.hash = 'calendar/Modify/Form/'+id;
	};

	/**
	 * 일정 등록 폼 생성
	 * @param login_data
	 * @returns {*}
	 */
	var createAddCalendar = function(day, lang_code){
		var add_calendar;
		var unit_code = board_data.unit_code;
		var site_code = board_data.site_code;
		var board_code = board_data.code;
		$.ajax({
			type        : 'POST',
			data        : {'site_code':site_code, 'unit_code':unit_code,'board_code':board_code,'day':day,'menu_url':$('#menu_url').val(), 'lang_code' : lang_code},
			url         : ('/ajax/calendar_add_create.cm'),
			dataType    : 'json',
			async       : false,
			cache       : false,
			success     : function (result) {
				add_calendar = result;
			}
		});
		return add_calendar;
	};

	/**
	 * 일정 수정 폼 생성
	 * @param unit_code
	 * @param board_code
	 * @param idx
	 * @param secret_type
	 * @returns {*}
	 */
	var createModifyCalendar = function(idx, lang_code){
		var modify_calendar;
		var unit_code = board_data.unit_code;
		var site_code = board_data.site_code;
		var board_code = board_data.code;
		var view_type = $('#calendar').fullCalendar( 'getView' ).type;

		$.ajax({
			type        : 'POST',
			data        : {'site_code':site_code, 'unit_code':unit_code,'board_code':board_code,'idx':idx,'menu_url':$('#menu_url').val(), 'lang_code' : lang_code, 'view_type' : view_type},
			url         : ('/ajax/calendar_modify_create.cm'),
			dataType    : 'json',
			async       : false,
			cache       : false,
			success     : function (result) {
				if(result.msg == 'SUCCESS'){
					modify_calendar = result;
				}else if(result.msg == 'IS_HIDE'){
					modify_calendar = false;
				}else{
					alert(result.msg);
					modify_calendar = false;
				}
			}
		});
		return modify_calendar;
	};

	/**
	 * 일정 더보기 폼 생성
	 * @param unit_code
	 * @param board_code
	 * @param list
	 * @param time
	 * @returns {*}
	 */
	var createMoreCalendar = function(list,time){
		var more_calendar;
		var unit_code = board_data.unit_code;
		var site_code = board_data.site_code;
		var board_code = board_data.code;
		$.ajax({
			type        : 'POST',
			data        : {'site_code':site_code, 'unit_code':unit_code,'board_code':board_code,'list':list,'time':time},
			url         : ('/ajax/calendar_more_create.cm'),
			dataType    : 'json',
			async       : false,
			cache       : false,
			success     : function (result) {
				more_calendar = $(result.html);
			}
		});
		return more_calendar;
	};

	/**
	 * 설정된 분류 생성
	 * @param b_data
	 * @returns {Array}
	 */
	var classifyList = function(){
		var b_data = board_data;
		var calendar_type_list_temp = [];
		$.each(b_data.calendar_option.classify,function(key,val){
			var calendar_list = {};
			var $name = val.name;
			var $code = val.classify_code;
			var $color_type = val.color_type;
			calendar_list.key = key;
			calendar_list.value = '<span class="color_style '+$color_type+' active"></span>'+RemoveTag($name);
			calendar_type_list_temp.push(calendar_list);
		});
		return calendar_type_list_temp;
	};

	/**
	 * 지정날짜 삭제
	 * @param unit_code
	 * @param board_code
	 * @param idx
	 * @param menu_url
	 */
	var deleteCalendar = function(unit_code,board_code,idx,menu_url){
		var unit_code = board_data.unit_code;
		var site_code = board_data.site_code;
		var board_code = board_data.code;
		$.ajax({
			type        : 'POST',
			data        : {'site_code':site_code,'unit_code':unit_code,'board_code':board_code,'idx':idx,'menu_url':menu_url},
			url         : ('/ajax/calendar_delete.cm'),
			dataType    : 'json',
			async       : false,
			cache       : false,
			success     : function (result) {
				if(result.msg == 'SUCCESS'){
					$('#calendar').fullCalendar('removeEvents', result.idx);
					$('#modify_calendar').remove();
					showSelectedCategory();
				}else{
					alert(result.msg);
				}
			}
		});
	};

	/**
	 * 일정 저장 or 수정
	 * @param $obj
	 * @param $obj2
	 * @param defult_code
	 * @param type
	 */
	var calendarAdd = function($obj){
		$.ajax({
			type        : 'POST',
			data        : $obj.serialize(),
			url         : ('/ajax/calendar_add.cm'),
			dataType    : 'json',
			async       : true,
			cache       : false,
			success     : function (result) {
				if(result.msg == 'SUCCESS'){
					if(result.add_type == 'list'){
						var event_data = eventCreate(result.calendar_data);
						$('#calendar').fullCalendar('addEventSource', [event_data]);
						$('#add_calendar').remove();

						// 추가한 카테고리가 현재 카테고리와 다를 경우 바로 보여주지 않음
						showSelectedCategory();
					}else{
						location.href=result.url;
					}
				}else{
					alert(result.msg);
					editor_sent = false;
				}
			}
		});
	};

	/**
	 * 상세 일정 저장 및 수정
	 * @param $obj
	 * @returns {boolean}
	 */
	var calendarDetailAdd = function(){
		var $calendar_body = $('#calendar_body');
		var $explanation_input = $('#explanation_input');
		if(editor_sent) return false;
		editor_sent = true;
		if(IE_VERSION < 10){
			var explanation = CKEDITOR.instances.post_body.getData();
			$explanation_input.val(explanation);
			calendarAdd($('#add_calendar_form'));
		}else{
			if($calendar_body.hasClass('fr-code-view'))
				$calendar_body.froalaEditor('codeView.toggle');

			var explanation = $calendar_body.froalaEditor("html.get", true, true);
			$explanation_input.val(explanation);
			calendarAdd($('#add_calendar_form'));
		}
	};

	var calendarDetailCancel = function(back_url){
		if(isIOS && isSafari){
			var s_top = $(this).scrollTop();
			$write_header.css({'-webkit-transition': 'none', 'transition': 'none', 'position': 'fixed', 'top': 0});
			$fr_m_custom.toggleClass('m_sticky_container', s_top > m_sticky_container_trigger_top);
			$fr_m_custom.toggleClass('m_sticky_container_ios', s_top > m_sticky_container_trigger_top);
			if(s_top > m_sticky_container_trigger_top){
				$toolbarContainer.css({'-webkit-transition': 'none', 'transition': 'none', 'position': 'fixed', 'top': $write_header.height() + 'px'});
			}else{
				$toolbarContainer.css({'-webkit-transition': 'none', 'transition': 'none', 'top': 'auto'});
			}
		}
		document.location.href = back_url;
	};

	/**
	 *
	 * @param event
	 */
	var calendarDragEvent = function(event){
		var b_data = board_data;
		var start_time = '';
		var end_time = '';
		var idx = '';
		start_time = event.start.format();
		idx = event.id;
		if(event.end){
			if(event.start.format('YYYY-MM-DD') != event.end.format('YYYY-MM-DD')){
				end_time = event.end.format();
				var new_end = moment(end_time);
				new_end = new_end.add(-1, 'd');
				end_time = new_end.format();
			}
		}else{
			end_time = '';
		}
		$.ajax({
			type        : 'POST',
			data        : {'start_time':start_time,'end_time':end_time,'idx':idx,'board_code':b_data.code,'unit_code':b_data.unit_code,'site_code':b_data.site_code},
			url         : ('/ajax/calednar_drag_event.cm'),
			dataType    : 'json',
			async       : false,
			cache       : false,
			success     : function (result) {
				if(result.msg != 'SUCCESS'){
					$('body').toggleClass('drag_disabled');
					alert(result.msg);
					location.reload();
				}else{
					setTimeout(function(){
						showSelectedCategory();
					},0);
				}
			}
		});
	};

	/**
	 * 분류 리스트 출력
	 * @param $obj
	 * @param calendar_type_list
	 * @param defult_code
	 */
	var calendarTypeSelect = function($obj,defult_code){
		var calendar_type_list= classify_list;
		$obj.find('._calendar_type_list').setSelectBox({
			option: calendar_type_list,
			'set' : {
				select_custom_cls:'calendar_select',
				custom_cls:'calendar_dropdown',
				width:180
			},
			'default' : defult_code,
			change: function (o) {
				$('#calendar_type').val(o.key);
			}
		});
	};

	/**
	 * 시간에 따라 AM/PM return
	 * @param $time
	 */
	var getTimeHeader = function($time){
		var $time_temp_split = $time.split(':');
		if($time_temp_split[0] < 12){
			return LOCALIZE.설명_오전();
		}else{
			return LOCALIZE.설명_오후();
		}
	};

	/**
	 * 시작 시간
	 * @param $setting_time
	 */
	var calendarStartTime = function($setting_time){
		var $timepicker_obj = $('#start_timepicker');
		var $time_input_obj = $('#start_time');
		$setting_time = getTimeHeader($setting_time) + moment($setting_time, ' hh:mm').format(' hh:mm');

		// timepicker 기본 설정
		$timepicker_obj.timepicker({
			roundingFunction: function(seconds) {
				return seconds;
			},
			timeFormat: 'a h:i',
			lang: {am: LOCALIZE.설명_오전(), pm: LOCALIZE.설명_오후()}
		}).val($setting_time);

		// 키보드 입력시 리스트 감춤
		$timepicker_obj.on('keydown', function(){
			$('.ui-timepicker-wrapper').hide();
		});

		// 데이터 변경시 시간 유효성 검사 후 데이터 저장
		$timepicker_obj.on('change', function() {
			var replace_temp = $(this).val().split(' ');
			var replace_header_temp = replace_temp[0];
			var replace_time = replace_header_temp + moment(replace_temp[1], ' hh:mm').format(' hh:mm');
			if(replace_time == 'Invalid date'){
				$timepicker_obj.css({
					'border-color' : '#E01F10'
				});
				return false;
			}

			$(this).val(replace_time);

			var start_time = '';
			var start_time_temp = $(this).val();
			var start_time_temp_split = start_time_temp.split(' ');

			if(start_time_temp_split[0] == LOCALIZE.설명_오전()){
				start_time_temp_split = start_time_temp_split[1].split(':');
				if(start_time_temp_split[0] == 12){
					start_time = moment(parseInt(start_time_temp_split[0]) - 12 + ':' + start_time_temp_split[1], 'HH:mm:ss').format('HH:mm:ss');
				}else{
					start_time = moment(start_time_temp_split[0] + ':' + start_time_temp_split[1], 'HH:mm:ss').format('HH:mm:ss');
				}
			}else{
				start_time_temp_split = start_time_temp_split[1].split(':');
				if(start_time_temp_split[0] == 12){
					start_time = moment(start_time_temp_split[0] + ':' + start_time_temp_split[1], 'HH:mm:ss').format('HH:mm:ss');
				}else{
					start_time = moment(parseInt(start_time_temp_split[0]) + 12 + ':' + start_time_temp_split[1], 'HH:mm:ss').format('HH:mm:ss');
				}
			}
			$timepicker_obj.css({
				'border-color' : '#e0e0e0'
			});
			$time_input_obj.val(start_time);
		});
	};

	/**
	 * 종료 시간
	 * @param $setting_time
	 */
	var calendarEndTime = function($setting_time){
		var $timepicker_obj = $('#end_timepicker');
		var $time_input_obj = $('#end_time');
		$setting_time = getTimeHeader($setting_time) + moment($setting_time, ' hh:mm').format(' hh:mm');

		// timepicker 기본 설정
		$timepicker_obj.timepicker({
			roundingFunction: function(seconds) {
				return seconds;
			},
			timeFormat: 'a h:i',
			lang: {am: LOCALIZE.설명_오전(), pm: LOCALIZE.설명_오후()}
		}).val($setting_time);

		// 키보드 입력시 리스트 감춤
		$timepicker_obj.on('keydown', function(){
			$('.ui-timepicker-wrapper').hide();
		});

		// 데이터 변경시 시간 유효성 검사 후 데이터 저장
		$timepicker_obj.on('change', function() {
			var replace_temp = $(this).val().split(' ');
			var replace_header_temp = replace_temp[0];
			var replace_time = replace_header_temp + moment(replace_temp[1], ' hh:mm').format(' hh:mm');
			if(replace_time == 'Invalid date'){
				$timepicker_obj.css({
					'border-color' : '#E01F10'
				});
				return false;
			}

			$(this).val(replace_time);

			var start_time = '';
			var start_time_temp = $(this).val();
			var start_time_temp_split = start_time_temp.split(' ');

			if(start_time_temp_split[0] == LOCALIZE.설명_오전()){
				start_time_temp_split = start_time_temp_split[1].split(':');
				if(start_time_temp_split[0] == 12){
					start_time = moment(parseInt(start_time_temp_split[0]) - 12 + ':' + start_time_temp_split[1], 'HH:mm:ss').format('HH:mm:ss');
				}else{
					start_time = moment(start_time_temp_split[0] + ':' + start_time_temp_split[1], 'HH:mm:ss').format('HH:mm:ss');
				}
			}else{
				start_time_temp_split = start_time_temp_split[1].split(':');
				if(start_time_temp_split[0] == 12){
					start_time = moment(start_time_temp_split[0] + ':' + start_time_temp_split[1], 'HH:mm:ss').format('HH:mm:ss');
				}else{
					start_time = moment(parseInt(start_time_temp_split[0]) + 12 + ':' + start_time_temp_split[1], 'HH:mm:ss').format('HH:mm:ss');
				}
			}
			$timepicker_obj.css({
				'border-color' : '#e0e0e0'
			});
			$time_input_obj.val(start_time);
		});
	};

	/**
	 * 시작 시간
	 * @param $obj
	 * @param start_time
	 */
	var calendarStartDate = function($obj,start_time){
		start_time = moment(start_time);
		$obj.find('#start_datepicker').datetimepicker({
			dayViewHeaderFormat: 'YYYY MMMM',
			locale: lang_code,
			icons: {
				time: 'zmdi zmdi-time',
				date: 'zmdi zmdi-calendar',
				up: 'zmdi zmdi-chevron-up',
				down: 'zmdi zmdi-chevron-down',
				previous: 'zmdi zmdi-chevron-left',
				next: 'zmdi zmdi-chevron-right',
				today: 'glyphicon glyphicon-screenshot',
				clear: 'glyphicon glyphicon-trash'
			},
			format : 'll'
		}).on("dp.change",function(data){
			$obj.find('#start_day').val(data.date.format('YYYY-MM-DD'));
			calendarEndDate($obj,data.date.format('YYYY-MM-DD'));
		});
		$obj.find('#start_datepicker').data("DateTimePicker").date(start_time);
	};

	/**
	 *
	 * @param $obj
	 * @param end_time
	 */
	var calendarEndDate = function($obj,end_time){
		end_time = moment(end_time);
		$obj.find('#end_datepicker').datetimepicker({
			dayViewHeaderFormat: 'YYYY MMMM',
			locale: lang_code,
			icons: {
				time: 'zmdi zmdi-time',
				date: 'zmdi zmdi-calendar',
				up: 'zmdi zmdi-chevron-up',
				down: 'zmdi zmdi-chevron-down',
				previous: 'zmdi zmdi-chevron-left',
				next: 'zmdi zmdi-chevron-right',
				today: 'glyphicon glyphicon-screenshot',
				clear: 'glyphicon glyphicon-trash'
			},
			format : 'll'
		}).on("dp.change",function(data){
			if(data.date){
				$obj.find('#end_day').val(data.date.format('YYYY-MM-DD'));
			}else{
				$obj.find('#end_day').val('');
			}
		});
		$obj.find('#end_datepicker').data("DateTimePicker").date(end_time);
	};

	/**
	 *
	 * @param $obj
	 */
	var fullTimeCk = function($obj){
		if($obj.find("input:checkbox[id='full_time']").is(":checked") === true){
			$obj.find('._start_time').hide();
			$obj.find('._end_time').hide();
		}else{
			$obj.find('._start_time').show();
			$obj.find('._end_time').show();
		}
	};

	var calendarAdminShow = function(board_data, lang_code, target){
		var $container = $('#calendar');
		var datetime = new Date();

		var year = datetime.getFullYear();
		var month = datetime.getMonth()+1 < 10?'0'+(datetime.getMonth()+1):datetime.getMonth()+1;
		var	day = datetime.getDate() < 10?'0'+(datetime.getDate()):datetime.getDate();
		var default_time = year+'-'+month+'-'+day;

		// 작성 후에 작성을 완료한 해당 날짜로 이동
		if(target != undefined && typeof target == 'object'){
			if(target.hasOwnProperty('date')){
				default_time = target['date'];
			}
		}

		var default_view_type = '';
		var header_setting = '';
		var use_calendar_view_type = board_data.calendar_option.use_view_type;
		if(board_data.calendar_option.view_type){		// 캘린더 기본 형식이 지정되어 있지 않으면 month 를 기본 형식으로 지정
			default_view_type = board_data.calendar_option.view_type;
		}else{
			default_view_type = 'month';
		}
		if(use_calendar_view_type != 'N'){
			header_setting = 'month,agendaWeek,agendaDay';
		}else{
			$container.find('._toolbar_right').hide();
		}
		$container.fullCalendar({
			lang: lang_code,
			header: {
				left: 'prev,next today',
				center: 'title',
				right: header_setting
			},
			defaultView: default_view_type,
			defaultDate: default_time,
			editable: true,
			droppable: true,
			eventLimit: 5, // allow "more" link when too many events
			events: '',
			dropAccept: '.fc-day-grid-event',
			viewRender:function(view,element){
				$('.fc-day-number.fc-today').html("<span class='fc-today-number'>"+$('.fc-today').text()+"</span>");
				$('._calendar_time').text(view.title);
				var start_date = new Date(this.start._d);
				var end_date = new Date(this.end._d);
				if(board_data.use_highlight_sunday == 'Y') $container.find('.fc-sun').css('color','#ff6056');
				if(board_data.use_highlight_holiday == 'Y'){
					var holiday_data = getHolidayData(start_date.getFullYear(), end_date.getFullYear(), start_date.getMonth() + 1, end_date.getMonth() + 1);
					holiday_list = setholidayData(holiday_data);
					$('.fc-day-number').each(function(){
						var fc_day_obj = $(this);
						$.each(holiday_list, function(key, val){
							if(fc_day_obj.attr('data-date') == val){
								fc_day_obj.addClass('fc-holiday');
								if(lang_code === 'ko'){
									var fc_day_num = fc_day_obj.html();
									if(fc_day_obj.hasClass('fc-today')){
										fc_day_obj.html('<span class="fc-today-number">' + fc_day_num + '</span><span class="holiday_text">' + holiday_data[key].name + '</span>');
									}else{
										fc_day_obj.html(fc_day_num + '<span class="holiday_text">' + holiday_data[key].name + '</span>');
									}
								}
							}
						});
					});
					$('.fc-day-header').each(function(){
						var fc_day_obj = $(this);
						$.each(holiday_list, function(key, val){
							if(fc_day_obj.attr('data-date') == val){
								fc_day_obj.addClass('fc-holiday');
								if(lang_code === 'ko'){
									var fc_day_num = fc_day_obj.html();
									fc_day_obj.html(fc_day_num + '<span class="holiday_text">' + holiday_data[key].name + '</span>');
								}
							}
						});
					});
					$container.find('.fc-holiday').css('color','#ff6056');
				}
				if(board_data.use_lunday == 'Y' && lang_code === 'ko'){
					var lun_data = getLunData(start_date.getFullYear(), end_date.getFullYear(), start_date.getMonth() + 1, end_date.getMonth() + 1);
					lun_list = setLunData(lun_data);
					$('.fc-day-number').each(function(){
						var fc_day_obj = $(this);
						if(!fc_day_obj.hasClass('fc-holiday')){
							$.each(lun_list, function(key, val){
								if(fc_day_obj.attr('data-date') == val){
									var fc_day_num = fc_day_obj.html();
									var now_lun_data = lun_data[key];
									var lun_leap_month_text = now_lun_data.is_lun_leap_month == 'Y' ? '윤' : '';
									if(fc_day_obj.hasClass('fc-today')){
										fc_day_obj.html('<span class="fc-today-number">' + fc_day_num + '</span><span class="holiday_text"><span class="lunday_pc_text">(음) </span>' + lun_leap_month_text + now_lun_data.lun_month + '.' + now_lun_data.lun_day + '</span>');
									}else{
										fc_day_obj.html(fc_day_num + '<span class="holiday_text"><span class="lunday_pc_text">(음) </span>' + lun_leap_month_text + now_lun_data.lun_month + '.' + now_lun_data.lun_day + '</span>');
									}
								}
							});
						}
					});
					$('.fc-day-header').each(function(){
						var fc_day_obj = $(this);
						if(!fc_day_obj.hasClass('fc-holiday')){
							$.each(lun_list, function(key, val){
								if(fc_day_obj.attr('data-date') == val){
									var fc_day_num = fc_day_obj.html();
									var now_lun_data = lun_data[key];
									var lun_leap_month_text = now_lun_data.is_lun_leap_month == 'Y' ? '윤' : '';
									fc_day_obj.html(fc_day_num + '<span class="holiday_text"><span class="lunday_pc_text">(음) </span>' + lun_leap_month_text + now_lun_data.lun_month + '.' + now_lun_data.lun_day + '</span>');
								}
							});
						}
					});
				}
			},
			eventAfterAllRender:function(view){
				var calendar_width = view.el[0].getBoundingClientRect().width;
				if(calendar_width < 640){
					// 모바일이 아니더라도 여백 등으로 캘린더 위젯 너비가 좁으면 fc-small-view 클래스 추가
					view.el.addClass('fc-small-view');
				}else{
					view.el.removeClass('fc-small-view');
				}
				var select_view = $container.find('._select_view');
				select_view.val(default_view_type);
			}
		});
	};


	var currentCategory = '';
	var $calendar = "";
	/**
	 * 카테고리 선택시 메뉴 선택된 항목 변경
	 * @param obj
	 * @param category
	 */
	var changeCategory = function(obj, category){

		var selected = $(obj).parent('li').index() + 1;
		var $sub_menu = $('ul.'+board_data.code);
		$sub_menu.find('.active').removeClass('active');
		$sub_menu.find('li:nth-child('+(selected)+')').addClass('active');
		$sub_menu.find('li:nth-child('+(selected)+')').find('a').addClass('active');

		currentCategory = category;
		showSelectedCategory();
	};
	/**
	 * 현재 선택된 카테고리 하위 항목만 보여주기
	 */
	var showSelectedCategory = function(){
		if($calendar === "") $calendar = $('#calendar');
		$calendar.find('a.fc-event').addClass('hide');
		if(currentCategory != ''){
			$calendar.find('a.fc-event.' + currentCategory).removeClass('hide');
		}else{
			$calendar.find('a.fc-event').removeClass('hide');
		}
	};

	var initWrite = function(calendar_data){
		var $add_calendar_form = $('#add_calendar_form');
		var $link_new_window = $add_calendar_form.find('._link_new_window');
		$link_new_window.setCheck({
			value : calendar_data.link_new_window !== 'N',
			change: function(res){
				console.log(res);
			}
		});
		var $calendar_body = $('#calendar_body');
		if(IE_VERSION < 10){
			CKEDITOR.replace( 'calendar_body',{
				filebrowserImageUploadUrl: '/ajax/post_image_upload.cm?board_code='+board_data.code
			});
		}else{
			$calendar_body.setFroala({
				code : board_data.code,
				image_upload_url : "/ajax/post_image_upload.cm",
				file_upload_url : "/ajax/post_file_upload.cm",
				file_list_obj : $("#file_list"),
				placeholderText: getLocalizeString('설명_상세내용이있는경우만입력', '', '상세 내용이 있는 경우만 입력'),
				toolbarButtons : ["bold", "italic", "underline", "strikeThrough", "fontFamily", "fontSize", 'emoticons', '|', "clearFormatting", "color", "align", "formatOL", "formatUL", 'quote', "insertHR", '|', 'insertLink', 'insertCustomImage', 'insertVideo', 'insertTable', "html"],
				toolbarButtonsMD : ["bold", "italic", "underline", "strikeThrough", "fontFamily", "fontSize", 'emoticons', '|', "clearFormatting", "color", "align", "formatOL", "formatUL", 'quote', "insertHR", '|', 'insertLink', 'insertCustomImage', 'insertVideo', 'insertTable', "html"],
				toolbarButtonsSM : ["bold", "italic", "underline", "strikeThrough", "fontFamily", "fontSize", 'emoticons', '|', "clearFormatting", "color", "align", "formatOL", "formatUL", 'quote', "insertHR", '|', 'insertLink', 'insertCustomImage', 'insertVideo', 'insertTable', "html"],
				toolbarButtonsXS : ['insertCustomImage', 'insertVideo', 'insertLink', '|', "fontSize", "bold", "italic", "underline", "strikeThrough", "align", "color", "clearFormatting", '|', 'quote', "insertHR", "formatOL", "formatUL"],
				mobile_custom: true
			});
		}

		isIOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
		isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		$fr_m_custom = $add_calendar_form.find('._fr-m-custom');
		$write_header = $add_calendar_form.find('._write_header');
		m_sticky_container_trigger_top = $fr_m_custom.offset().top - $fr_m_custom.height();
		$disabled_help = $add_calendar_form.find('._disabled_help');
		$toolbarContainer = $add_calendar_form.find('#toolbarContainer');
		if(isIOS && isSafari){
			$write_header.css('position', 'absolute');
		}

		var timeoutTime = isIOS && isSafari ? 100 : 10;
		var resize_time;
		resizeStickyContainer();
		$(window).off('scroll.mobile_write resize.mobile_write').on('scroll.mobile_write resize.mobile_write',function(){
			var s_top = $(this).scrollTop();
			if(isIOS && isSafari){
				$write_header.css({'-webkit-transition': 'none', 'transition': 'none', 'top': 0});
				if(s_top > m_sticky_container_trigger_top){
					$toolbarContainer.css({'-webkit-transition': 'none', 'transition': 'none', 'top': 0});
				}
			}
			if(resize_time) {
				clearTimeout(resize_time);
			}
			resize_time = setTimeout(function() {
				resizeStickyContainer();
			}, timeoutTime);
		});
	};

	function resizeStickyContainer(){
		var s_top = $(this).scrollTop();
		if(isIOS && isSafari){
			$write_header.css({'-webkit-transition': 'top 100ms', 'transition': 'top 100ms', 'top': s_top + 'px'});
			$fr_m_custom.toggleClass('m_sticky_container', s_top > m_sticky_container_trigger_top);
			$fr_m_custom.toggleClass('m_sticky_container_ios', s_top > m_sticky_container_trigger_top);
			if(s_top > m_sticky_container_trigger_top){
				$toolbarContainer.css({'-webkit-transition': 'top 100ms', 'transition': 'top 100ms', 'top': s_top + 'px'});
			}else{
				$toolbarContainer.css({'-webkit-transition': 'none', 'transition': 'none', 'top': 'auto'});
			}
		}else{
			$fr_m_custom.toggleClass('m_sticky_container', s_top > m_sticky_container_trigger_top);
		}
		if($(window).width() >= 768){
			$toolbarContainer.toggleClass('pc_sticky_toolbar', s_top > 235);
			if(s_top > 235){
				$disabled_help.css('top', (s_top - 175) + 'px');
			}else{
				$disabled_help.css('top', '80px');
			}
		}else{
			if(s_top > 100){
				$disabled_help.css('top', (s_top - 15) + 'px');
			}else{
				$disabled_help.css('top', '80px');
			}
		}
	}

	var toggleSettingLink = function(is_mobile, brand_color){
		var $add_calendar_form = $('#add_calendar_form');
		if(is_mobile){
			var $link_popup = $add_calendar_form.find('._link_popup_mobile');
		}else{
			var $link_popup = $add_calendar_form.find('._link_popup');
		}
		var $setting_link = $add_calendar_form.find('._setting_link');
		var $link_url = $add_calendar_form.find('._link_url');
		var origin_link_url = $link_url.val();
		var $icon_link = $add_calendar_form.find('._icon_link');
		var $explanation_disabled_wrap = $add_calendar_form.find('._explanation_disabled_wrap');
		if($setting_link.hasClass('open')){
			$(window).off('mousedown.set_link');
			$setting_link.removeClass('open');
			$link_url.off('keyup');
		}else{
			$setting_link.css({top: $link_popup.offset().top + $link_popup.height() + 20, left: $link_popup.offset().left + $link_popup.width() - $setting_link.width() + 10});
			$setting_link.addClass('open');
			$(window).on('mousedown.set_link',function(event){
				if($(event.target).closest('._setting_link').length == 0){
					summitLink();
				}
			});
			$link_url.on('keyup', function(e){
				if(isEnter(e)){
					summitLink();
				}else if(isEsc(e)){
					$link_url.val(origin_link_url);
					$setting_link.removeClass('open');
					$(window).off('mousedown.set_link');
					$link_url.off('keyup');
				}
			});
		}

		function summitLink(){
			origin_link_url = $link_url.val();
			$setting_link.removeClass('open');
			$(window).off('mousedown.set_link');
			$link_url.off('keyup');
			if($link_url.val()){
				$icon_link.css('color', brand_color);
				$explanation_disabled_wrap.show();
			}else{
				$icon_link.css('color', '');
				$explanation_disabled_wrap.hide();
			}
		}
	};


	return {
		init:function(board_data,menu_url,lang_code_data,target){
			init(board_data,menu_url,lang_code_data,target);
		},
		calendarAdd:function($obj){
			return calendarAdd($obj);
		},
		calendarDetailAdd:function(){
			return calendarDetailAdd();
		},
		calendarDetailCancel: function(back_url){
			return calendarDetailCancel(back_url);
		},
		calendarTypeSelect:function($obj,defult_code){
			return calendarTypeSelect($obj,defult_code);
		},
		calendarStartTime:function($setting_time){
			return calendarStartTime($setting_time);
		},
		calendarEndTime:function($setting_time){
			return calendarEndTime($setting_time);
		},
		classifyList:function(){
			return classifyList();
		},
		deleteCalendar:function(unit_code,board_code,idx,menu_url){
			return deleteCalendar(unit_code,board_code,idx,menu_url);
		},
		calendarStartDate:function($obj,start_time){
			return calendarStartDate($obj,start_time);
		},
		calendarEndDate:function($obj,end_time){
			return calendarEndDate($obj,end_time);
		},
		calendarModifyForm:function(id,event,$obj, lang_code, is_hash){
			return calendarModifyForm(id,event,$obj, lang_code, is_hash);
		},
		calendarAddForm:function(day,event){
			return calendarAddForm(day,event);
		},
		getHolidayData:function(start_year, end_year, start_month, end_month){
			return getHolidayData(start_year, end_year, start_month, end_month)
		},
		getLunData:function(start_year, end_year, start_month, end_month){
			return getLunData(start_year, end_year, start_month, end_month)
		},
		classifyDefultColor:function(unit_code){
			return classifyDefultColor(unit_code);
		},
		classifyBodyColor:function(unit_code){
			return classifyBodyColor(unit_code);
		},
		fullTimeCk:function($obj){
			return fullTimeCk($obj);
		},
		calendarAdminShow:function(board_data, lang_code, target){
			return calendarAdminShow(board_data, lang_code, target);
		},
		changeCategory: function(obj,category){
			return changeCategory(obj, category);
		},
		initWrite: function(calendar_data){
			return initWrite(calendar_data);
		},
		toggleSettingLink: function(is_mobile, brand_color){
			return toggleSettingLink(is_mobile, brand_color);
		}
	}
}();