var $jybirth = function(y, m, d, o){
	var str = "";
	var o = o || {};
	var $dDate = new Date();
	var $jyday = o.jyday || $('#jyday');
	var $jymonth = o.jymonth || $('#jymonth');
	var $jyyear = o.jyyear || $('#jyyear');
	var $dCurYear = $dDate.getFullYear();

	var monCal = function (iYear, iMonth, iDay){
		$jymonth.empty();
		var str = iDay==0?"<option value=\"0\" selected=true>-</option>":'';
		for(var m=1;m<=12;m++){
			if(m==($dDate.getMonth()+2) && $jyyear.val()==$dCurYear)break;
			if(m < 10)m = '0'+m;
			str+="<option value="+m+" "+ ((iDay!=0 && iMonth==m)?"selected=true":"") +">"+m+"</option>";
		}
		$jymonth.append(str);
	}

	var dayCal = function(iYear, iMonth, iDay){
		$jyday.empty();
		var str = iDay==0?"<option value=\"0\" selected=true>-</option>":'';
		var daysInMonth = (new Date(iYear, iMonth, 0)).getDate();
		for (d = 1; d <= parseInt(daysInMonth); d++) {
			if(d==$dDate.getDate() && $jyyear.val()==$dCurYear && $jymonth.val()==($dDate.getMonth()+1))break;
			if(d < 10)d = '0'+d;
			str+="<option value="+d+" "+ (iDay==d?"selected=true":"") +">"+d+"</option>";
		}
		$jyday.append(str);
	};

	$jyyear.bind("change", function(){
		monCal($jyyear.val(),$jymonth.val(), 0);
		dayCal($jyyear.val(),$jymonth.val(), 0);
	});

	$jymonth.bind("change", function(){
		dayCal($jyyear.val(),$jymonth.val(), 0);
	});

	if($jyyear.find('option').length <= 1){
		for(var i=$dCurYear;i>$dCurYear-121;i--){
			str="<option value="+i+">"+i+"</option>";
			$jyyear.append(str);
		}
	}

	if(y && m && d){
		setTimeout(function(){
			$jyyear.val(y);
		});
		monCal(y, m, d);dayCal(y, m, d);
	}
};