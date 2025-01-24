import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalComponents from './Modals';

type Todo = {
  id: number | null;
  text: string;
};

function TodoApp() {

  const defaultTodos: Todo[] = [
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build a Todo App" },
    { id: 3, text: "Practice TypeScript" },
  ];


  const initialFormState: Todo = { id: null, text: "" }; // 初始化表單的狀態
  const [user, setUser] = useState(initialFormState); // 使用 `user` 作為表單的狀態
  const [todos, setTodos] = useState<Todo[]>(defaultTodos); // 儲存所有待辦事項
  const [editingId, setEditingId] = useState<number | null>(null); // 編輯中的 ID




  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // 取得輸入框的名稱和值
    setUser({ ...user, [name]: value }); // 更新表單狀態
  };

  const addTodoFromModal = (text: string) => {
    // 從模態視窗新增的待辦事項
    if (text.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text,
    };
    setTodos([newTodo, ...todos]); // 更新列表
  };

  const addTodo = () => {
    if (user.text.trim() === "") return; // 防止加入空內容
    const newEntry: Todo = {
      id: Date.now(), // 使用時間戳作為唯一 ID
      text: user.text,
    };
    setTodos([newEntry, ...todos]); // 新增到待辦事項列表
    setUser(initialFormState); // 重置表單狀態
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id); // 移除目標待辦
    setTodos(updatedTodos);
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id); // 設定當前編輯中的 ID
    setUser({ id, text }); // 將編輯的項目載入表單狀態
  };

  const saveEdit = () => {
    if (editingId === null) return; // 如果沒有編輯目標則直接返回
    const updatedTodos = todos.map((todo) =>
      todo.id === editingId ? { ...todo, text: user.text } : todo // 更新目標待辦
    );
    setTodos(updatedTodos);
    setEditingId(null); // 清除編輯中的 ID
    setUser(initialFormState); // 重置表單
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>React Hook CRUD Example</h1>

      {/* 新增或編輯待辦事項表單 */}
      <div>
        <input
          type="text"
          name="text" // 使用 `name` 對應 `user` 的屬性
          value={user.text}
          onChange={handleInputChange} // 更新表單狀態
          className="InputName"
          style={{ marginRight: '10px' }}
          placeholder={editingId ? "Edit task..." : "Add a new task..."}
        />
        {editingId ? (
          <>
            <button onClick={saveEdit}>儲存</button>
            <button
              onClick={() => {
                setEditingId(null);
                setUser(initialFormState); // 重置表單
              }}
            >
              取消
            </button>
          </>
        ) : (
          <>
          <button onClick={addTodo}>新增</button>
    
          <ModalComponents addTodo={addTodoFromModal} /> {/* 傳遞新增邏輯到模態視窗 */}
          </>
          
        )}
      </div>
      {/* 顯示待辦事項 */}
      <ul style={{marginTop:"10px"}}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "20px" ,textAlign: "left"}}>
            {todo.text}
            <button className="btn btn-primary" onClick={() => startEditing(todo.id!, todo.text)} style={{ marginLeft: "10px" }}>Edit</button>
            <button className="btn btn-danger" onClick={() => deleteTodo(todo.id!)} style={{ marginLeft: "10px" }}>Delete</button>              
          </li>
        ))}
        {!todos ? (
      <div className="spinner-border spinner-border-lg align-center"></div>
    ) : !todos.length ? (
      <div className="p-2">無任何資料</div>
    ) : null}
      </ul>

    
    </div>
  );
}

export default TodoApp;
