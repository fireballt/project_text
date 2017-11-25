$(document).onload = function(){
	console.log("dd");
}
console.log("ready");
var js = $("#jisuan");


var box =[];//显示框

var afterClear = false;//计算之后 

// 刷新显示
 
function show(){
	let value = box.join("");
	$("#input").attr("value",value);
}

//数字检查
function isNumber(str){
	return str.match(/\d/)?1:0;
	
}
// 语法检查

function check(num){
	let flag = true;
	let len = box.length;
	if(len>0){
		if(!isNumber(num)){
			if(!isNumber(box[len-1])){
				flag = false;
			}
		}

	}
	return flag;
}

//数字压入数组

function input (value){
	let len = box.length;
	let num = value;
	console.log(num);
		if(len==0){
			if(isNumber(num)){
				box.push(num);
				afterClear = false;
			}
		}else if (len==1&&afterClear){
				console.log("11");
				if(!isNumber(num)){
					box.push(num);
					afterClear = false;
				}
			} else{
				console.log("nomol");
				if(check(num)){
					if(isNumber(box[len-1])&&isNumber(num)){
						box[len-1] = parseInt(num)+
						parseInt(box[len-1])*10 + '';
					}else{
						box.push(num);
					}
					
				}
			}
			// if(!afterClear){
			// 	box.push(num);
			// }
			// if(len=1&&afterClear){

			// }
		
	console.log(afterClear);
	console.log(box);
}

//数字选择
function chooes(){
	let num = $(this).attr("alt");
	if(num){
	 input(num);
	}
	show();
}
//退一位
function tui(){
	box.pop();
	show();
}

//清空
function clear(){
	box = [];
	box.length = 0;
	afterClear = true;
	show();
}

//总计算
function M (){
	let len = box.length;
	let boxs= box.join('');
	let num = 0;//计算结果
	if(len>0&&isNumber(box[len-1])&&boxs.match(/\D/)){
		num  = count()+'';
		clear();
		box.push(num);
		
	}else{
	console.log("wrong");
	}
	console.log(box);
}

//计算
function count(){
	var numBox = [];
	var logBox = [];
	var lbox = [];
	lbox  = lbox.concat(box);
	
	let num = 0;
	
	let boxs = box.join('');

	for(let i=0;i<lbox.length;i++){
		if(lbox[i]!=' '){
		switch (lbox[i]){
			case "*":
				var a = (numBox.pop()) * (parseFloat(lbox[i+1]));
				lbox[i+1]=' ';
				numBox.push(a);
			break;
			case "/":
				var b = (numBox.pop()) / (parseFloat(lbox[i+1]));
				lbox[i+1]=' ';
				numBox.push(b);
			break;
			case "%":
				console.log("出现 113行未处理 %");
			break;
			case "+":
				logBox.push(lbox[i]);
			break;
			case "-":
				logBox.push(lbox[i]);
			break;
			default:
			numBox.push(parseFloat(lbox[i]));
		}
		}



		// if(isNumber(box[i])){

		// 	numBox.push(box[i]);
		// }else{
		// s
		//  logBox.push(box[i]);	
			
		// }

	}
	for(let z in logBox){
			switch (logBox[z]){
				case "+":
				
					numBox.push(numBox.shift() + numBox.shift());
				break;
				case "-":
					numBox.push(numBox.shift() - numBox.shift());
				break;
			}
		}
		logBox = [];

	num  = numBox[0];

	return num;
}

$(".buttom").on("click",chooes);
$("#CE").on("click",tui);
$("#AC").on("click",clear);
$("#jisuan").on("click",M);




show();