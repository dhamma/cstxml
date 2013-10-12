var set=process.argv[2]||'mul';
console.log(require('yase').build({
	dbid:'vri'+set,
	slotshift:8,
	loglevel:2,
	linkto:'vrimul',
	schema:function() {
		this.toctag(["nikaya","book"]).attr("book","id",{"depth":1,"saveval":true,"unique":true})
			.pagebreak("pb").attr("pb","n",{"depth":2,"saveval":true})
		    .toctag("readunit").attr("readunit","id",{"depth":1,"saveval":true,"unique":true})
		    .emptytag("pgroup").attr("pgroup","id",{"depth":1,"saveval":true,"unique":true})
		    .paragraph("p").attr("p","n",
		    	{"depth":2,"sparseval":true,"allowempty":true,"unique":true,
		    	  "prefix":"pgroup[id]","range":"-"})
		if (set=='mul') {
		    this.attr("p","sid", //secondary reference number, SN = sutta no. , DN= section no.
		    	{"depth":2,"sparseval":true,"allowempty":true,"unique":true,
		    	  "prefix":"pgroup[id]","range":"-"})
		}
	},
	input:set+'/vri'+set+'.lst',
	output:'../vri'+set+'.ydb',
	author:'yapcheahshen@gmail.com',
	url:'http://www.ksana.tw',
	version:'0.0.1',
	outputencoding:'utf8',
	//maxfile:1,
	customfunc:require('../tools/tipitakacustom.js')
	
}));