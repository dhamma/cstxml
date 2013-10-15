/*
	scan and remove paranum , warn if not equal to p[n]
*/


var fs=require('fs');
var set=process.argv[2]||'mul'; 
var yase=require('yase');
var opts={filelist:set+'/vri'+set+'.lst', folder:set+'/',textfile:true};
var bodytext=/<p rend="bodytext"/;
var regex=/<p rend="bodytext" n="(.+?)"><hi rend="paranum">(.+?)<\/hi><hi rend="dot">.<\/hi>/;
var repl=/<hi rend="paranum">.+?<\/hi><hi rend="dot">.<\/hi>/;

var touchcount=0;
var processlist=function(){
	yase.processlist(opts,function(fn,content) {
		var touch=false;
		for (var i=0;i<content.length;i++) {
			//console.log(content[i]);
			var m=content[i].match(bodytext);

			if (m)	{

				m=content[i].match(regex);
				if (m) {
					if (m[1]!=m[2]) {
						console.log(fn,i,'inconsistent',m[1],m[2]);
					}
					content[i]=content[i].replace(repl,'');
				}

				content[i]=content[i].replace(bodytext,'<p');
				touch=true;
				touchcount++;
			}

		}
		if (touch) {
			fs.writeFileSync(set+'/'+fn,content.join('\n'),'utf8');
		}

	})
}


processlist();
console.log('touchcount',touchcount)
