import {h} from 'react-markup'

const Todo = React.createClass({
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
            h('div.todo',
                h('input', {type:"checkbox", value:this.props.id, checked:this.state.checked,onChange:this.handleCheckChange}),
                h('span', this.props.children)
            )
        )
    }
})

const TodoList = React.createClass({
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
                h(Todo, {key:todo.id,id:todo.id, selected:todo.checked, onCheckChange:this.handleCheckChange},
                    todo.text
                )
            )
        })
        return (
            h('div.todoList',
                todoNodes
            )
        )
    }
})

module.exports = TodoList