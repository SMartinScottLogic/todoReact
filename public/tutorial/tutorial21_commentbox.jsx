var components = require('./tutorial21_components.jsx')
var CommentList = components.CommentList
var CommentForm = components.CommentForm

var CommentBox = React.createClass({
    getInitialState: function () {
        return { data: [] }
    },
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data })
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        })
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.data
        comment.id = Date.now()
        this.setState({data: comments.concat([comment])})
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            cache: false,
            success: function (data) {
                this.setState({ data })
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({data: comments})
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        })
    },
    componentDidMount: function () {
        this.loadCommentsFromServer()
        setInterval(this.loadCommentsFromServer, this.props.pollInterval)
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        )
    }
})
ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={20000} />,
    document.getElementById('content')
);