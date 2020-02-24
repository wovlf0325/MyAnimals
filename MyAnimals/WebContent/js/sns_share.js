var SNS = function(){
	var pin_page = false;
	var snsObjList = [];
	var main_url, site_name, subject, content, image_url, link_url, security_link_url;
	var api_url;
	var ace_counter_plus_switch = false; //에이스 카운터 추적 사용 여부
	var kakao_loaded = false;

	var share_type;
	var social = {};
	var additional = {};

	function SnsObjects(){
		this.name = "";
		this.show = true;
		this.order = 0;
		this.iconClass = "";
		this.type = "";
	}


	var loadKakaoApi = function(key){
		// 카카오 이미 호출되어있으면 호출하지 않음 추가
		if(kakao_loaded) return false;

		if(LIMIT_API_LIST.indexOf('kakao_link') === -1){
			try{
				if(key != undefined){
					key = key.trim();
					if(key != '' && Kakao){
						Kakao.init(key);
						kakao_loaded = true;
					}
				}
			}catch(e){
			}
		}
	};

	var init = function(d){
		// 상품&예약 상세페이지 데이터는 고정
		if(pin_page) return false;

		var data = d;

		if(data.kakao_api_key != undefined){
			loadKakaoApi(data.kakao_api_key);
		}

		main_url = data._main_url;
		site_name = data._site_name;
		subject = data._subject;
		content = data._body === null ? '' : makeShareContent(data._body);
		image_url = data._img;
		link_url = data._post_url;
		security_link_url = data._security_post_url;
		api_url = "https://sns.imweb.me/?url=";
		ace_counter_plus_switch = d.ace_counter_plus_switch;

		social = data._social;
		additional = data._additional;
		share_type = data._share_type;
		if(data._pin_page != undefined){
			pin_page = true;
		}
	};

	var makeShareContent = function(s){
		s = removeHtmlTag(s);

		// 공유하기에 보이는 내용에서 치환
		s = s.replace(/&nbsp;/ig, " ");
		s = s.replace(/&lt;/ig, "<");
		s = s.replace(/&gt;/ig, ">");


		//글자수가 너무 길때 처리 - 공유하기 권장 110글자
		var content_max_len = 110;
		s = (s.length > content_max_len)? s.substring(0,content_max_len) : s;
		return s;
	};

	//SNS공유 초기설정
	//var snsInit = function(_main_url, _site_name, _subject, _content, _link_url, _security_link_url, _image){
	//
	//	try{
	//		if(Kakao) Kakao.init('63e1a2ee956b3aa85ca51663ce4caccb');
	//	}catch(e){
	//
	//	}
	//
	//
	//	main_url = _main_url;
	//	site_name = _site_name != "" ? "[" + _site_name + "]" : "";
	//	api_url = "https://sns.imweb.me/?url=";
	//	subject = _subject;
	//	content = _content;
	//	image_url = _image;
	//	link_url = _link_url;
	//	security_link_url = _security_link_url;
	//};


	var setSnsObj = function(){
		snsObjList = [];
		console.log(LIMIT_API_LIST);
		if(LIMIT_API_LIST.indexOf('kakao_link') === -1){
			var snsObj = new SnsObjects();
			snsObj.name = LOCALIZE.버튼_카카오톡();
			snsObj.show = true;
			snsObj.order = 1;
			snsObj.iconClass = "kakao";
			snsObj.type = "kakaotalk";
			snsObjList.push(snsObj);
		}

		if(LIMIT_API_LIST.indexOf('kakaostory_link') === -1){
			snsObj = new SnsObjects();
			snsObj.name = LOCALIZE.버튼_카카오스토리();
			snsObj.show = true;
			snsObj.order = 1;
			snsObj.iconClass = "story";
			snsObj.type = "kakaostory";
			snsObjList.push(snsObj);
		}

		if(LIMIT_API_LIST.indexOf('line_link') === -1){
			snsObj = new SnsObjects();
			snsObj.name = LOCALIZE.버튼_라인();
			snsObj.show = true;
			snsObj.order = 1;
			snsObj.iconClass = "line";
			snsObj.type = "line";
			snsObjList.push(snsObj);
		}

		if(LIMIT_API_LIST.indexOf('band_link') === -1){
			snsObj = new SnsObjects();
			snsObj.name = LOCALIZE.버튼_밴드();
			snsObj.show = true;
			snsObj.order = 1;
			snsObj.iconClass = "band";
			snsObj.type = "band";
			snsObjList.push(snsObj);
		}

		if(LIMIT_API_LIST.indexOf('naver_link') === -1){
			snsObj = new SnsObjects();
			snsObj.name = LOCALIZE.버튼_네이버();
			snsObj.show = true;
			snsObj.order = 1;
			snsObj.iconClass = "naver";
			snsObj.type = 'naver';
			snsObjList.push(snsObj);
		}

		if(LIMIT_API_LIST.indexOf('facebook_link') === -1){
			snsObj = new SnsObjects();
			snsObj.name = LOCALIZE.버튼_페이스북();
			snsObj.show = true;
			snsObj.order = 1;
			snsObj.iconClass = "face";
			snsObj.type = "facebook";
			snsObjList.push(snsObj);
		}

		if(LIMIT_API_LIST.indexOf('twitter_link') === -1){
			snsObj = new SnsObjects();
			snsObj.name = LOCALIZE.버튼_트위터();
			snsObj.show = true;
			snsObj.order = 1;
			snsObj.iconClass = "twitter";
			snsObj.type = "twitter";
			snsObjList.push(snsObj);
		}

		if(LIMIT_API_LIST.indexOf('instagram') === -1){
			snsObj = new SnsObjects();
			snsObj.name = LOCALIZE.버튼_인스타그램();
			snsObj.show = false;
			snsObj.order = 1;
			snsObj.iconClass = "instagram";
			snsObj.type = "instagram";
			snsObjList.push(snsObj);
		}

		if(LIMIT_API_LIST.indexOf('googleplus_link') === -1){
			snsObj = new SnsObjects();
			snsObj.name = "Google+";
			snsObj.show = true;
			snsObj.order = 1;
			snsObj.iconClass = "googleplus";
			snsObj.type = "googleplus";
			snsObjList.push(snsObj);
		}
	};

	var getDefaultHtml = function(){
		var html = "";
		html += "<div class='text-basic'>";
		html += "<div class='social-btn'>";
		html += "<ul>";
		for(var index in snsObjList){
			var snsObj = snsObjList[index];
			if(!snsObj.show) continue;
			html += "<li role='' class='" + snsObj.iconClass + "'>";
			html += "<a href='javascript:;' onclick=\"SNS.setSnsApi('" + snsObj.type + "')\">" + snsObj.name + "</a>";
			html += "</li>";
		}
		html += "</ul>";
		html += "</div>";
		html += "<div class='url-copy holder'>";

		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))){//아이폰일때는 클립보드 복사가 안되서 a태그를 눌러 복사하게 함
			html += "<a href='" + link_url + "'  class='_sns_copy_url form-control' style=' white-space: nowrap; overflow:scroll; background-color: #f5f5f5; -ms-overflow-style: none;'  oncontextmenu='event.cancelBubble=true;' onclick='return false;'>" + link_url + "</a>";
			html += "</div>";
			html += "<div id='copy_complete' class='text-center'>"+LOCALIZE.설명_URL을길게누르면복사할수있습니다()+"</div>";
		}else{//아이폰이 아닐때는 클립보드에 저장
			html += "<div class='form-control-line'>";
			html += "<input type='text' id='sns_copy_url' class='_sns_copy_url form-control' value='" + link_url + "' readonly>";
			html += "<button type='button' class='_sns_copy_btn sns_copy_btn btn btn-default' onclick=\"SNS.copyToClipboard()\" data-clipboard-target='._sns_copy_url'>"+LOCALIZE.버튼_복사()+"</button>";
			html += "</div>";
			html += "</div>";
			html += "<div id='copy_complete' class='text-center'>";
			html += "</div>";
		}
		/* 기존 실서버 처리방식
			html += "<input type='text' id='sns_copy_url' class='_sns_copy_url form-control' value='" + link_url + "'>";
			html += "<div class='form-control-line'></div>";
			// todo 아이폰은 copyToClipboard에 구현되어 있는 방식이 지원되지 않아서 다른 방식이 필요함 우선 예외처리.
			// html += "<button type='button' class='_sns_copy_btn sns_copy_btn btn btn-default' onclick=\"SNS.copyToClipboard()\" data-clipboard-target='._sns_copy_url'>복사</button>";
			html += "</div>";

			html += "<div id='copy_complete' class='text-center'>";
			html += "</div>";
		*/
		html += "</div>";
		return html;
	};

	var copyToClipboard = function(){
		$('#sns_copy_url').val(location.href); //url 복사시 fragment경로까지 포함하기 위해 value 셋팅
		var copyText = document.getElementById("sns_copy_url");
		copyText.select();
		document.execCommand("Copy");
		$('#copy_complete').text(LOCALIZE.설명_URL이복사되었습니다());
	};

	var showDefalutSnsShareList = function(){
		//snsInit(_main_domain, _site_name, _subject, _content, _link_url, _security_link_url, _image);
		setSnsObj();
		var html = $(getDefaultHtml());
		$.cocoaDialog.open({type : 'post_social', custom_popup : html});
	};


	var setSnsApi = function(type){
		switch(type){
			case 'kakaotalk':
				shareKakaoTalk();
				break;
			case 'kakaostory':
				shareKakaoStory();
				break;
			case 'line':
				shareLine();
				break;
			case 'band':
				shareBand();
				break;
			case 'naver':
				shareNaver();
				break;
			case 'facebook':
				shareFacebook();
				break;
			case 'twitter':
				shareTwitter();
				break;
			case 'instagram':
				shareInstagram();
				break;
			case 'googleplus':
				shareGoogleplus();
				break;
		}

	};


	/***
	 * 카카오톡 공유하기
	 * https://developers.kakao.com/docs/js/kakaotalklink
	 */
	var shareKakaoTalk = function(){
		if(LIMIT_API_LIST.indexOf('kakao_link') === -1){
			var type = share_type;
			var kakao_link = location.href;
			var kakao_send_data = {
				content: {
					title: subject,
					description: content,
					imageUrl: image_url,
					imageWidth: 300,
					imageHeight: 200,
					link: {
						mobileWebUrl: kakao_link,
						webUrl: kakao_link
					}
				},
				buttons: [
					{
						title: '자세히보기',
						link: {
							mobileWebUrl: kakao_link,
							webUrl: kakao_link
						}
					}
				]
			};
			switch(share_type){
				case 'booking':
					kakao_send_data.buttons[0]['title'] = '예약하기';
					type = 'feed';
					break;
				case 'commerce':
					if(additional == undefined || additional.commerce == undefined){
						type = 'feed';
						break;
					}
					kakao_send_data.buttons[0]['title'] = '구매하기';
					kakao_send_data.commerce ={};
					kakao_send_data.commerce.regularPrice = additional.commerce.orig_price;			// 정상가격
					if(additional.commerce.sale_price != undefined)
						kakao_send_data.commerce.discountPrice = additional.commerce.sale_price;	// 할인가격
					break;
				case 'feed':
				case 'location':
					if(social){
						kakao_send_data.social = {};
						for(key in social){
							kakao_send_data.social[key] = parseInt(social[key]);
						}
					}
					if(share_type == 'location'){
						if(additional == undefined || additional.location == undefined){
							type = 'feed';
							break;
						}
						kakao_send_data.address = additional.location.address;
						kakao_send_data.addressTitle = subject;
					}
					break;
				default:
					type = 'feed';
					break;
			}
			kakao_send_data.objectType = type;
			Kakao.Link.sendDefault(kakao_send_data);
		}else{
			alert(LOCALIZE.설명_사이트관리자설정에의해차단된콘텐츠입니다());
		}

	};

	/***
	 * 카카오스토리 공유하기
	 * https://developers.kakao.com/docs/js/kakaostory-share
	 */
	var shareKakaoStory = function(){
		if(LIMIT_API_LIST.indexOf('kakaostory_link') === -1){
			if(IS_MOBILE){
				Kakao.Story.open({
					url : link_url,
					text : LOCALIZE.버튼_공유하기(),
					urlInfo : {
						title : subject,
						desc : content,
						name : site_name,
						images : [image_url]
					}

				});
			}else{
				Kakao.Story.share({
					url : link_url,
					text : subject
				});
			}
		}else{
			alert(LOCALIZE.설명_사이트관리자설정에의해차단된콘텐츠입니다());
		}
	};

	/***
	 * 카카오스토리 소식받기 버튼 추가하기
	 */
	var crateKakaoStoryNewsBtn = function(){
		Kakao.Story.createFollowButton({
			container : '#kakaostory-follow-button',
			id : kakao_id
		});
	};


	/***
	 * 라인 공유하기
	 */
	var shareLine = function(){
		if(LIMIT_API_LIST.indexOf('line_link') === -1){
			window.open("http://line.naver.jp/R/msg/text/?" + fixedEncodeURIComponent(subject) + " " + fixedEncodeURIComponent(link_url));
		}else{
			alert(LOCALIZE.설명_사이트관리자설정에의해차단된콘텐츠입니다());
		}
	};

	/***
	 * 밴드 공유하기
	 */
	var shareBand = function(){
		if(LIMIT_API_LIST.indexOf('band_link') === -1){
			var tmp_subject = encodeURIComponent(subject + "\n");
			var body = tmp_subject + fixedEncodeURIComponent(link_url);
			window.open("http://band.us/plugin/share?body=" + body + "&route=" + fixedEncodeURIComponent(link_url));
		}else{
			alert(LOCALIZE.설명_사이트관리자설정에의해차단된콘텐츠입니다());
		}
	};

	function fixedEncodeURIComponent(str) {
		return encodeURIComponent(str).replace(/[\.]/g, function(c) {     return '%' + c.charCodeAt(0).toString(16);   });
	}

	var shareNaver = function(){
		if(LIMIT_API_LIST.indexOf('naver_link') === -1){
			if(content.length == 0){
				if(confirm('네이버 블로그 공유 시 본문 텍스트가 없을 경우 사이트 내용 텍스트를 순차적으로 출력합니다. 그래도 공유하시겠습니까?')){
					shareSnsMetatag('naver');
				}
			}else{
				shareSnsMetatag('naver');
			}
		}else{
			alert(LOCALIZE.설명_사이트관리자설정에의해차단된콘텐츠입니다());
		}
	};

	/***
	 * 페이스북 공유하기
	 */
	var shareFacebook = function(){
		if(LIMIT_API_LIST.indexOf('facebook_link') === -1){
			shareSnsMetatag('facebook');
		}else{
			alert(LOCALIZE.설명_사이트관리자설정에의해차단된콘텐츠입니다());
		}
	};

	/***
	 * 트위터 공유하기
	 */
	var shareTwitter = function(){
		if(LIMIT_API_LIST.indexOf('twitter_link') === -1){
			shareSnsMetatag('twitter');
		}else{
			alert(LOCALIZE.설명_사이트관리자설정에의해차단된콘텐츠입니다());
		}
	};

	/***
	 * 인스타그램 공유하기
	 */
	var shareInstagram = function(){
		if(IS_MOBILE){

		}else{

		}
	};

	/***
	 * 구글플러스 공유하기
	 */
	var shareGoogleplus = function(){
		if(LIMIT_API_LIST.indexOf('googleplus_link') === -1){
			shareSnsMetatag('googleplus');
		}else{
			alert(LOCALIZE.설명_사이트관리자설정에의해차단된콘텐츠입니다());
		}
	};

	var shareSnsMetatag = function(type){

		switch(type){
			case 'naver':
				window.open("http://share.naver.com/web/shareView.nhn?url=" + encodeURIComponent(link_url) + "&title=" + encodeURIComponent(subject));
				break;
			case 'facebook':
				window.open("http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(link_url));
				break;
			case 'twitter':
				window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(subject) + "&url=" + encodeURIComponent(link_url));
				break;
			case 'googleplus':
				window.open("https://plus.google.com/share?url=" + encodeURIComponent(link_url));
				break;
			default:
				alert(LOCALIZE.설명_공유에실패하였습니다());
				break;
		}
	};

	return {
		showDefalutSnsShareList : function(_main_url, _site_name, _subject, _content, _link_url, _security_link_url, _image){
			return showDefalutSnsShareList(_main_url, _site_name, _subject, _content, _link_url, _security_link_url, _image);
		},
		setSnsApi : function(_type){
			if(ace_counter_plus_switch) ACE_COUNTER_PLUS.ShareSns(_type);
			return setSnsApi(_type);
		},
		shareKakaoTalk : function(_type){
			return shareKakaoTalk(_type);
		},
		shareKakaoStory : function(){
			return shareKakaoStory();
		},
		shareLine : function(){
			return shareLine();
		},
		shareBand : function(){
			return shareBand();
		},
		shareNaver : function(){
			return shareNaver();
		},
		shareFacebook : function(){
			return shareFacebook();
		},
		shareTwitter : function(){
			return shareTwitter();
		},
		shareGoogleplus : function(){
			return shareGoogleplus();
		},
		copyToClipboard : function(text){
			return copyToClipboard(text);
		},
		loadKakaoApi : function(key){
			loadKakaoApi(key);
		},
		init : function(d){
			return init(d);
		}
	};

}();