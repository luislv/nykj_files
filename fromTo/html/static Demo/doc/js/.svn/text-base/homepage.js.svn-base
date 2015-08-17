/**
 * 首页样式
 */
var Homepage = {
		//引入模板
		template :  window.template,
		//是否加载了模板
		isLoadTemplate : function () { return (typeof window.template == 'undefined') ? false : true },
		//渲染
		render : function (html,data) { var render = Homepage.template.compile(html);return render(data); },
		//装载已经载入的图表
		loadedChart : [],
		//是否是数组
		isArray : function (obj) {   
			  return Object.prototype.toString.call(obj) === '[object Array]';    
		},
		//初始化面板
		init : function(panelId, layoutCode, componentCodes, sourceType) {
			this.loadedChart.length = 0;
			$.ajax({
                url: webroot+'/sysHpStyle/f_json/layout.shtml',
                type: 'post',
                data: { layoutCode: layoutCode, componentCodes: componentCodes, sourceType: sourceType },
                dataType: 'json',
                success : function(html) {
					$('#'+panelId).html(html);					
				}
    		});
		},
		//查询数据渲染数据 options {panelId,url 是必须 data 不是必须,dataIndex 不是必须渲染数据时可能有用} 非图表类
		loadByUrlAndQueryParams : function (options) {
			if (!this.isLoadTemplate()) return;
			var html = $('#'+options.panelId).html();
			$('#'+options.panelId).empty();
			$('#'+options.panelId).mask('加载中..');
			$.ajax({
                url: options.url,
                data : (typeof options.data != 'undefined') ? options.data : {},
                type: 'post',
                dataType: 'json',
                success : function(json) {
                	if (json.result == 'success') {
            			var _data = null;
            			if (typeof options.dataIndex != 'undefined') {
            				var _l = {} ; _l[options.dataIndex] = json.data;
            				_data = _l;
            			}else{
            				_data = json.data;
            			} 
                		$('#'+options.panelId).append(Homepage.render(html,_data));
                	}else{
                		$('#'+options.panelId).append('<ul><li><span class="mr10">暂无数据</span></li></ul>');
                	}
                	$('#'+options.panelId).unmask();
				}
    		});
		},
		//查询数据渲染数据 options {panelId,url 是必须 data 不是必须} 图表类
		loadByUrlAndQueryParamsToChart : function (options,callback) {
			if (!this.isLoadTemplate()) return;
			$('#'+options.panelId).empty();
			$('#'+options.panelId).mask('加载中..');
			$.ajax({
                url: options.url,
                data : (typeof options.data != 'undefined') ? options.data : {},
                type: 'post',
                dataType: 'json',
                success : function(json) {
                	if (json.result == 'success') {
                		if (Homepage.isArray(json.data) && json.data.length == 0) {
                			$('#'+options.panelId).append('暂无数据');
                		}else{
                			//集合数据,附加数据(可选)
                    		callback(json.data,json.msg);
                		}
                	}else{
                		$('#'+options.panelId).append('暂无数据');
                	}
                	$('#'+options.panelId).unmask();
				}
    		});
		},
		//投诉任务提醒加载
		initComplainRemind : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/fbFeedback/f_json/complainRemind.shtml'
			};
			this.loadByUrlAndQueryParams(options);
		},
		//投诉待审核提醒加载
		initComplainRemindByType : function (panelId,state) {
			var options = {
					panelId : panelId,
					url : webroot+'/fbFeedback/f_json/complainRemindByType.shtml',
					data : {state : state, page : 1, rows:5}
			};
			this.loadByUrlAndQueryParams(options);
		},
		//随访满意度分布
		initFollowUpEvaluationAnalyze : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/foVisit/f_json/followUpEvaluationAnalyze.shtml'
			};
			this.loadByUrlAndQueryParamsToChart(options, function (data) {
				var xAxisData = [],seriesData = [];
				for (var i = 0, len = data.length ; i < len; i++) {
					xAxisData[i] = eval('data[i].VISIT_RESULT_NAME');
					seriesData[i] = eval('data[i].COUNT'); 
				}
				var myChart = echarts.init(document.getElementById(panelId));
				var option  = {
					    tooltip : { trigger: 'axis' },
					    calculable : false,
					    xAxis : [{data : xAxisData }],
					    yAxis : [{ type : 'value'}],
					    grid : {x:50,y:30,x2:5,y2:30},
					    series : [ {name:'满意数',type:'line',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'},itemStyle: {normal: {areaStyle: {type: 'default'}}}, data:seriesData}]
				}
				myChart.setTheme(echartsTheme);
				myChart.setOption(option);
				Homepage.loadedChart.push(myChart);
				
				//表格填充
				var html = '<table border="1" bordercolor="#a0c6e5" style="width:95%;border-collapse:collapse;" class="hp_table"><tr><th></th>{{each names as name}}<td>{{name}}</td>{{/each}}</tr><tr><th>个数</th>{{each rows as row}}<td>{{row}}</td>{{/each}}</tr></table>';
				$('#'+options.panelId+'_table').empty();
				var _data = {'names':xAxisData,'rows':seriesData};
				$('#'+options.panelId+'_table').append(Homepage.render(html,_data));
			});
		},
		//随访综合满意度统计
		initFollowUpMydCompareAnalyze : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/foVisit/f_json/followUpMydCompareAnalyze.shtml'
			};
			this.loadByUrlAndQueryParamsToChart(options, function (data) {
				var xAxisData = [],seriesData1 = [],seriesData2 = [];
				$.each(data, function (i,obj) {
					xAxisData.push(eval('obj.DATE'));
					seriesData1.push(parseInt(eval('obj.CMYD'),10));
					seriesData2.push(parseInt(eval('obj.SMYD'),10));
				});
				var myChart = echarts.init(document.getElementById(panelId));
				var option  = {
					    tooltip : { trigger: 'axis' },
					    calculable : false,
					    tooltip : {trigger: 'axis',
					    	formatter:function (a) {
					    		return a[0].name+'<br/>'+a[0][0]+':'+a[0].data+'%'+'<br />'+a[1][0]+':'+ a[1].data+'%';
					    	}
					    },
					    xAxis : [{data : xAxisData }],
					    yAxis : [{ type : 'value'}],
					    grid : {x:50,y:30,x2:5,y2:30},
					    series : [ {name:'比月',type:'bar',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'}, smooth:true,data:seriesData1, itemStyle: { normal: {label: {show: true,position: 'top',textStyle: {  color: '#333' },formatter:function(a,b,value){return value+'%';} } }}},
					               {name:'本月',type:'bar',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'}, smooth:true,data:seriesData2, itemStyle: { normal: {label: {show: true,position: 'top',textStyle: {  color: '#333' },formatter:function(a,b,value){return value+'%';} } }}}]
				}
				myChart.setTheme(echartsTheme);
				myChart.setOption(option);
				Homepage.loadedChart.push(myChart);
			});
		},
		//随访本月满意度科室排行
		initfollowUpMydAnayzeByDep : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/foVisit/f_json/mydAnayzeByDep.shtml',
					data : {page : 1, rows:10}
			};
			this.loadByUrlAndQueryParamsToChart(options, function (data) {
				var xAxisData = [],seriesData = [];
				for (var i = data.length-1, j = 0; i >= j; i--) {
					xAxisData.push(eval('data[i].DEPNAME')?eval('data[i].DEPNAME'):eval('data[i].DEP_NO'));
					seriesData.push(parseInt(eval('data[i].MYD'),10));
				}
				var myChart = echarts.init(document.getElementById(panelId));
				var option  = {
					    tooltip : { trigger: 'axis' },
					    calculable : false,
					    tooltip : {trigger: 'axis',
					    	formatter:function (a) {
					    		return a[0].seriesName+':'+a[0].name+'<br/>满意度:'+a[0].data+'%';
					    	}
					    },
					    yAxis : [{type : 'category',data  : xAxisData }],
					    xAxis : [{ type : 'value'}],
					    grid :  {x:100,y:20,x2:50,y2:30},
					    series : [{name:'科　室',type:'bar',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'},data:seriesData, itemStyle: { normal: {color: '#3cb371',label: {show: true, position: 'insideRight',textStyle: {  color: '#333' },formatter:function(a,b,value){return value+'%';} } }}}]
				}
				myChart.setTheme(echartsTheme);
				myChart.setOption(option);
				Homepage.loadedChart.push(myChart);
			});
		},
		//本月随访满意度趋势
		initfollowUpMydTrendAnalyze : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/foVisit/f_json/mydTrendAnalyze.shtml',
					data : {page : 1, rows:10}
			}
			this.loadByUrlAndQueryParamsToChart(options, function (data,msg) {
				var xAxisData = [],seriesData = [];
				for (var i = 0, len = data.length ; i < len; i++) {
					xAxisData[i] = eval('data[i].DAY');
					seriesData[i] = parseInt(eval('data[i].MYD')); 
				}
				var myChart = echarts.init(document.getElementById(panelId));
				var option  = {
					    tooltip : { trigger: 'axis',
					    	formatter:function (a) {
					    		return '日　期:'+msg+a[0].name+'日<br/>满意度:'+a[0].data+'%';
					    	}
					    },
					    calculable : false,
					    xAxis : [{data : xAxisData }],
					    yAxis : [{ type : 'value'}],
					    grid : {x:50,y:30,x2:5,y2:30},
					    series : [ {name:'满意度',type:'line',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'},data:seriesData}]
				}
				myChart.setTheme(echartsTheme);
				myChart.setOption(option);
				Homepage.loadedChart.push(myChart);
			});
		},
		//到期随访工作提醒
		initFollowUpExpireTaskRemind : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/foFollowCase/f_json/expireTaskRemind.shtml'
			};
			this.loadByUrlAndQueryParams(options);
		},
		//本月计划状态统计
		initfollowUpPlanStatusAnalyze : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/foSearcher/f_json/planStatusAnalyze.shtml',
					data : {vdateStart : curMonthFirst,vdateEnd : curMonthLast}
			};
			this.loadByUrlAndQueryParamsToChart(options, function (data) {
				var xAxisData = [],seriesData = [];
				seriesData.push(parseInt(eval('data.established'),10));
				xAxisData.push('已制定');
				seriesData.push(parseInt(eval('data.notEstablished'),10));
				xAxisData.push('待制订');
				seriesData.push(parseInt(eval('data.ended'),10));
				xAxisData.push('已结束');
				seriesData.push(parseInt(eval('data.excluded'),10));
				xAxisData.push('已排除');
				var myChart = echarts.init(document.getElementById(panelId));
				var option  = {
					    tooltip : { trigger: 'axis' },
					    calculable : false,
					    tooltip : {trigger: 'axis',
					    	formatter:function (a) {
					    		return a[0].seriesName+'<br />'+a[0].name+'：'+a[0].data;
					    	}
					    },
					    xAxis : [{data : xAxisData }],
					    yAxis : [{ type : 'value'}],
					    grid : {x:50,y:30,x2:5,y2:30},
					    series : [ {name:'计划状态',type:'bar',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'}, smooth:true,data:seriesData, itemStyle: { normal: {label: {show: true,position: 'top',textStyle: {  color: '#333' } } }}}]
				}
				myChart.setTheme(echartsTheme);
				myChart.setOption(option);
				Homepage.loadedChart.push(myChart);
			});
		},
		//本月随访工作人员工作构成统计
		initfollowUpUserWorkAnalyze : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/foVisit/f_json/userWorkAnalyze.shtml',
					data : {queryStartDate : curMonthFirst,queryEndDate : curMonthLast}
			};
			this.loadByUrlAndQueryParamsToChart(options, function (data) {
				var seriesData = [];
				for (var i = 0, len = data.length ; i < len; i++) {
					var _data = {};
					_data.value = data[i].COUNT, _data.name = data[i].REALNAME;
					seriesData.push(_data);
				}
				var myChart = echarts.init(document.getElementById(panelId));
				var option  = {
					    calculable : true,
					    tooltip : {trigger: 'item',backgroundColor:'rgba(1,205,205,0.7)',formatter: "{a} <br/>{b} : {c} ({d}%)"},
					    grid : {x:50,y:30,x2:5,y2:30},
					    xAxis : [],
					    series : [ {name:'工作量',type:'pie', radius : [0,'50%'],selectedMode:'single',center: ['50%', '50%'],data:seriesData}]
				}
				myChart.setTheme(echartsTheme);
				myChart.setOption(option);
				Homepage.loadedChart.push(myChart);
			});
		},
		//本月患者随访统计
		initfollowUpFoStatusAnalyze : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/foFollowCase/f_json/followUpFoStatusAnalyze.shtml',
					data : {queryStartDate : curMonthFirst,queryEndDate : curMonthLast}
			};
			this.loadByUrlAndQueryParamsToChart(options, function (data) {
				var xAxisData = [],seriesData = [];
				for (var i = 0, len = data.length ; i < len; i++) {
					xAxisData.push(eval('data[i].NAME'));
					seriesData.push(parseInt(eval('data[i].COUNT'),10));
				}
				var myChart = echarts.init(document.getElementById(panelId));
				var option  = {
					    tooltip : { trigger: 'axis' },
					    calculable : false,
					    tooltip : {trigger: 'axis',
					    	formatter:function (a) {
					    		return a[0].seriesName+':'+a[0].name+'<br/>数　量:'+a[0].data;
					    	}
					    },
					    xAxis : [{type : 'category',data  : xAxisData }],
					    yAxis : [{ type : 'value'}],
					    grid :  {x:50,y:25,x2:50,y2:30},
					    series : [{name:'随访状态',type:'bar',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'},data:seriesData, itemStyle: { normal: {color: '#3cb371',label: {show: true, position: 'top',textStyle: {  color: '#333' } } }}}]
				}
				myChart.setTheme(echartsTheme);
				myChart.setOption(option);
				Homepage.loadedChart.push(myChart);
			});
		},
		//本月随访趋势
		initfollowUpSPTrendAnalyze : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/foVisit/f_json/SPTrendAnalyze.shtml',
					data : {queryStartDate : curMonthFirst,queryEndDate : curMonthLast}
			}
			this.loadByUrlAndQueryParamsToChart(options, function (data,msg) {
				var xAxisData = [],seriesData1 = [],seriesData2 = [];
				for (var i = 0, len = data.length ; i < len; i++) {
					xAxisData[i] = eval('data[i].DAY');
					seriesData1[i] = parseInt(eval('data[i].SCOUNT')); 
					seriesData2[i] = parseInt(eval('data[i].PCOUNT')); 
				}
				var myChart = echarts.init(document.getElementById(panelId));
				var option  = {
					    tooltip : { trigger: 'axis',
					    	formatter:function (a) {
					    		var showText = '';
					    		for (var i = 0; i < a.length; i++) {
					    			if (i == 0) showText+='日　期:'+msg+a[i].name+'日<br/>';
					    			showText+=a[i].seriesName+'：'+a[i].data+'<br/>';
					    		}
					    		return showText;
					    	}
					    },
					    legend: {data:['随访成功数','随访人数']},
					    calculable : false,
					    xAxis : [{data : xAxisData }],
					    yAxis : [{ type : 'value'}],
					    grid : {x:50,y:30,x2:5,y2:30},
					    series : [ {name:'随访成功数',type:'line',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'},data:seriesData1},
					    		   {name:'随访人数',type:'line',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'},data:seriesData2}]
				}
				myChart.setTheme(echartsTheme);
				myChart.setOption(option);
				Homepage.loadedChart.push(myChart);
			});
		},
		//本月病种计划统计
		initfollowUpDiseaseTypePlanAnalyze : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/foFollowCase/f_json/followUpDiseaseTypePlanAnalyze.shtml',
					data : {queryStartDate : curMonthFirst,queryEndDate : curMonthLast}
			};
			this.loadByUrlAndQueryParamsToChart(options, function (data) {
				var xAxisData = [],seriesData = [];
				for (var i = 0, j = data.length; i < j; i++) {
					xAxisData.push((typeof eval('data[i].NAME')=='undefined')?'其它':eval('data[i].NAME'));
					seriesData.push(parseInt(eval('data[i].COUNT'),10));
				}
				//图表绘制
				var myChart = echarts.init(document.getElementById(panelId));
				var option  = {
					    tooltip : { trigger: 'axis' },
					    calculable : false,
					    tooltip : {trigger: 'axis',
					    	formatter:function (a) {
					    		return a[0].seriesName+':'+a[0].name+'<br/>病人计划人数:'+a[0].data;
					    	}
					    },
					    yAxis : [{type : 'category',data  : xAxisData }],
					    xAxis : [{ type : 'value'}],
					    grid :  {x:100,y:20,x2:50,y2:30},
					    series : [{name:'病种',type:'bar',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'},data:seriesData, itemStyle: { normal: {color: '#3cb371',label: {show: true, position: 'insideRight',textStyle: {  color: '#333' }} }}}]
				}
				myChart.setTheme(echartsTheme);
				myChart.setOption(option);
				Homepage.loadedChart.push(myChart);
				//表格填充
				var html = '<table border="1" bordercolor="#a0c6e5" style="width:95%;border-collapse:collapse;" class="hp_table"><tr><th></th>{{each names as name}}<td>{{name}}</td>{{/each}}</tr><tr><th>人数</th>{{each rows as row}}<td>{{row}}</td>{{/each}}</tr></table>';
				$('#'+options.panelId+'_table').empty();
				var _data = {'names':xAxisData.reverse(),'rows':seriesData.reverse()};
				$('#'+options.panelId+'_table').append(Homepage.render(html,_data));
			});
		},
		//今日工作提示
		initfollowUpTodayTaskRemind : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/followUpCommon/f_json/todayTaskRemind.shtml',
					dataIndex : 'rows'
			};
			this.loadByUrlAndQueryParams(options);
		},
		//生日短信任务提醒
		initSmsBirthTaskRemind : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/othsmssend/f_json/smsTaskRemind.shtml',
					data : {mname:'sms_concern_1'},
					dataIndex : 'rows'
			};
			this.loadByUrlAndQueryParams(options);
		},
		//短信发送统计科室排名
		initSmsStatGroupByDep : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/othSmsSendHis/f_json/statGroupByDep.shtml',
					data : {queryStartDate : curMonthFirst,queryEndDate : curMonthLast,page : 1, rows:100}
			};
			this.loadByUrlAndQueryParamsToChart(options, function (data) {
				var xAxisData = [],seriesData = [];
				for (var i = data.length-1, j = 0; i >= j; i--) {
					xAxisData.push(eval('data[i].DEPNAME'));
					seriesData.push(parseInt(eval('data[i].COUNT'),10));
				}
				var myChart = echarts.init(document.getElementById(panelId));
				var option  = {
					    tooltip : { trigger: 'axis' },
					    calculable : false,
					    tooltip : {trigger: 'axis',
					    	formatter:function (a) {
					    		return a[0].seriesName+':'+a[0].name+'<br/>数量:'+a[0].data;
					    	}
					    },
					    yAxis : [{type : 'category',data  : xAxisData }],
					    xAxis : [{ type : 'value'}],
					    grid :  {x:100,y:20,x2:50,y2:30},
					    series : [{name:'科室',type:'bar',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'},data:seriesData, itemStyle: { normal: {color: '#3cb371',label: {show: true, position: 'insideRight',textStyle: {  color: '#333' } } }}}]
				}
				myChart.setTheme(echartsTheme);
				myChart.setOption(option);
				Homepage.loadedChart.push(myChart);
			});
		},
		//短信综合满意度统计
		initSmsMydCompareAnalyze : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/qsSurveyRecord/f_json/smsMydCompareAnalyze.shtml',
					data : {surveyType:6, queryStartDate : curMonthFirst,queryEndDate : curMonthLast}
			};
			this.loadByUrlAndQueryParamsToChart(options, function (data) {
				var xAxisData = [],seriesData1 = [],seriesData2 = [];
				$.each(data, function (i,obj) {
					xAxisData.push(eval('obj.DATE'));
					seriesData1.push(parseInt(eval('obj.CMYD'),10));
					seriesData2.push(parseInt(eval('obj.SMYD'),10));
				});
				var myChart = echarts.init(document.getElementById(panelId));
				var option  = {
					    tooltip : { trigger: 'axis' },
					    calculable : false,
					    tooltip : {trigger: 'axis',
					    	formatter:function (a) {
					    		return a[0].name+'<br/>'+a[0][0]+':'+a[0].data+'%'+'<br />'+a[1][0]+':'+ a[1].data+'%';
					    	}
					    },
					    xAxis : [{data : xAxisData }],
					    yAxis : [{ type : 'value'}],
					    grid : {x:50,y:30,x2:5,y2:30},
					    series : [ {name:'比月',type:'bar',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'}, smooth:true,data:seriesData1, itemStyle: { normal: {label: {show: true,position: 'top',textStyle: {  color: '#333' },formatter:function(a,b,value){return value+'%';} } }}},
					               {name:'本月',type:'bar',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'}, smooth:true,data:seriesData2, itemStyle: { normal: {label: {show: true,position: 'top',textStyle: {  color: '#333' },formatter:function(a,b,value){return value+'%';} } }}}]
				}
				myChart.setTheme(echartsTheme);
				myChart.setOption(option);
				Homepage.loadedChart.push(myChart);
			});
		},
		//短信本月满意度科室排行
		initSmsMydAnalyzeDep : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/qsSurveyRecord/f_json/smsMydAnalyzeDep.shtml',
					data : {queryStartDate : curMonthFirst,queryEndDate : curMonthLast,surveyType:6,page : 1, rows:10}
			};
			this.loadByUrlAndQueryParamsToChart(options, function (data) {
				var xAxisData = [],seriesData = [];
				for (var i = data.length-1, j = 0; i >= j; i--) {
					xAxisData.push(eval('data[i].DEPNAME'));
					seriesData.push(parseInt(eval('data[i].MYD'),10));
				}
				var myChart = echarts.init(document.getElementById(panelId));
				var option  = {
					    tooltip : { trigger: 'axis' },
					    calculable : false,
					    tooltip : {trigger: 'axis',
					    	formatter:function (a) {
					    		return a[0].seriesName+':'+a[0].name+'<br/>满意度:'+a[0].data+'%';
					    	}
					    },
					    yAxis : [{type : 'category',data  : xAxisData }],
					    xAxis : [{ type : 'value'}],
					    grid :  {x:100,y:20,x2:50,y2:30},
					    series : [{name:'科　室',type:'bar',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'},data:seriesData, itemStyle: { normal: {color: '#3cb371',label: {show: true, position: 'insideRight',textStyle: {  color: '#333' },formatter:function(a,b,value){return value+'%';} } }}}]
				}
				myChart.setTheme(echartsTheme);
				myChart.setOption(option);
				Homepage.loadedChart.push(myChart);
			});
		},
		//本月短信满意度趋势
		initSmsMydTrendAnalyze : function (panelId) {
			var options = {
					panelId : panelId,
					url : webroot+'/qsSurveyRecord/f_json/smsMydTrendAnalyze.shtml',
					data : {queryStartDate : curMonthFirst,queryEndDate : curMonthLast,surveyType:6}
			};
			this.loadByUrlAndQueryParamsToChart(options, function (data,msg) {
				var xAxisData = [],seriesData = [];
				for (var i = 0, len = data.length ; i < len; i++) {
					xAxisData[i] = eval('data[i].DAY');
					seriesData[i] = parseInt(eval('data[i].MYD')); 
				}
				var myChart = echarts.init(document.getElementById(panelId));
				var option  = {
					    tooltip : { trigger: 'axis',
					    	formatter:function (a) {
					    		return '日　期:'+msg+a[0].name+'日<br/>满意度:'+a[0].data+'%';
					    	}
					    },
					    calculable : false,
					    xAxis : [{data : xAxisData }],
					    yAxis : [{ type : 'value'}],
					    grid : {x:50,y:30,x2:5,y2:30},
					    series : [ {name:'满意度',type:'line',tooltip:{backgroundColor:'rgba(1,205,205,0.7)'},data:seriesData}]
				}
				myChart.setTheme(echartsTheme);
				myChart.setOption(option);
				Homepage.loadedChart.push(myChart);
			});
		},
		//加载核心菜单
		initQuickMenu : function(panel) {
			var _panel = $('#'+panel);
			$.ajax({
				url: webroot + '/menu/f_json/quickMenu.shtml',
				dataType: 'json',
				cache: false,
				success: function(text) {
					if(text == '') {
						_panel.append('<li><a>暂无菜单</a></li>');
						return;
					}
					_panel.append(text); 					
					$('#'+panel).find('li>a').each(function(i, obj) {
						var _url = $(obj).attr('href');
						var _menuNo = $(obj).attr('data-menuNo');
						var _name = $(obj).text();
						$(obj).attr('href', '#');
						$(obj).click(function() {
							parent.menuInfo.clickMenu(_name, _url, false, _menuNo);
						});
					});
				}
			});
		},
		//加载系统公告
		initPtNoteList : function(panel) {			
			var _panel = $('#'+panel);var k=1;var str='';
			$.ajax({
				url: webroot + '/pNotice/f_json/pageQuery.shtml',
				dataType: 'json',
				data:{size:"10",rows:"10",page:"1"},
				success: function(json) {
					if(json.rows.length > 0) {
						$.each(json.rows, function(i, obj) {																		
							str+= '<li><div class="rig"><a style="margin-left:10px;" href="javascript:Homepage.openPtNote(\''+obj.id+'\')">'
								+k+'.'+obj.title+'</a></div>'+'<div class="cen"><a>'+obj.update_date+'</a></div></li>';
							k++;
						});
						_panel.html(str);						
					} else {
						_panel.append('<li>暂无公告</li>');
					}			
					
				}
			});
		},
		//打开公告详情
		openPtNote : function(id) {
			Comm.dialog({
				type:'iframe',
				url:webroot+'/pNotice/f_view/noticeView.shtml?id='+id,
		    	title:'公告详情',
		    	width: 700,
		    	height: 450,
		    	modal:true		    	 
		    });
			$('iframe').css("height","99%");
		}
};