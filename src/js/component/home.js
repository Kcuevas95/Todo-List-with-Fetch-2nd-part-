import React from "react";
import { useState, useEffect } from "react";
import { getTodos, createTodos, updateTodos } from "./api";

export function Home() {
	const [task, setTask] = useState("");
	const [variable, setVariable] = useState([
		// "Do Homework",
		// "Do Laundry",
		// "Walk the Dog"
	]);

	//This is the trick on how you use async/await inside a useEffect

	useEffect(() => {
		const fn = async () => {
			let todos = await getTodos();
			if (todos === null) {
				await createTodos();
				todos = await createTodos();
			}
			setVariable(todos.map(x => x.label));
		};
		fn();
	}, []);

	useEffect(() => {
		const newFn = async () => {
			await updateTodos(variable.map(x => ({ label: x, done: false })));
		};
		newFn();
	}, [variable]);

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
		// console.log(onKeyDownEvent);
		if (onKeyDownEvent.keyCode === 13) {
			const newTodo = [...variable, task];
			setVariable(newTodo);
			setTask("");
		}
	};

	// let test = () => {
	// 	if (todo() < 0) {
	// 		<li className="list-group-item item">
	// 			No Message
	// 			<div className="mouseOver" style={{ float: "right" }}>
	// 				X
	// 			</div>
	// 		</li>;
	// 	} else {
	// 		todo();
	// 	}
	// };
	return (
		<div>
			<h1 className="title">TODOS</h1>

			<div>
				<input
					className="list-group-item input"
					onKeyDown={newTodo}
					value={task}
					onChange={e => setTask(e.target.value)}
					type="text"
					id="fname"
					placeholder="Task"
					name="fname"></input>
				<div>
					{variable.length > 0 ? (
						<ul>{todo}</ul>
					) : (
						<ul>
							<li className="list-group-item item">No Tasks</li>
						</ul>
					)}
					<div className="list-group-item footer">
						{todo.length} item left
					</div>
				</div>
			</div>
		</div>
	);
}
