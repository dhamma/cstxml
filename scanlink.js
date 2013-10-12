
var set=process.argv[2]||'mul';
var cstinfo=require('../js/cstinfo');
var yase=require('yase');
var opts={filelist:set+'/vri'+set+'.lst', folder:set+'/',textfile:true};
var out=[];
var processlist=function(){
	yase.processlist(opts,function(fn,content) {
		for (var i in content) {
			//console.log(content[i]);
			var r=cstinfo.scanlink(content[i]);
			if (r.out.length) out=out.concat( r.out );
		}
	})
	
}
var analyse=function(links) {
	var byaddress={};
	var bygroup={};
	for (var i in links) {
		var L=links[i];
		if (!byaddress[L.address])byaddress[L.address]=0;
		byaddress[L.address]++;
		if (!bygroup[L.group])bygroup[L.group]=0;
		bygroup[L.group]++;
	}

	var sortaddress=[];
	for (var i in byaddress) {
		sortaddress.push([i,byaddress[i]]);
	}
	sortaddress.sort(function(a,b){return a[1]-b[1]});

	var sortgroup=[];
	for (var i in bygroup) {
		sortgroup.push([i,bygroup[i]]);
	}
	sortgroup.sort(function(a,b){return a[1]-b[1]});

	console.log(sortaddress,sortaddress.length,links.length)
	console.log(sortgroup,sortgroup.length,links.length)

//	console.log(bygroup)
}


processlist();
analyse(out);