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
