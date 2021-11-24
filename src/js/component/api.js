import { data } from "jquery";
import React, { useState, useEffect } from "react";

//GET todos
export async function getTodos() {
	const response = await fetch(
		"https://assets.breatheco.de/apis/fake/todos/user/kcuevas"
	);

	if (response.status === 200) {
		const payload = await response.json();

		return payload;
	}

	return null;
}

//Create todos
export async function createTodos() {
	await fetch("https://assets.breatheco.de/apis/fake/todos/user/kcuevas", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify([])
	});
}

//Update todos
export async function updateTodos(todos) {
	await fetch("https://assets.breatheco.de/apis/fake/todos/user/kcuevas", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(todos)
	});
}

//Delete todos
export async function deleteTodos() {
	await fetch("https://assets.breatheco.de/apis/fake/todos/user/kcuevas", {
		method: "DELETE"
	});
}
