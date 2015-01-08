var srcpath="mul/";
var fs=require("fs");
var mul=fs.readFileSync(srcpath+"vrimul.lst","utf8").replace(/\r?\n/g,"\n").split("\n");
var tokenizer=require("ksana-document").tokenizers.simple;
var tokens={},tokencount=0;
var parseLine=function(line) {
	var parsed=tokenizer(line);
	for (var i=0;i<parsed.tokens.length;i++) {
		var tk=parsed.tokens[i].trim();
		if (tk.charAt(0)<'A') continue;
		if (!tokens[tk]) {
			tokens[tk]=0;
			tokencount++;
		}
		tokens[tk]++;

	}
}

var processfile=function(fn) {
	console.log("processing "+fn);
	var lines=fs.readFileSync(srcpath+fn,"utf8").replace(/\r?\n/g,"\n").split("\n");
	for (var i=0;i<lines.length;i++) parseLine(lines[i]);
}
var sortalpha=function(a,b){
	if (a>b) return 1;
	else if (b>a) return -1;
	else return 0;
}

var sortlength=function(a,b) {
	return b.length-a.length;
}
var sortcount=function(a,b) {
	if (b[1]==a[1]) {
		return b[0].length-a[0].length;
	} else {
		return b[1]-a[1];
	}
}
var dumptokens=function() {
	var out=Object.keys(tokens);
	out.sort(sortlength);
	fs.writeFileSync("tokens.txt",out.join("\n"),"utf8");
}
var dumpcount=function() {
	var out=[];
	for (var tk in tokens) {
		out.push([tk,tokens[tk]]);
	}
	out.sort(sortcount);
	fs.writeFileSync("tokencount.txt",out.join("\n"),"utf8");
}

mul.map(processfile);
console.log(tokencount);
console.log("dumping tokens");
//dumpcount();
dumptokens();