import {h} from 'react-markup'

const TodoForm = React.createClass({
    getInitialState: function () {
        return { checked: false, text: '' };
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var text = this.state.text.trim()
        if (!text) return
        this.props.onSubmit({ text })
        this.setState({ text: '' })
        return false
    },
    handleTextChange: function (e) {
        this.setState({ text: e.target.value, checked: false });
    },
    render: function () {
        return (
            h('form.todoForm', {onSubmit:this.handleSubmit},
                h('input', {type:"text", placeholder:"Task description", value:this.state.text, onChange: this.handleTextChange}),
                h('input', {type:"submit", value:"Post"})
            )
        )
    }
})

module.exports = TodoForm