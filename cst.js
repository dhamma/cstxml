var set=process.argv[2]||'mul';
console.log(require('yase').build({
	dbid:'vri'+set,
	slotshift:8,
	loglevel:2,
	schema:function() {
		this.toctag(["nikaya","book"])
			.emptytag("pb").attr("pb","n",{"depth":2,"saveval":true})
		    .toctag("sutra").attr("sutra","id",{"depth":2,"saveval":true})
		    .toctag("p").attr("p","n",
		    	{"sparseval":true,"allowempty":true,"unqiue":true,"prefix":"sutra[id]","range":"-"})
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