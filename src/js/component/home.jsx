import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
  const [addTarea, setAddTarea] = useState([""]);

  //Metodo get
  const getTareas = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/GreivinRodriguez")
      .then((resp) => resp.json())
      .then((data) => setAddTarea(data));
  };
  useEffect(() => {
    getTareas();
  }, []);

  //Metodo Put
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let cadenaTexto = JSON.stringify(addTarea);
  let Estructura = {
    method: "PUT",
    headers: myHeaders,
    body: cadenaTexto,
    redirect: "follow",
  };

  const putTarea = () => {
    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/GreivinRodriguez",
      {...Estructura}
    )
      .then((response) => response.text())
      .then((result) => console.log(result));
  };

  const listaTareas = (e) => {
    if (e.key === "Enter") {
      setAddTarea([{ label: e.target.value, done: false }, ...addTarea]);
      console.log(addTarea);
      e.target.value = "";
    }
  };
  console.log(addTarea);

  const removeTodo = (index) => {
    const newTodos = [...addTarea];
    newTodos.splice(index, 1);
    if (addTarea.length - 1 === 0) {
      setAddTarea([{ label: "Task Deafault", done: false }]);
    } else {
      setAddTarea(newTodos);
    }
  };
  putTarea();
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
                {addTarea.map((tarea, index) => {
                  return (
                    <li key={index}>
                      {tarea.label}
                      <a
                        className="float-end"
                        onClick={() => removeTodo(index)}
                      >
                        <i className="bi bi-x bg-primary text-white"></i>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-center">
            {addTarea.length
              ? `Tarea pendientes ${addTarea.length}`
              : `No hay tarea pendientes`}
          </h4>
        </div>
      </div>
    </div>
  );
};
export default Home;
