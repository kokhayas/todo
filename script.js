const fs = require("fs");
const fsPromises = require("fs/promises");

function sync() {
	const buffer = fs.readFileSync("sample.txt");
	console.log(buffer.toString());
}

function callback() {
	fs.readFile("sample.txt", (error, buffer) => {console.log(buffer.toString());});
}

async function asyncAwait() {
	const buffer = await fsPromises.readFile("sample.txt");
	console.log(buffer.toString());
}

console.log("start sync");
sync();
console.log("end sync");

console.log("start callback");
callback();
console.log("end callback");

console.log("start asyncAwait");
asyncAwait();
console.log("end asyncAwait");


function myReadFileAsync(fileName) {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, (error, buffer) => {
		if(error){
			reject(error);
		} else {
			resolve(buffer);
		}
	})
	});
}


async function myAsyncAwait() {
	const buffer = await myReadFileAsync("sample.txt");
	console.log(buffer.toString());
}

console.log("start myAsyncAwait");
myAsyncAwait();
console.log("end myAsyncAwait");