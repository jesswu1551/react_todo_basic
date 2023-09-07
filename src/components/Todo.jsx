import Swal from 'sweetalert2'

function Todo({todos, currTodos, setTodos}) {
  const toggleStatus = (id) => {
    let newtodoList = todos.map(todo => {
      return todo.id === id ? { ...todo, status: !todo.status } : {...todo};
    });
    setTodos(newtodoList);
  }

  const deleteTodo = (id) => {
    let newtodoList = todos.filter(todo => {
      return todo.id !== id;
    });
    setTodos(newtodoList);
  }

  const clearTodo = () => {
    const completedTodos = todos.filter(todo => todo.status);
    if (completedTodos.length === 0) {
      return alert("目前並無已完成待辦");
    }

    const newTodoList = todos.filter(todo => !todo.status);

    Swal.fire({
      title: '確定清除已完成項目?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '是',
      cancelButtonText: '否'
    }).then(function (result) {
      if (!result.isConfirmed) { return; }
      setTodos(newTodoList);
      Swal.fire({
        title: '清除項目成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
      });
    });
  }

  return (
    <>
    <div className="todoList_items">
      <ul className="todoList_item">
        {
          currTodos.map(todo => {
          return (
          <li key={todo.id}>
            <label className="todoList_label">
                <input className="todoList_input" type="checkbox" value={todo.status} checked={todo.status}
                        onChange={() => toggleStatus(todo.id)} />
                <span>{todo.content}</span>
              </label>
              <a href="#" onClick={()=>deleteTodo(todo.id)}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </a>
          </li>)
          })
        }
      </ul>
      <div className="todoList_statistics">
        <p> {todos.filter(todo => !todo.status).length} 個待完成項目</p>
        <a href="#" onClick={clearTodo}>清除已完成項目</a>
      </div>
    </div>
    </>
  )
}

export default Todo
