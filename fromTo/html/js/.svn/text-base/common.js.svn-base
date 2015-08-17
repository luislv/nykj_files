;(function(){
	var _localdata = new Array();
	this.urlparser = function(){
		var url = arguments[0] ? arguments[0] : _localdata["hlcomm"].jspath;
		var _regex   = ///^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
		 /^(\w+):\/\/([^(:|\/)]*)(:(\d+))?\/([^(\?|\#|\n)]*)?(#([^?]*))?(\?(.*))?/i;
		var arr = _regex.exec(url);
		//alert(arr[1]+" | "+arr[2]+" | "+arr[3]+" | "+arr[4]+" | "+arr[5]+" | "+arr[6]+" | "+arr[7]+" | "+arr[8]+" | "+arr[9]);
		var fields = { protocol : arr[1] ? unescape(arr[1]):"",
		              host     : "",
		              hostname : arr[2] ? unescape(arr[2]):"",
		              port     : arr[4] ? unescape(arr[4]):"",
		              pathname : arr[5] ? unescape(arr[5]):"",
		              path     : "",
					   file     : "",
		              hash     : arr[7] ? unescape(arr[7]):"",
		              search   : arr[9] ? unescape(arr[9]):"",
					   href     : "",
					   fhost    : "",
					   fpath    : ""
		             }
	    fields.host  = fields.hostname+(fields.port!=""?(":"+fields.port):"");
	    fields.fhost = fields.protocol+(fields.host!=""?("://"+fields.host):"")+"/";
	    fields.path  = fields.pathname != "" &&　fields.pathname.lastIndexOf("/") > 0　
		             ? (fields.pathname.substr(0,fields.pathname.lastIndexOf("/"))) :"";
	    fields.file  = fields.pathname != "" &&　fields.pathname.lastIndexOf("/") > 0　
		             ? (fields.pathname.substr(fields.pathname.lastIndexOf("/")+1)):fields.pathname;
		 fields.fpath = fields.fhost + (fields.path!=""?fields.path:"")+"/";
		 fields.href  = fields.fhost + (fields.pathname!=""?fields.pathname:"")+"/";
		 fields.paths = fields.path != "" ? (fields.path.indexOf("/") > 0 ? fields.path.split("/") : [fields.path]):[];
		 fields.query = function(name){
			 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			 var r = fields.search.match(reg);
			 if(r!=null)return  unescape(r[2]); return "";
		 }
		return fields;
	}
	this.include = function(url){
		 url = typeof(url) != "string" ? "":url;
		 if(url == "") {
			 throw new Error('Include "url" is required !');
			 return;
		 }
		 var _ext = url.lastIndexOf(".") > 0 ? url.substr(url.lastIndexOf(".")+1) : "";
		 var isCss = _ext.toLowerCase() == "css";
		 url += typeof(arguments[1]) == "boolean" && arguments[1] == true ? ('?' + Math.random()) : "";
		 var _call = arguments[2] ? arguments[2] : null;
        var header  = document.getElementsByTagName('head')[0];
        var scritps = document.getElementsByTagName('script');
        var links   = document.getElementsByTagName('link');
		 var _obj    = document.createElement(isCss?'link':'script');
		 if(isCss) {
			_obj.setAttribute('type', 'text/css');
			_obj.setAttribute('rel', 'stylesheet');
			_obj.setAttribute('href', url);
		 }else{
			_obj.setAttribute('type', 'text/javascript');
			//_obj.setAttribute('charset', 'utf-8');
			//_obj.setAttribute('src');
			_obj.setAttribute('src', url);
		 }
        header.appendChild(_obj);
        _obj.onload = _obj.onreadystatechange = function() {
            if (!this.readyState || typeof(this.readyState) == "undefined" || this.readyState === "loaded" || this.readyState === "complete") {
				if(typeof(_call) == "function") _call.apply(this);
            	_obj.onload = _obj.onreadystatechange = null;
    		}
        };
	}
	function _callfunc(localobj, name){
		 document.onload = document.onreadystatechange = function() {
			if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
				var _obj = (typeof(localobj) == "object" && localobj != null);
				var funcname = _obj ? "localobj."+name : name;
				if(name!= "")eval("if(typeof("+funcname+") == \"function\")"+funcname+".apply("+(_obj?"localobj":"")+");");
				document.onload = document.onreadystatechange = null;
			}
		}
	}
	
	var _this = this;
	;(this.localdata = function(key){
		if(typeof _localdata[key] != "object") {
			var _scripts = document.getElementsByTagName('script');
			var _jspath  = _scripts.length > 0 ? _scripts[_scripts.length-1].src : "";
			_localdata[key] = urlparser(_jspath);
			_localdata[key].jspath = _jspath;
			_localdata[key].call   = function(){
				var localobj = arguments[0] ? arguments[0] : null;
				var ctrl = this.query("c");
				if(ctrl != "")_callfunc(localobj, ctrl);
			}
		}
		return _localdata[key];
	})("hlcomm");
	window.hlcomm = this;
})();
