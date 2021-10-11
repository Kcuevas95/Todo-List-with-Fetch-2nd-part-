import React from "react";
import { useState, useEffect } from "react";

//include images into your bundle
// import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

export function Home() {
	const [variable, setVariable] = useState([
		"Do Homework",
		"Do Laundry",
		"Walk the Dog"
	]);

	// Setting up useState
	const [listArray, setListArray] = useState([]);

	// URL to use
	const apiURL = "https://assets.breatheco.de/apis/fake/todos/user/kcuevas95";

	// UseEffect for retrieving stored values from database on mount
	useEffect(() => {
		// fetch(apiURL)
		// 	.then(resp => {
		// 		console.log(resp.status);
		// 		if (resp.status >= 200 && resp.status < 300) {
		// 			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		// 		} else {
		// 			alert(
		// 				`This is a client error, its your fault this is a ${resp.status}`
		// 			);
		// 			throw Error(`${resp.ok} ${resp.status}`);
		// 		}
		// 		// console.log(resp.ok); // will be true if the response is successfull
		// 		// console.log(resp.status); // the status code = 200 or code = 400 etc.
		// 	})
		// 	.then(data => {
		// 		//here is were your code should start after the fetch finishes
		// 		// console.log(data); //this will print on the console the exact object received from the server
		// 		setListArray(data);
		// 	})
		// 	.catch(error => {
		// 		//error handling
		// 		console.log("This is an error: ", error);
		// 	});
		initList();
	}, []);

	// UseEffect for updating Todo List array values
	useEffect(() => {
		// fetch(apiURL, {
		// 	method: "PUT", // or 'POST'
		// 	body: JSON.stringify(listArray), // data can be `string` or {object}!
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	}
		// })
		// 	.then(res => res.json())
		// 	.then(response => console.log("Success:", JSON.stringify(response)))
		// 	.catch(error => console.error("Error:", error));
		updateList();
	}, [listArray]);

	/* USING ASYNC */
	const initList = async () => {
		const response = await fetch(apiURL);
		try {
			const data = await response.json();
			setListArray(data);
		} catch (error) {
			throw new Error(error);
		}
	};

	const updateList = async () => {
		const response = await fetch(apiURL, {
			method: "PUT", // or 'POST'
			body: JSON.stringify(listArray), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		});
		try {
			const data = await response.json();
			console.log("Success:", JSON.stringify(data));
		} catch (error) {
			throw new Error(error);
		}
	};

	let todo = variable.map((item, i) => {
		return (
			<li className="list-group-item item" key={i}>
				{item}
				<div
					className="mouseOver"
					style={{ float: "right" }}
					onClick={() => removeItem(i)}>
					X
				</div>
			</li>
		);
	});

	const removeItem = index => {
		// console.log(index);
		const newArray = variable.filter((item, i) => i != index);
		// const newArray = variable.filter((item, i) => {
		// 	if (i != index) {
		// 		return item;
		// 	}
		// });
		setVariable(newArray);
	};

	const newTodo = onKeyDownEvent => {
		console.log(onKeyDownEvent);
		if (onKeyDownEvent.keyCode === 13) {
			let userInput = onKeyDownEvent.target.value;
			const newTodo = [...variable, userInput];
			setVariable(newTodo);
			onKeyDownEvent.target.value = "";
		}
	};

	return (
		<div>
			<h1 className="title">TODOS</h1>

			<div>
				<input
					className="list-group-item input"
					onKeyDown={newTodo}
					type="text"
					id="fname"
					placeholder="Task"
					name="fname"></input>
				<div>
					<ul>{todo}</ul>
					<div className="list-group-item footer">
						{todo.length} item left
					</div>
				</div>
			</div>
		</div>
	);
}
