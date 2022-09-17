import React, { useState, useEffect } from "react";


//create your first component
const Home = () => {
	/* const { todos, setTodod } = useState(null); */
	const [addTarea, setAddTarea] = useState([]);

	const getTareas = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ronaldazofeifa")
			.then((resp) => resp.json())
			.then((data) => console.log(data));
	};
	useEffect(() => {
		getTareas();
	}, []);

	function listaTareas(e) {
		if (e.key === "Enter") {
			setAddTarea([...addTarea, e.target.value]);
			e.target.value = "";
		}
	}
	console.log(addTarea);

	const RemoveTodo = index => {
		const newTodos = [...addTarea];
		newTodos.splice(index, 1);
		setAddTarea(newTodos);
	};

	/* 	let tareaPendientes = "";
		if (addTarea.length == 0) {
			tareaPendientes = "No hay tarea pendientes "
		} else {
			tareaPendientes = "Tarea pendientes = ";
		} */

	return (
		<div className="contenedor">
			<h1 className="text-center mt-5">To-do List</h1>
			<div className="contenedor-tareas ">
				<div className="col-4 mx-auto d-flex justify-content-between p-2">
					<input
						type="type"
						className="form-control"
						placeholder="Añadir Tarea"
						aria-label="Recipient's username"
						aria-describedby="basic-addon2"
						onKeyDown={listaTareas}
					/>
				</div>
				<div>
					<div className="list-group col-4 mx-auto d-flex justify-content-between">
						<div>
							<ul>
								{addTarea.map((tarea, index) => (
									<li key={index}>
										{tarea}
										<a
											className="float-end"
											onClick={() => RemoveTodo(index)}>
											<i className="bi bi-x bg-primary text-white"></i>
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div>
					{/* <h4 className="text-center">{tareaPendientes}{addTarea.length}</h4> */}
					<h4 className="text-center">{addTarea.length ? `Tarea pendientes ${addTarea.length}.` : `No hay tarea pendientes`}</h4>
				</div>
			</div>
		</div>
	);
};

export default Home;
