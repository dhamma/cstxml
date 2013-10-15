/*
	scan note
	todo:
	find out links inside note
	find out referencing paragram

	d1.22

	assalakkhaṇaṃ mahiṃsalakkhaṇaṃ <note>mahisalakkhaṇaṃ (sī. syā. kaṃ. pī.)</note> usabhalakkhaṇaṃ

	assalakkhaṇaṃ mahiṃsalakkhaṇaṃ <ref id="d1.22s1t34"/> usabhalakkhaṇaṃ
	
	"d1.22s1t34" : { note:"mahisalakkhaṇaṃ (sī. syā. kaṃ. pī.)", resp:"vri" }

*/	


var fs=require('fs');
var set=process.argv[2]||'mul'; 
var yase=require('yase');
var opts={filelist:set+'/vri'+set+'.lst', folder:set+'/',textfile:true};
var note=/<note>(.+?)<\/note>/;

var touchcount=0;
var processlist=function(){
	yase.processlist(opts,function(fn,content) {
		var touch=false;
		for (var i=0;i<content.length;i++) {
			var m=content[i].match(note);

			if (m)	{
				console.log(fn,i,m[1])
				touch=true;
				touchcount++;
			}

		}
		if (touch) {
			fs.writeFileSync(set+'c/'+fn,content.join('\n'),'utf8');
		}

	})
}


processlist();
console.log('touchcount',touchcount)
