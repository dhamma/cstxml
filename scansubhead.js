/*var snmanual=['s12','s17','s18','s23','s24','s29','s30','s31','s32','s33'
,'s34','s35','s36','s43','s45','s46','s47','s48','s49','s50','s51','s53','s56']//non continuous
var snsutracount={
"s1":81,"s2":30,"s3":25,"s4":25,"s5":10,"s6":15,"s7":22,"s8":12,"s9":14,"s10":12,
"s11":25,"s12":75,"s13":11,"s14":39,"s15":20,"s16":13,"s17":31,"s18":14,"s19":21,"s20":12,
"s21":12,"s22":159,"s23":26,"s24":32,"s25":10,"s26":10,"s27":10,"s28":10,"s29":12,"s30":6,
"s31":6,"s32":9,"s33":16,"s34":27,"s35":201,"s36":31,"s37":34,"s38":16,"s39":2,"s40":11,
"s41":10,"s42":13,"s43":15,"s44":11,"s45":115,"s46":92,"s47":55,"s48":74,"s49":4,"s50":5,
"s51":34,"s52":24,"s53":2,"s54":20,"s55":74,"s56":109
}*/

/*
  add second reference number for DN and SN
  only 2  sutta in MN has subhead, do it manually.
*/
/* no harm if run again on p with id */
/*
DN check with DRP
SN check with http://agama.buddhason.org/SN/index.htm

   SN 12 should have 103 sutta
   buddhason.org missing
   <p rend="subhead">2-12. sikkhāsuttādipeyyālekādasakaṃ</p>

   SN24,SN46,SN48,SN50,SN51 need manual fixup
*/


var fs=require('fs');
var set=process.argv[2]||'mul';
var yase=require('yase');
var opts={filelist:set+'/vri'+set+'.lst', folder:set+'/',textfile:true};
var out=[];
var subhead=[],subheadcount=[];
var count=0;
var processlist=function(){
	var readunit="",nikaya="";
	var handlerange=function(s){ // one subhead has multiple sutta
		var m=s.match(/(\d+)-(\d+)\./);
		if (m) {
			return parseInt(m[2])-parseInt(m[1])+1;
		} else return 1;
	}
	yase.processlist(opts,function(fn,content) {
		var touch=false;
		for (var i=0;i<content.length;i++) {
			//console.log(content[i]);
			var m=content[i].match('<readunit id="(.+?)"');

			if (m)	{
				if (readunit && readunit[0]!='a') subheadcount.push(readunit+'='+count);
				readunit=m[1];
				nikaya=readunit[0];
				count=0;
			}
			var addsid=function(offset) {
				offset=offset||17;
				
				var s=content[i].replace(/<.+?>/g,'');
				var range=handlerange(content[i]);
				if (range==0) throw 'error range';

				var id=count+1; 
				if (range>1) id=id+'-'+(count+1+range);//some SN has range
				content[i]=content[i].substring(0,offset)
				+' sid="'+id+'"'+content[i].substring(offset);
				count+=range;
				out.push(content[i]);
				var o={unit:readunit,sub:s,n:count};
				subhead.push(o);
				touch=true;
			}
			//some DN has no subhead after readunit
			if ((nikaya=='d') && count==0 && content[i].substring(0,3)=='<p ' ) {
				if (content[i].indexOf('rend="bodytext" n=')>-1) {
					//console.log('warning , first p should be subhead after readunit', fn,i);
					addsid(18);
				}
			}
			if (content[i].indexOf('rend="subhead">')>0 && (nikaya=='s'||nikaya=='d')) {
				addsid();
			}
		}
		if (touch) console.log('touch',fn)

	})
	if (nikaya=='s'||nikaya=='d') subheadcount.push(readunit+'='+count);

}


processlist();
fs.writeFileSync('subheadout_'+set+'.json',JSON.stringify(out,'',' '),'utf8');
fs.writeFileSync('subhead_'+set+'.json',JSON.stringify(subhead,'',' '),'utf8');
fs.writeFileSync('subheadcount_'+set+'.json',JSON.stringify(subheadcount,'',' '),'utf8');