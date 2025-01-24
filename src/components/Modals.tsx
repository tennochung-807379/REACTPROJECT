import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function ModalComponents({ addTodo }: { addTodo: (text: string) => void }) {
  const [show, setShow] = useState(false); // 狀態管理模態顯示/隱藏
  const [task, setTask] = useState({ text: "" }); // 狀態管理輸入框內容

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // 動態取得名稱和值
    setTask({ ...task, [name]: value }); // 更新輸入框內容
  };

  const handleAdd = () => {
    if (task.text.trim() === "") return; // 防止空輸入
    addTodo(task.text); // 呼叫外部函數新增待辦事項
    setTask({ text: "" }); // 重置輸入框
    setShow(false); // 關閉模態
  };

  return (
    <>
      {/* 觸發模態視窗的按鈕 */}
      <button
        onClick={() => setShow(true)}
        className="btn btn-primary"
        style={{ marginLeft: "10px" }}
      >
        新增(模糊視窗)
      </button>

      {/* 模態視窗 */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>新增資料</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name="text"
            className="form-control"
            value={task.text}
            onChange={handleInputChange}
            placeholder="Enter new task"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            取消
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            新增
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponents;