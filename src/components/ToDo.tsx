import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalComponents from "./ModalComponents";
import useTodoStore from "../Store/store";


function TodoApp() {
  const { todos, userInput, editingId, setUserInput, addTodo, deleteTodo, startEditing, saveEdit } = useTodoStore();

  return (
    <div style={{ padding: "20px" }}>
      <h1>React Hook CRUD Example</h1>

      {/* 新增或編輯待辦事項表單 */}
      <div>
        <input
          type="text"
          name="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="InputName"
          style={{ marginRight: "10px" }}
          placeholder={editingId ? "Edit task..." : "Add a new task..."}
        />
        {editingId ? (
          <>
            <button onClick={saveEdit}>儲存</button>
            <button onClick={() => setUserInput("")}>取消</button>
          </>
        ) : (
          <>
            <button onClick={() => addTodo(userInput)}>新增</button>
            <ModalComponents />
          </>
        )}
      </div>

      {/* 顯示待辦事項 */}
      <ul style={{ marginTop: "10px" }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "20px", textAlign: "left" }}>
            {todo.text}
            <button className="btn btn-primary" onClick={() => startEditing(todo.id, todo.text)} style={{ marginLeft: "10px" }}>Edit</button>
            <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)} style={{ marginLeft: "10px" }}>Delete</button>
          </li>
        ))}
        {!todos.length && <div className="p-2">無任何資料</div>}
      </ul>
    </div>
  );
}

export default TodoApp;


