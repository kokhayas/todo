const express = require("express");
const fs = require("fs");
const ejs = require("ejs");

const app = express();

const prisma = require("@prisma/client");
client = new prisma.PrismaClient();

const bodyParser = require("body-parser");
const { request } = require("http");

app.use(bodyParser.urlencoded({extended: false}));


const cookieParser = require("cookie-parser");
// const express = require("express");
// const app = express();

app.use(cookieParser());


app.get("/", async (request, response) => {
	const count = parseInt(request.cookies.count) || 0;
	const newCount = count + 1;
	response.cookie("count", newCount.toString());

	const todos = await client.todo.findMany();
	const template = fs.readFileSync("template.ejs").toString();
	const html = ejs.render(template, {todos: todos, newCount: newCount});
	response.send(html);
});

app.post("/", async (request, response) => {
	await client.todo.create({data: {name: request.body.newTodo}});

	const count = parseInt(request.cookies.count) || 0;
	const newCount = count + 1;
	response.cookie("count", newCount.toString());

	const todos = await client.todo.findMany();
	const template = fs.readFileSync("template.ejs").toString();
	const html = ejs.render(template, {todos: todos, newCount: newCount});
	response.send(html);
});

app.get("/form", (request, response) => {
	const html = fs.readFileSync("./form.html").toString();
	response.send(html);
});

app.post("/send", async (request, response) => {
	await client.todo.create({data: {name: request.body.newTodo}});

	// const todos = await client.todo.findMany();
	// const template = fs.readFileSync("template.ejs").toString();
	// const html = ejs.render(template, {todos: todos});
	// response.send(html);
	const html = fs.readFileSync("./sended.html").toString();
	response.send(html);

});

app.get("/erase", async (request, response) => {
	await client.todo.deleteMany();
	const html = fs.readFileSync("./erase.html").toString();
	response.send(html);
})

// app.listen(3000);



// const cookieParser = require("cookie-parser");
// const express = require("express");
// const app = express();

// app.use(cookieParser());

// app.get("/", (request, response) =>{
// 	const count = parseInt(request.cookies.count) || 0;
// 	const newCount = count + 1;
// 	response.cookie("count", newCount.toString());
// 	response.send(`${newCount}???????????????????????????`);
// });


app.listen(3000);
