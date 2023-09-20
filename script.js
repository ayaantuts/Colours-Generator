const red = document.querySelector('.red');
const green = document.querySelector('.green');
const blue = document.querySelector('.blue');
const redVal = document.querySelector('.redval');
const greenVal = document.querySelector('.greenval');
const blueVal = document.querySelector('.blueval');
const ranges = document.querySelectorAll('.range');
const inps = document.querySelectorAll('.inputNum');
const box = document.querySelector('.preview-box .box');
const prev_text = document.querySelector('.preview-box .text');
const result = document.querySelector('.hex');
const set = document.querySelector('.set');
const copy = document.querySelector('.copy');
const reset = document.querySelector('.reset');
const copiedOverlay = document.querySelector('.copied-overlay');

var r, g, b;
function updateVal() {
	r = red.value;
	g = green.value;
	b = blue.value;
	redVal.value = r;
	greenVal.value = g;
	blueVal.value = b;
	setbg();
}

function updateR() {
	r = redVal.value;
	g = greenVal.value;
	b = blueVal.value;
	red.value = r;
	green.value = g;
	blue.value = b;
	setbg();
}

function updateAll() {
	redVal.value = r;
	greenVal.value = g;
	blueVal.value = b;
	red.value = r;
	green.value = g;
	blue.value = b;
	setbg();
}

function setbg() {
	box.style.backgroundColor = `rgb(${r},${g},${b})`;
	setClr();
}

function setClr() {
	// prev_text.style.color = `rgb(${r},${g},${b})`;
	document.body.style = `--clr: rgb(${r},${g},${b})`;
	giveResult();
}

function checkIt() {
	if (this.value > 255 || this.value < 0) {
		this.value = '0';
		updateR();
	}
	else updateR();
}

function giveResult() {
	var r_hex, g_hex, b_hex;
	r_hex = padIt(Number(r).toString(16));
	g_hex = padIt(Number(g).toString(16));
	b_hex = padIt(Number(b).toString(16));
	result.value = r_hex + g_hex + b_hex;
}

function padIt(num) {
	return num.padStart(2, '0');
}

ranges.forEach(r => {
	r.addEventListener('input', updateVal);
});

inps.forEach(i => {
	i.addEventListener('input', checkIt);
});

const hexToDec = hex => parseInt(hex, 16);

function convert() {
	var toConvert = result.value.padEnd(6, '0');
	var r_hex = toConvert.substr(0, 2);
	var g_hex = toConvert.substr(2, 2);
	var b_hex = toConvert.substr(4, 2);
	r = hexToDec(r_hex);
	g = hexToDec(g_hex);
	b = hexToDec(b_hex);
	updateAll();
}

set.addEventListener('click', convert);

function resetVals() {
	result.value = Math.random().toString(16).substr(2, 6);
	convert();
}

reset.addEventListener('click', resetVals);
resetVals();

function copyRes() {
	var textToCopy = "#"+result.value;
	copiedOverlay.style.backgroundColor = textToCopy;
	copiedOverlay.classList.add('show');
	window.navigator.clipboard.writeText(textToCopy);
}

copiedOverlay.addEventListener('transitionend', ()=>{copiedOverlay.classList.remove('show');});

copy.addEventListener('click', copyRes);