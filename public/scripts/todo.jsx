var TodoForm = require('./todo_form.jsx')
var TodoList = require('./todo_list.jsx')

var Todo = React.createClass({
    getInitialState: function () {
        return {
            data: [
                { id:1, text: 'test1', checked: true }
                , { id:2, text: 'test2', checked: false }
                , { id:3, text: 'test4', checked: true }
            ]
        }
    },
    handleTodoSubmit: function (todo) {
        var todos = this.state.data
        todo.id = Date.now()
        this.setState({ data: todos.concat([todo]) })
    },
    handleCheckChange: function (id) {
        var state = this.state.data.map((todo) => {
            return Object.assign(todo, {checked: todo.id === id ? !todo.checked : todo.checked})
        })
        this.setState({ data: state })
    },
    render: function () {
        return (
            <div>
                <TodoList data={this.state.data} onCheckChange={this.handleCheckChange}/>
                <TodoForm onSubmit={this.handleTodoSubmit}/>
            </div>
        )
    }
})

ReactDOM.render(
    <Todo />,
    document.getElementById('content')
);