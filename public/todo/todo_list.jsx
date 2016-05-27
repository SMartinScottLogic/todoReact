var Todo = React.createClass({
    getInitialState: function() {
        return {
            checked: this.props.selected || false
        }
    },
    handleCheckChange: function(e) {
      this.setState({checked: e.target.checked})
      this.props.onCheckChange( this.props.id )
    },
    render: function () {
        return (
            <div className="todo">
                <input type="checkbox" value={this.props.id} checked={this.state.checked} onChange={this.handleCheckChange}/>
                <span>{this.props.children}</span>
            </div>
        )
    }
})

var TodoList = React.createClass({
    handleCheckChange: function(id) {
      this.props.onCheckChange(id)  
    },
    render: function () {
        console.log('====== Active Todo ======')
        var todoNodes = this.props.data.map((todo) => {
            if(todo.checked) {
                console.log('active', todo.text)
            }
            return (
                <Todo key={todo.id} id={todo.id} selected={todo.checked} onCheckChange={this.handleCheckChange}>
                    {todo.text}
                </Todo>
            )
        })
        return (
            <div className="todoList">
                {todoNodes}
            </div>
        )
    }
})

module.exports = TodoList