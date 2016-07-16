function nullParser(input){
	if(input.slice(0,4) === "null"){
		return [null, input.slice(4)];
		//return null;
	}
	else{
		return null;
	}
}
//console.log(nullParser('null, abc'));

function boolParser(input){
	if(input.slice(0,4) == "true"){
		return [true, input.slice(4)];
		//return true;
	}
	else if (input.slice(0,5) == "false"){
	    return [true, input.slice(5)];
	    //return false;	
	}
	else{
		return null;
	}
}

//console.log(boolParser('true, 12'));

 function stringParser(input){
 	if(input.slice(0,1) == "\""){
 	var n = input.indexOf('"');
 	var n1 = input.indexOf('"',parseInt(n+1));
    var temp = input.slice(n,n1+1);
    temp = temp.replace(/\"/g, "");
    var temp1 = input.slice(n1+1);
     return [temp, temp1];
    }
    else{
    	return null;
    }
     // return input.replace(/\"/g, "");

 }
//console.log(stringParser('"abc", 12'));
//console.log(stringParser('12,"rahul"'));

function numberParser(inp) {
	if (inp.match(/^[-+]?(\d+(\.\d*)?|\.\d+)([e][+-]?\d+)?/i)){
            var temp = inp.match(/^[-+]?(\d+(\.\d*)?|\.\d+)([e][+-]?\d+)?/i)[0];
            var indx = temp.length;
            var num = parseFloat(inp.slice(0,indx));
            // if(in)
            return [num, inp.slice(indx)];
        } 
        else return null;
    
    return null;
}
function arrayParser(input){
 	if(input.slice(0,1) == '['){
 		var arr = [];
        input = input.slice(1);
 		while(input.length >0 && input.slice(0,1) != ']'){
 			if (input.slice(0,1) == ',') {
        		input = input.slice(1);
        	}
        	if (input.slice(0,1) == '[') {
        		var index =   input.indexOf('[');
        		var index1 = input.indexOf(']');
 				arr.push(arrayParser(input.slice(index,index1+1)));
                input = input.slice(index1+1);
            }
            else if (input.slice(0,1) == '{'){
            	var index =   input.indexOf('{');
        		var index1 = input.indexOf('}');
 				arr.push(objectParser(input.slice(index,index1+1)));

                input = input.slice(index1+1);
            }
            else{
                if(input == null){
                    return null
                }
                else{
                   var parsed = parseLiteral(input);
                   arr.push(parsed[0]);
        	       input = parsed[1];
                }
            }
        }
        return arr;
    }  
    else 
        return null;
}

function objectParser(input){
	if( input.slice(0,1) == '{'){
		var obj = {};
		input = input.slice(1);
		while (input.length > 0 && input.slice(0,1) != '}'){
			if (input.slice(0,1) == ',') {
        		input = input.slice(1);
            }
            var index = input.indexOf(':');
            var key = stringParser(input.slice(0,index))[0];
          //  console.log(key)
            var rem = input.slice(index+1);

          //  console.log(index);
            if(rem.slice(0,1) == '['){
                 var index1 = rem.indexOf(']')
                 var value = arrayParser(rem.slice(0,index1+1));
                 obj[key] = value 
                 input = rem.slice(index1 + 1);
            	
            }
            else if (rem.slice(0,1) == '{'){
                var index1 = rem.indexOf('}')
                var value = objectParser(rem.slice(0,index1+1));
                obj[key] = value; 
                input = rem.slice(index1 + 1);
            }
            else{
            	if(rem == null){
            		return null
            	}
            	else{
            	    var parsed = parseLiteral(rem);
                    obj[key] = parsed[0];
        	        input = parsed[1];
            	}
            }

		}
	}
	return obj;
}




function parseLiteral(input) {
    input = input.replace(/\s/g,"").replace(/\n/g,"");
	if (arrayParser(input)){
		return arrayParser(input);
	}
	if (objectParser(input)){
		return objectParser(input);
	}
	if (nullParser(input)){
		return nullParser(input);
	}
	if (boolParser(input)){
		return boolParser(input);
	}
	if (numberParser(input)){
		return numberParser(input);
	}
	else {
		return stringParser(input);
	}

}

// var j = {
//     "glossary": {
//         "title": "example glossary",
// 		"GlossDiv": {
//             "title": "S",
// 			"GlossList": {
//                 "GlossEntry": {
//                     "ID": "SGML",
// 					"SortAs": "SGML",
// 					"GlossTerm": "Standard Generalized Markup Language",
// 					"Acronym": "SGML",
// 					"Abbrev": "ISO 8879:1986",
// 					"GlossDef": {
//                         "para": "A meta-markup language, used to create markup languages such as DocBook.",
// 						"GlossSeeAlso": ["GML", "XML"]
//                     },
// 					"GlossSee": "markup"
//                 }
//             }
//         }
//     }
// }
var another = {"a": {"b":{"c":"rhythm"},"d":"hello"}};
//var another = [1,2,[3,4],"rhythm",{"x":33}];

console.log(JSON.stringify(parseLiteral(JSON.stringify(another))));

//console.log(JSON.stringify(JSON.parse(JSON.stringify(j))));
//console.log(parseLiteral(v));
//console.log(parseLiteral('[2,{"abc":[]}]'));
