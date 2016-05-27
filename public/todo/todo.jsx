var TodoForm = require('./todo_form.jsx')
var TodoList = require('./todo_list.jsx')

var Todo = React.createClass({
    getInitialState: function () {
        return { data: [] }
    },
    handleTodoSubmit: function (todo) {
        var todos = this.state.data
        todo.id = Date.now()
        this.setState({ data: todos.concat([todo]) })
        this.sendNewTodoToServer(todo)
    },
    handleCheckChange: function (id) {
        console.log('change', id, this.state.data);
        var state = this.state.data.map((todo) => {
            if( todo.id === id) {
                todo.checked = !todo.checked
            } else {
                todo.checked = !!todo.checked
            }
            return todo
        })
        this.setState({ data: state })
        state.filter( (todo) => todo.id === id).forEach( this.updateTodoOnServer )
    },
    loadTodosFromServer: function () {
        console.log('server', 'todos')
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'GET',
            cache: false,
            success: (data) => {
                this.setState({ data })
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString())
            }
        })
    },
    updateTodoOnServer: function(todo) {
      $.ajax({
            url: this.props.url,
            dataType: 'json',
            headers: { "Content-Type": "application/json"},
            type: 'PUT',
            data: JSON.stringify(todo),
            cache: false,
            success: (data) => {
                //this.setState({ data })
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString())
            }
        })
    },
    sendNewTodoToServer: function (todo) {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: todo,
            cache: false,
            success: (data) => {
                this.setState({ data })
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString())
            }
        })
    },
    componentDidMount: function () {
        this.loadTodosFromServer()
        setInterval(this.loadTodosFromServer, this.props.pollInterval || 500000)
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
    <Todo url="/api/todos"/>,
    document.getElementById('content')
);