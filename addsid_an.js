/* add sid for an subhead */
var files=['mul/s0401m-a1.xml',
'mul/s0402m-a2.xml',
'mul/s0402m-a3.xml',
'mul/s0402m-a4.xml',
'mul/s0403m-a5.xml',
'mul/s0403m-a6.xml',
'mul/s0403m-a7.xml',
'mul/s0404m-a8.xml',
'mul/s0404m-a9.xml',
'mul/s0404m-a10.xml',
'mul/s0404m-a11.xml']

var fs=require('fs')
var readunit='',sid=1;

var notcontinuenumber=['31-510. dosabhiññādisuttāni','10. cetasovinibandhasuttaṃ',
'14. aparapaṭhamajhānasuttaṃ','15-21. aparadutiyajhānasuttādisattakaṃ','8. ājīvakasuttaṃ',
'9-17. nigaṇṭhasuttādinavakaṃ']
var processfile=function(fn) {
	var arr=fs.readFileSync(fn,'utf8').split('\n');
	for (var i in arr) {
		var line=arr[i];
		var m=line.match(/<readunit id="(.*?)"/);
		if (m) {
			readunit=m[1];
			sid=1;
		}

		if (line.indexOf('<p rend="subhead">')>-1) {

			var notag=line.replace(/<.*?>/g,'').trim();
			var verify=parseInt(notag);
			if (verify!=sid) {
				if (notcontinuenumber.indexOf(notag)>-1) {
					//ok exception
				} else {
					console.log('not same',line,fn)	
				}
			}
			var idx=notag.indexOf('.')
			if (idx>-1) {
				var id=notag.substring(0,idx);
				//console.log(id)
				newline=line.replace('<p rend="subhead">','<p rend="subhead" sid="'+id+'">')
				arr[i]=newline;
				sid++;
				console.log(newline)
			}  else {
				console.log('no number',line,fn)
			}
		}
	}
	fs.writeFileSync(fn,arr.join('\n'),'utf8');
}
for (var i in files) {
	processfile(files[i]);
}