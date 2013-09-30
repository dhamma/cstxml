var set=process.argv[2]||'mul';
console.log(require('yase').build({
	dbid:'vri'+set,
	slotshift:8,
	loglevel:2,
	addressing:'cst',
	schema:function() {
		this.toctag(["nikaya","book"])
			.pagebreak("pb").attr("pb","n",{"depth":2,"saveval":true})
		    .toctag("readunit").attr("readunit","id",{"depth":1,"saveval":true})
		    .paragraph("p").attr("p","n",
		    	{"depth":2,"sparseval":true,"allowempty":true,"unqiue":true,
		    	  "prefix":"readunit[id]","range":"-"})
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