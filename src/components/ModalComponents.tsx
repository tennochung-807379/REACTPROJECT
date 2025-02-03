import { useState } from "react";
import useTodoStore from "../Store/store";
import { Modal, Button } from "react-bootstrap";

function ModalComponents() {
  const [show, setShow] = useState(false);
  const { addTodo } = useTodoStore(); // 使用 Zustand 的 `addTodo`

  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") return;
    addTodo(task);
    setTask(""); // 清空輸入框
    setShow(false); // 關閉模態視窗
  };

  return (
    <>
      <button onClick={() => setShow(true)} className="btn btn-primary" style={{ marginLeft: "10px" }}>
        新增(模糊視窗)
      </button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>新增資料</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={task}
            onChange={(e) => setTask(e.target.value)}
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