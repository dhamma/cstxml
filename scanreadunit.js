
var set=process.argv[2]||'mul';
var cstinfo=require('../js/cstinfo');
var custom=require('../js/tipitakacustom');
var yase=require('yase');
var opts={filelist:set+'/vri'+set+'.lst', folder:set+'/',textfile:true};
var out={};
var processlist=function(){
	yase.processlist(opts,function(fn,content) {
		for (var i in content) {
			//console.log(content[i]);
			if( content[i].indexOf('<readunit')>-1) {

				var s=content[i].replace(/<p .*?>/g,'');
				s=s.replace(/<head .*?>/,'');
				s=s.replace('</p>','')
				s=s.replace('</head>','')
				s=s.replace(/<note>.*?<\/note>/,'')
				s=s.replace(/<pgroup .*?>/,'')

				m=s.match(/<readunit id="(.+?)"/);
				var sname=s.replace(/<.*?>/g,'').replace(/.*?\./,'').trim();
				sname=custom.simplifiedToken(sname);
				out[sname]=m[1];
			}
		}
	})
	
}

processlist();
console.log('define(function(){return'+JSON.stringify(out,'',' ')+'})');
