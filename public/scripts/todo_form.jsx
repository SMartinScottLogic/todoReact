var TodoForm = React.createClass({
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
            <form className="todoForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Task description" value={this.state.text} onChange={this.handleTextChange} />
                <input type="submit" value="Post" />
            </form>
        )
    }
})

module.exports = TodoForm