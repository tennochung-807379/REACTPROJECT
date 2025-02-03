import { create } from "zustand";

type Todo = {
  id: number;
  text: string;
};

type TodoStore = {
  todos: Todo[];
  userInput: string;
  editingId: number | null;
  setUserInput: (text: string) => void;
  addTodo: (text: string) => void;
  deleteTodo: (id: number) => void;
  startEditing: (id: number, text: string) => void;
  saveEdit: () => void;
};

const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build a Todo App" },
    { id: 3, text: "Practice TypeScript" },
  ],
  userInput: "",
  editingId: null,

  setUserInput: (text) => set({ userInput: text }),

  addTodo: (text) =>
    set((state) => ({
      todos: [{ id: Date.now(), text }, ...state.todos],
      userInput: "",
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  startEditing: (id, text) =>
    set({ editingId: id, userInput: text }),

  saveEdit: () =>
    set((state) => {
      if (state.editingId === null) return state;
      return {
        todos: state.todos.map((todo) =>
          todo.id === state.editingId ? { ...todo, text: state.userInput } : todo
        ),
        editingId: null,
        userInput: "",
      };
    }),
}));

export default useTodoStore;