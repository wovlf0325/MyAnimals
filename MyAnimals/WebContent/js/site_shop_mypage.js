var SITE_SHOP_MYPAGE = function(){
	var $order_list;
	var $order_list_empty;
	var $order_list_more_button;
	var currentPage = 1;
	var getOrderListProgress = false;

	var $point_list;
	var $point_list_table;
	var $point_list_empty;
	var $point_list_more_button;
	var get_point_list_progress = false;

	var $order_cancel_form;
	var $order_return_form;
	var $order_exchange_form;
	var cancel_order_code = '';	/* 취소처리중인 주문코드 */
	var auto_cancel_enable = 'N';	/* 자동취소 지원 Y/N */
	var return_order_code = '';	/* 반품 진행중인 주문코드 */
	var exchange_order_code = '';	/* 교환 진행중인 주문코드 */

	var is_canceling = false; // 취소 신청 처리중 여부

	var initOrderList = function(){
		$order_list = $('#shop_mypage_orderlist');
		$order_list_empty = $('#shop_mypage_orderlist_empty');
		$order_list_more_button = $('#shop_mypage_orderlist_more');
	};
	var initPointList = function(){
		$point_list = $('#shop_mypage_pointlist');
		$point_list_table = $('#shop_mypage_pointlist_table');
		$point_list_empty = $('#shop_mypage_pointlist_empty');
		$point_list_more_button = $('#shop_mypage_pointlist_more');
	};
	/**
	 * 위시리스트 제거
	 * @param prod_code
	 */
	var deleteProdWish = function(prod_code){
		$.ajax({
			type : 'POST',
			data : {'type' : 'delete', 'prod_code' : prod_code},
			url : ('/shop/add_prod_wish.cm'),
			dataType : 'json',
			success : function(res){
				if(res.msg == 'SUCCESS'){
					window.location.reload();
				}else
					alert(res.msg);
			}
		});
	};

	var getOrderList = function(type){
		if(getOrderListProgress) return;
		getOrderListProgress = true;
		$.ajax({
			type : 'POST',
			data : {'page' : currentPage, 'type':type},
			url : ('/shop/mypage_order_list.cm'),
			dataType : 'json',
			cache : false,
			success : function(result){
				getOrderListProgress = false;
				if(result.msg == 'SUCCESS'){
					if(result.count > 0){
						$order_list_empty.hide();
						$order_list.show();

						if ( currentPage == 1 ) {
							$order_list.html(result.html);
						} else {
							$order_list.append(result.html);
						}
					}else{
						$order_list.hide();
						$order_list_empty.show();
					}

					currentPage++;
					if( parseInt(currentPage) > parseInt(result.pageCount) )
						$order_list_more_button.hide();
					else
						$order_list_more_button.show();
				}else{
					alert(result.msg);
				}
			}
		});
	};

	var getPointList = function(){
		if(get_point_list_progress) return;
		get_point_list_progress = true;
		$.ajax({
			type : 'POST',
			data : {'page' : currentPage},
			url : ('/shop/mypage_point_list.cm'),
			dataType : 'json',
			cache : false,
			success : function(result){
				get_point_list_progress = false;
				if(result.msg == 'SUCCESS'){
					if(result.count > 0){
						$point_list_table.show();
						$point_list_empty.hide();
						$point_list.append(result.html);
					}else{
						$point_list_table.hide();
						$point_list_empty.show();
					}
					currentPage++;
					if(parseInt(currentPage) > parseInt(result.pageCount)) $point_list_more_button.hide();
				}else{
					alert(result.msg);
				}
			}
		});
	};

	var trackingParcel = function(code, no){
		if(isBlank(code) || isBlank(no)){
			alert(LOCALIZE.설명_택배사또는송장번호가입력되지않았습니다());
			return;
		}
		$.ajax({
			type : 'POST',
			data : {'code':code, 'invoice':no},
			url : ('/admin/ajax/shop/get_parcel_info.cm'),
			dataType : 'html',
			success : function(html){
				$.cocoaDialog.open({type : 'admin', custom_popup : html, width : 550});
			}
		});
	};

	var trackingParcelEcpay = function(code){
		if ( isBlank(code) ) {
			return;
		}
		$.ajax({
			"type": "POST",
			"data": {"code": code},
			"url": "/shop/tacking_parcel_ecpay.cm",
			"dataType": "JSON",
			"success": function(res) {
				$.cocoaDialog.open({type : 'admin', custom_popup : res['html'], width : 550});
			}
		});
	};

	/**
	 * 취소요청 페이지 초기화
	 * @param auto_cancel 자동취소지원유무 (Y/N)
	 */
	var initCancelOrder = function(order_code, auto_cancel){
		$order_cancel_form = $('#order_cancel_form');
		auto_cancel_enable = auto_cancel;
		cancel_order_code = order_code;
		cancelOrderSelectProdOrder();
	};

	/* 취소요청 페이지 품목주문 전체 선택 */
	var cancelOrderSelectAllProdOrder = function(chk){
		$order_cancel_form.find("input._prodOrderCheck").prop("checked", chk);
		cancelOrderLoadRefundPriceData();
	};

	/* 취소요청 페이지 품목주문 선택 */
	var cancelOrderSelectProdOrder = function(){
		var refund_price = cancelOrderLoadRefundPriceData();
		if ( auto_cancel_enable == 'Y' || refund_price == 0 ) {	/* 전체 취소, 자동 취소 가능 */
			$('#refund_data_wrap').hide();
		}else{	/* 부분취소 */
			$('#refund_data_wrap').show();
		}
	};

	/* 취소요청 페이지에서 환불 금액 정보를 로드함 */
	var cancelOrderLoadRefundPriceData = function(){
		var refund_price = 0;
		var prod_order_code_list = [];
		$order_cancel_form.find("input._prodOrderCheck:checked").each(function(){
			prod_order_code_list.push($(this).val());
		});
		$.ajax({
			type : 'POST',
			data : {"prod_order_code_list": prod_order_code_list, "order_code": cancel_order_code},
			url : ('/shop/order_cancel_refund_price_data.cm'),
			dataType : 'json',
			async: false,
			success : function(res){
				if(res.msg == 'SUCCESS'){
					auto_cancel_enable = res.auto_cancel_enable === true ? 'Y' : 'N';
					$('#refund_price_data_wrap').html(res.result_html);
					refund_price = res['refund_price'];
				}
			}
		});
		return refund_price;
	};

	/* 반품요청 페이지에서 환불 금액 정보를 로드함 */
	var returnOrderLoadRefundPriceData = function(){
		var prod_order_code_list = [];
		$order_return_form.find("input._prodOrderCheck:checked").each(function(){
			prod_order_code_list.push($(this).val());
		});

		// 반품 배송비 계산 - 전체 반품일 경우 초기 배송비도 더해서 보여준다
		$order_return_form.find('#_include_deliv_price').hide();
		var deliv_return_price = $order_return_form.find('#_deliv_refund_price').data('return_price');
		if ( $order_return_form.find('input._prodOrderCheck').length == $order_return_form.find('input._prodOrderCheck:checked').length ) {
			var deliv_price = $order_return_form.find('#_deliv_refund_price').data('deliv_price');
			var island_price = $order_return_form.find('#_deliv_refund_price').data('island_price');
			if ( deliv_price == 0 ) {
				deliv_price = deliv_return_price;
			}
			deliv_return_price += deliv_price + island_price;
			$order_return_form.find('#_include_deliv_price').show();	// 초기 배송비 포함 출력 제어
		}
		$order_return_form.find('#_deliv_refund_price').text(LOCALIZE.getCurrencyFormat(deliv_return_price));

		var return_reason = $order_return_form.find("select[name='reason']").val();
		var deliv_fee_pay_method = $order_return_form.find("select[name='deliv_fee_pay_method']").val();
		$.ajax({
			type : 'POST',
			data : {"prod_order_code_list": prod_order_code_list, "order_code": return_order_code, "deliv_fee_pay_method":deliv_fee_pay_method, "return_reason":return_reason },
			url : ('/shop/order_return_refund_price_data.cm'),
			dataType : 'json',
			async: false,
			success : function(res){
				if(res.msg == 'SUCCESS'){
					auto_cancel_enable = res.auto_cancel_enable === true ? 'Y' : 'N';
					$('#refund_price_data_wrap').html(res.result_html);
				}
			}
		});

		return auto_cancel_enable;
	};

	/**
	 * 취소요청 페이지 취소버튼 누를떄 처리
  	 * @param type shop/booking
	 */
	var cancelOrder = function(type){
		if ( is_canceling ) return;

		$order_cancel_form = $('#order_cancel_form');
		if (type=='shop'){
			if(!confirm(LOCALIZE.타이틀_주문취소를진행하시겠습니까())) return;
		}else if (type=='booking'){
			if(!confirm(LOCALIZE.타이틀_예약취소를진행하시겠습니까())) return;
		}

		is_canceling = true;
		var data = $order_cancel_form.serializeObject();
		data.type=type;
		$.ajax({
			type : 'POST',
			data : data,
			url : ('/shop/order_cancel.cm'),
			dataType : 'json',
			success : function(res){
				if(res.msg == 'SUCCESS'){
					alert(res.result_msg);
					if(res.ga_switch && res.ga_info.length >= 1){
						/* GA 전자상거래 회수 */
						GOOGLE_ANAUYTICS.Completepayment(res.ga_info[0]['id'],res.total_price);
						GOOGLE_ANAUYTICS.ReversePayment(res.ga_info);
					}

					var location_url = '/shop_mypage/?m2=order';
					if ( res.is_guest_login == 'Y' ) { location_url += '&guest_login=Y'; }
					window.location.href = location_url;
				}else{
					alert(res.msg);
				}

				is_canceling = false;
			}
		});
	};

	/* 반품/교환 페이지 품목주문 전체 선택 */
	var returnOrderSelectAllProdOrder = function(chk){
		$order_return_form.find("input._prodOrderCheck").prop("checked", chk);
		returnOrderLoadRefundPriceData();
	};
	var exchangeOrderSelectAllProdOrder = function(chk){
		$order_exchange_form.find("input._prodOrderCheck").prop("checked", chk);
	};

	/* 반품/교환 페이지 품목주문 선택 */
	var returnOrderSelectProdOrder = function(){
		returnOrderLoadRefundPriceData();
		if(auto_cancel_enable == 'Y'){	/* 전체 취소, 자동 취소 가능 */
			$('#refund_data_wrap').hide();
		}else{	/* 부분취소 */
			$('#refund_data_wrap').show();
		}
	};
	var exchangeOrderSelectProdOrder = function(){
		if ($order_exchange_form.find("input._prodOrderCheck:not(:checked)").length==0 && auto_cancel_enable=='Y'){	/* 전체 취소, 자동 취소 가능 */
			$('#refund_data_wrap').hide();
		}else{	/* 부분취소 */
			$('#refund_data_wrap').show();
		}
	};

	/* 반품 수거 방법 변경 */
	var changeReturnCollectMethod = function(collect_method){
		if (collect_method == 'RETURN_DESIGNATED'){	/* 지정 반품택배 */
			$("#collect_method_type_RETURN_DESIGNATED").prop('checked', true);
			$('#collect_method_direct_wrap').hide();
			$('#collect_method_designated_wrap').show();
		}else{	/* 직접 발송 */
			$("#collect_method_type_RETURN_PARCEL").prop('checked', true);
			$('#collect_method_direct_wrap').show();
			$('#collect_method_designated_wrap').hide();
			$('#collect_method').val(collect_method);
			if (collect_method == 'RETURN_PARCEL'){	//택배로 발송
				$('#collect_deliv_company').show();
				$('#collect_tracking_number').show();
				$('._form_select_wrap').show();
				$('#collect_msg').hide();
			}else{	/* 직접전달 */
				$('#collect_deliv_company').hide();
				$('#collect_tracking_number').hide();
				$('._form_select_wrap').hide();
				$('#collect_msg').show();
			}
		}
	};
	/* 반품 수거 방법 변경 (교환시) */
	var changeExchangeCollectMethod = function(collect_method){
		if (collect_method == 'RETURN_DESIGNATED'){	/* 지정 반품택배 */
			$("#collect_method_type_RETURN_DESIGNATED").prop('checked', true);
			$('#collect_method_direct_wrap').hide();
			$('#collect_method_designated_wrap').show();
		}else{	/* 직접 발송 */
			$("#collect_method_type_RETURN_PARCEL").prop('checked', true);
			$('#collect_method_direct_wrap').show();
			$('#collect_method_designated_wrap').hide();
			$('#collect_method').val(collect_method);
			if (collect_method == 'RETURN_PARCEL'){	//택배로 발송
				$('#collect_deliv_company').show();
				$('#collect_tracking_number').show();
				$('#collect_msg').hide();
			}else{	/* 직접전달 */
				$('#collect_deliv_company').hide();
				$('#collect_tracking_number').hide();
				$('#collect_msg').show();
			}
		}
	};

	/**
	 * 교환상세 다이얼로그 띄우기
	 */
	var showExchangeDetail = function(exchange_idx){
		$.ajax({
			type : 'POST',
			data : {'exchange_idx' : exchange_idx},
			url : ('/shop/order_exchange_detail.cm'),
			dataType : 'html',
			success : function(html){
				$.cocoaDialog.open({type : 'order_exchange_detail', custom_popup : html});
			}
		});
	};

	/**
	 * 반품상세 다이얼로그 띄우기
	 */
	var showReturnDetail = function(return_idx){
		$.ajax({
			type : 'POST',
			data : {'return_idx' : return_idx},
			url : ('/shop/order_return_detail.cm'),
			dataType : 'html',
			success : function(html){
				$.cocoaDialog.open({type : 'order_return_detail', custom_popup : html});
			}
		});
	};

	/**
	 *  취소상세 다이얼로그 띄우기
	 * @param cancel_idx
	 */
	var showCancelDetail = function(cancel_idx){
		$.ajax({
			type : 'POST',
			data : {'cancel_idx' : cancel_idx},
			url : ('/shop/order_cancel_detail.cm'),
			dataType : 'html',
			success : function(html){
				$.cocoaDialog.open({type : 'order_cancel_detail', custom_popup : html});
			}
		});
	};

	/**
	 * 반품요청 페이지 신청하기 누를떄 처리
	 */
	var returnOrder = function(){
		if(!confirm(getLocalizeString('타이틀_반품신청을진행하시겠습니까', '', '반품 신청을 진행하시겠습니까?'))) return;
		var data = $order_return_form.serializeObject();
		$.ajax({
			type : 'POST',
			data : data,
			url : ('/shop/order_return.cm'),
			dataType : 'json',
			success : function(res){
				if(res.msg == 'SUCCESS'){
					if (res.result_msg!='') alert(res.result_msg);
					window.location.href='/shop_mypage/?m2=cancel';
				}else{
					alert(res.msg);
				}
			}
		});
	};

	/**
	 * 교환요청 페이지 신청하기 누를떄 처리
	 */
	var exchangeOrder = function(){
		if(!confirm(getLocalizeString('타이틀_교환신청을진행하시겠습니까', '', '교환 신청을 진행하시겠습니까?'))) return;
		var data = $order_exchange_form.serializeObject();
		$.ajax({
			type : 'POST',
			data : data,
			url : ('/shop/order_exchange.cm'),
			dataType : 'json',
			success : function(res){
				if(res.msg == 'SUCCESS'){
					if (res.result_msg!='') alert(res.result_msg);
					if (res.deliv_fee>0){	/* 교환배송비가 있을경우 교환비용결제화면으로 이동 */
						window.location.href = '/shop_mypage/?m2=exchange_pay&idx=' + res.order_idx + '&exchange_idx=' + res.prod_order_idx;
					}else
						window.location.href='/shop_mypage/?m2=cancel';
				}else{
					alert(res.msg);
				}
			}
		});
	};

	/**
	 * 교환비용 결제 페이지 확인 누를떄 처리
	 */
	var exchangeOrderPay = function(){
		$order_exchange_form = $('#order_exchange_form');
		if(!confirm(getLocalizeString('타이틀_교환비용결제를진행하시겠습니까', '', '교환 비용결제를 진행하시겠습니까?'))) return;
		var data = $order_exchange_form.serializeObject();
		$.ajax({
			type : 'POST',
			data : data,
			url : ('/shop/order_exchange_pay.cm'),
			dataType : 'json',
			success : function(res){
				if(res.msg == 'SUCCESS'){
					window.location.href='/shop_mypage/?m2=order';
				}else{
					alert(res.msg);
				}
			}
		});
	};

	/**
	 * 반품철회 누를떄 처리
	 */
	var withdrawReturnOrder = function(return_idx){
		if(!confirm(getLocalizeString('타이틀_반품신청을철회하시겠습니까', '', '반품신청을 철회하시겠습니까?'))) return;
		$.ajax({
			type : 'POST',
			data : {"return_idx":return_idx},
			url : ('/shop/order_return_withdraw.cm'),
			dataType : 'json',
			success : function(res){
				if(res.msg == 'SUCCESS'){
					if (res.result_msg!='') alert(res.result_msg);
					window.location.href='/shop_mypage/?m2=order';
				}else{
					alert(res.msg);
				}
			}
		});
	};

	/**
	 * 교환철회 누를떄 처리
	 */
	var withdrawExchangeOrder = function(exchange_idx){
		if(!confirm(getLocalizeString('타이틀_교환신청을철회하시겠습니까', '', '교환신청을 철회하시겠습니까?'))) return;
		$.ajax({
			type : 'POST',
			data : {"exchange_idx":exchange_idx},
			url : ('/shop/order_exchange_withdraw.cm'),
			dataType : 'json',
			success : function(res){
				if(res.msg == 'SUCCESS'){
					if (res.result_msg!='') alert(res.result_msg);
					window.location.href='/shop_mypage/?m2=order';
				}else{
					alert(res.msg);
				}
			}
		});
	};

	/**
	 * 취소철회 누를떄 처리
	 */
	var withdrawCancelOrder = function(cancel_idx){
		if(!confirm(getLocalizeString('타이틀_취소신청을철회하시겠습니까', '', '취소신청을 철회하시겠습니까?'))) return;
		$.ajax({
			type : 'POST',
			data : {"cancel_idx":cancel_idx},
			url : ('/shop/order_cancel_withdraw.cm'),
			dataType : 'json',
			success : function(res){
				if(res.msg == 'SUCCESS'){
					if (res.result_msg!='') alert(res.result_msg);
					window.location.href='/shop_mypage/?m2=order';
				}else{
					alert(res.msg);
				}
			}
		});
	};

	var openMobileOrder = function(idx){
		$.ajax({
			type : 'POST',
			data : {'idx' : idx},
			url : ('/dialog/order_history.cm'),
			dataType : 'html',
			success : function(html){
				$.cocoaDialog.open({type : 'admin_order_history', custom_popup : html});
			}
		});
	};

	/**
	 * 반품 페이지 초기화
	 * @param auto_cancel 자동취소지원유무 (Y/N)
	 */
	var initReturnOrder = function(order_code, auto_cancel){
		$order_return_form = $('#order_return_form');
		auto_cancel_enable = auto_cancel;
		return_order_code = order_code;
		returnOrderSelectProdOrder();
	};

	/**
	 * 교환 페이지 초기화
	 */
	var initExchangeOrder = function(order_code,auto_cancel){
		$order_exchange_form = $('#order_exchange_form');
		auto_cancel_enable = auto_cancel;
		exchange_order_code = order_code;
		exchangeOrderSelectProdOrder();
	};

	var requestCashReceipt = function(order_no, mode){
		if(!order_no || !mode){
			alert(getLocalizeString('설명_주문번호혹은모드가없습니다', '', '주문번호 혹은 모드가 없습니다.'));
			return false;
		}
		$.ajax({
			type : 'POST',
			data : {'order_no' : order_no, 'mode' : mode},
			url : ('/shop/request_cash_receipt.cm'),
			dataType : 'html',
			success : function(html){
				$.cocoaDialog.open({type : 'request_cash_receipt', custom_popup : html})
			}
		});
	};

	var requestCashReceiptProc = function(order_no, cash_receipt_type, cash_receipt_value){
		$.ajax({
			type : 'POST',
			data : {'order_no' : order_no, 'cash_receipt_type' : cash_receipt_type, 'cash_receipt_value' : cash_receipt_value},
			url : ('/shop/request_cash_receipt_proc.cm'),
			dataType : 'json',
			success : function(res){
				if(res.msg == 'SUCCESS'){
					alert(getLocalizeString('설명_현금영수증신청이완료되었습니다', '', '현금영수증 신청이 완료되었습니다.'));
					window.location.reload();
				}else{
					alert(res.msg);
				}
			}
		});
	};

	var mod_order_no = '';
	var openChangeOrderAddress = function(order_no) {
		$.ajax({
			type : 'POST',
			data : {'order_no' : order_no},
			url : ('/shop/change_order_address.cm'),
			dataType : 'html',
			success : function(html){
				$.cocoaDialog.open({type : 'change_order_address', custom_popup : html})
				mod_order_no = order_no;
				var $form = $('#modify_address_form');
				$form.find('._add_btn').on('click', function() {
					$.ajax({
						type: 'POST',
						data: $form.serialize(),
						url: ('/shop/change_order_address_proc.cm'),
						dataType: 'json',
						async: false,
						cache: false,
						success: function (res2) {
							if (res2.msg == 'SUCCESS') {
								$.cocoaDialog.close();
								mod_order_no = '';
								location.reload();
							} else {
								var msg = res2.msg;
								if ( res2.code ) { msg += ' (' + res2.code + ')'; }
								alert(msg);
							}
						}
					});
				});
			}
		});
	};

	var changeDelivAddressCountrySelect = function(order_no) {
		var $form = $('#modify_address_form');

		$.ajax({
			type : 'POST',
			data : {order_no: order_no},
			url : ('/shop/change_order_address_form.cm'),
			dataType : 'json',
			async : false,
			cache : false,
			success : function(res){
				if(res.msg == 'SUCCESS'){
					var $_address_wrap = $form.find('._deliv_address_wrap').find('._address_wrap');
					$_address_wrap.html(res.html);

					if ( res.use_daum_api == 'Y' ) {
						var addr_daum = new ZIPCODE_DAUM();
						addr_daum.init({
							'addr_container' : $('#order_find_address'),
							'addr_pop' : $('#address_search_popup .search_popup_body'),
							'post_code' : $('#order_postcode_input'),
							'addr' : $('#order_address_input'),
							'onStart' : function(){
							},
							'onComplete' : function(key){
								$('#order_address_detail_input').focus();
								address = key.jibunAddressEnglish;
								splitAddress= address.split(',');

								if(key.addressEnglish != "undefined"){
									address = key.addressEnglish;
									splitAddress= address.split(',');
									if(splitAddress.length > 5){
										street = splitAddress[0] + " " + splitAddress[1];
										city = splitAddress[2] + " " + splitAddress[3];
										state = splitAddress[4];
									} else {
										street = splitAddress[0] + " " + splitAddress[1];
										city = splitAddress[2];
										state = splitAddress[3];
									}
								} else if(key.jibunAddressEnglish != "undefined"){
									address = key.jibunAddressEnglish;
									splitAddress= address.split(',');
									if(splitAddress.length > 5){
										street = splitAddress[0] + " " + splitAddress[1];
										city = splitAddress[2] + " " + splitAddress[3];
										state = splitAddress[4];
									} else {
										street = splitAddress[0] + " " + splitAddress[1];
										city = splitAddress[2];
										state = splitAddress[3];
									}
								}

								$("input[name='address_street']").val(street);
								$("input[name='address_city']").val(city);
								$("input[name='address_state']").val(state);
								$("input[name='address_zipcode']").val(key.zonecode);
							},
							'onShow' : function() {
								$('#address_search_popup').show();
							},
							'onClose' : function(){
								$('#address_search_popup').hide();
							}
						});
					}
				}
			}
		});
	};

	var openChangeCVSAddress = function(cvs, order_no) {
		var popname = 'change_emap';

		var popup_w = 400;
		var popup_h = 600;
		var popup_top = Math.ceil((window.screen.height - popup_h) / 2 );
		var popup_left = Math.ceil((window.screen.width - popup_w) / 2 );

		var popup_style = '';
		popup_style += 'top=' + popup_top + ',';
		popup_style += 'left=' + popup_left + ',';
		popup_style += 'height=' + popup_h + 'px,';
		popup_style += 'width=' + popup_w + 'px';

		var url = '/ajax/change_cvs_address_popup.cm?cvs='+cvs+'&order_no='+order_no;
		window.open(url, popname, 'toolbar=no, channelmode=no, location=no, directories=no, menubar=no, scrollbars=yes, resizable=yes, status=yes, '+popup_style);
	};

	var updateCVSAddress = function(address_data){
		if ( mod_order_no === '' )	return;
		if ( typeof address_data == "undefined") return;
		if ( mod_order_no != address_data['mod_order_no'] ) return;

		var $form = $('#modify_address_form');
		$form.find('._deliv_address_wrap').find('.cvs_address_info').html(address_data['address_str']).addClass('text-danger');

		for ( var _key in address_data ) {
			if ( $form.find('input[name="'+_key+'"]').length > 0 ) {
				$form.find('input[name="'+_key+'"]').val(address_data[_key]);
			}
		}
		$form.find('.cvs_list_wrapper').hide();
	};

	var digitalFileDownload = function(prod_no, order_idx, is_expired) {
		if( is_expired ) {
			alert(getLocalizeString('설명_다운로드만료안내','',"다운로드 가능 기간 또는 횟수가 초과되었습니다. \n재 구매 후 다시 시도 바랍니다."));
			return false;
		}
		$.ajax({
			"type" : "POST",
			"data" : {"prod_no" : prod_no, "order_idx": order_idx, "mode" : "mypage"},
			"url" : "/ajax/shop_digital_prod_download.cm",
			"dataType" : "JSON",
			"success" : function(res){
				if(res['msg'] == 'SUCCESS'){
					if(res['download_info_msg'].trim() == '' || confirm(res['download_info_msg'])){
						location.href = res['file_url'];
					}
				} else {
					alert(res['msg']);
				}
			}
		});
	};

	return {
		initPointList : function(){
			initPointList();
		},
		initOrderList : function(){
			initOrderList();
		},
		getOrderList : function(type){
			getOrderList(type);
		},
		getPointList : function(){
			getPointList();
		},
		deleteProdWish : function(prod_code){
			deleteProdWish(prod_code);
		},
		'trackingParcel' : function(code, no){
			trackingParcel(code, no);
		},
		'trackingParcelEcpay': function(code){
			trackingParcelEcpay(code);
		},
		'openMobileOrder' : function(no){
			openMobileOrder(no);
		},
		'initCancelOrder': function(order_code, auto_cancel_enable){
			initCancelOrder(order_code, auto_cancel_enable);
		},
		'cancelOrder': function(type){
			cancelOrder(type);
		},
		'returnOrder': function(){
			returnOrder();
		},
		'showExchangeDetail': function(exchange_idx){
			showExchangeDetail(exchange_idx);
		},
		'showReturnDetail': function(return_idx){
			showReturnDetail(return_idx);
		},
		'showCancelDetail' : function(cancel_idx){
			showCancelDetail(cancel_idx);
		},
		'exchangeOrder': function(){
			exchangeOrder();
		},
		'exchangeOrderPay': function(){
			exchangeOrderPay();
		},
		'withdrawReturnOrder': function(return_idx){
			withdrawReturnOrder(return_idx);
		},
		'withdrawExchangeOrder': function(exchange_idx){
			withdrawExchangeOrder(exchange_idx);
		},
		'withdrawCancelOrder': function(cancel_idx){
			withdrawCancelOrder(cancel_idx);
		},
		'cancelOrderSelectAllProdOrder': function(chk){
			cancelOrderSelectAllProdOrder(chk);
		},
		'cancelOrderSelectProdOrder': function(){
			cancelOrderSelectProdOrder();
		},
		'initReturnOrder': function(order_code, auto_cancel_enable){
			initReturnOrder(order_code, auto_cancel_enable);
		},
		'returnOrderSelectAllProdOrder': function(chk){
			returnOrderSelectAllProdOrder(chk);
		},
		'returnOrderSelectProdOrder': function(){
			returnOrderSelectProdOrder();
		},
		'returnOrderLoadRefundPriceData': function(){
			return returnOrderLoadRefundPriceData();
		},
		'changeReturnCollectMethod': function(collect_method){
			changeReturnCollectMethod(collect_method);
		},
		'changeExchangeCollectMethod': function(collect_method){
			changeExchangeCollectMethod(collect_method);
		},


		'initExchangeOrder': function(order_code, auto_cancel_enable){
			initExchangeOrder(order_code, auto_cancel_enable);
		},
		'exchangeOrderSelectAllProdOrder': function(chk){
			exchangeOrderSelectAllProdOrder(chk);
		},
		'requestCashReceipt' : function(order_no, mode){
			requestCashReceipt(order_no, mode);
		},
		'requestCashReceiptProc' : function(order_no, cash_receipt_type, cash_receipt_value){
			requestCashReceiptProc(order_no, cash_receipt_type, cash_receipt_value);
		},

		'openChangeOrderAddress': function(order_no) {
			openChangeOrderAddress(order_no);
		},
		'changeDelivAddressCountrySelect' : function(order_no) {
			changeDelivAddressCountrySelect(order_no);
		},
		"openChangeCVSAddress": function(cvs, order_no){
			openChangeCVSAddress(cvs, order_no);
		},
		"updateCVSAddress": function(data){
			updateCVSAddress(data);
		},
		"digitalFileDownload": function(prod_no, order_idx, is_expired) {
			digitalFileDownload(prod_no, order_idx, is_expired);
		}
	}
}();