/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** multi main ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./public/index.html */1);
	module.exports = __webpack_require__(/*! ./public/scripts/tutorial21_commentbox.jsx */2);


/***/ },
/* 1 */
/*!***************************!*\
  !*** ./public/index.html ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <title>React Tutorial</title>\n    <!-- Not present in the tutorial. Just for basic styling. -->\n    <link rel=\"stylesheet\" href=\"css/base.css\" />\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.js\"></script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.js\"></script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.16/browser.js\"></script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js\"></script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js\"></script>\n  </head>\n  <body>\n    <div id=\"content\"></div>\n    <!--<script type=\"text/babel\" src=\"scripts/example.js\"></script>-->\n    <script src=\"./public/scripts/tutorial21_commentbox.jsx\"></script>\n  </body>\n</html>\n";

/***/ },
/* 2 */
/*!**************************************************!*\
  !*** ./public/scripts/tutorial21_commentbox.jsx ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var components = __webpack_require__(/*! ./tutorial21_components.jsx */ 3);
	
	var CommentBox = React.createClass({
	    displayName: 'CommentBox',
	
	    getInitialState: function getInitialState() {
	        return { data: [] };
	    },
	    loadCommentsFromServer: function loadCommentsFromServer() {
	        $.ajax({
	            url: this.props.url,
	            dataType: 'json',
	            cache: false,
	            success: function (data) {
	                this.setState({ data: data });
	            }.bind(this),
	            error: function (xhr, status, err) {
	                console.error(this.props.url, status, err.toString());
	            }.bind(this)
	        });
	    },
	    handleCommentSubmit: function handleCommentSubmit(comment) {
	        var comments = this.state.data;
	        comment.id = Date.now();
	        this.setState({ data: comments.concat([comment]) });
	        $.ajax({
	            url: this.props.url,
	            dataType: 'json',
	            type: 'POST',
	            data: comment,
	            cache: false,
	            success: function (data) {
	                this.setState({ data: data });
	            }.bind(this),
	            error: function (xhr, status, err) {
	                this.setState({ data: comments });
	                console.error(this.props.url, status, err.toString());
	            }.bind(this)
	        });
	    },
	    componentDidMount: function componentDidMount() {
	        this.loadCommentsFromServer();
	        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'commentBox' },
	            React.createElement(
	                'h1',
	                null,
	                'Comments'
	            ),
	            React.createElement(CommentList, { data: this.state.data }),
	            React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
	        );
	    }
	});
	ReactDOM.render(React.createElement(CommentBox, { url: '/api/comments', pollInterval: 20000 }), document.getElementById('content'));

/***/ },
/* 3 */
/*!**************************************************!*\
  !*** ./public/scripts/tutorial21_components.jsx ***!
  \**************************************************/
/***/ function(module, exports) {

	'use strict';
	
	var CommentList = React.createClass({
	    displayName: 'CommentList',
	
	    render: function render() {
	        var commentNodes = this.props.data.map(function (comment) {
	            return React.createElement(
	                Comment,
	                { author: comment.author, key: comment.id },
	                comment.text
	            );
	        });
	        return React.createElement(
	            'div',
	            { className: 'commentList' },
	            commentNodes
	        );
	    }
	});
	
	var CommentForm = React.createClass({
	    displayName: 'CommentForm',
	
	    getInitialState: function getInitialState() {
	        return { author: '', text: '' };
	    },
	    handleAuthorChange: function handleAuthorChange(e) {
	        this.setState({ author: e.target.value });
	    },
	    handleTextChange: function handleTextChange(e) {
	        this.setState({ text: e.target.value });
	    },
	    handleSubmit: function handleSubmit(e) {
	        e.preventDefault();
	        var author = this.state.author.trim();
	        var text = this.state.text.trim();
	        if (!author | !text) return;
	        this.props.onCommentSubmit({ author: author, text: text });
	        this.setState({ author: '', text: '' });
	        return false;
	    },
	    render: function render() {
	        return React.createElement(
	            'form',
	            { className: 'commentForm', onSubmit: this.handleSubmit },
	            React.createElement('input', { type: 'text', placeholder: 'Your name', value: this.state.author, onChange: this.handleAuthorChange }),
	            React.createElement('input', { type: 'text', placeholder: 'Say something...', value: this.state.text, onChange: this.handleTextChange }),
	            React.createElement('input', { type: 'submit', value: 'Post' })
	        );
	    }
	});
	
	var Comment = React.createClass({
	    displayName: 'Comment',
	
	    rawMarkup: function rawMarkup() {
	        var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
	        return { __html: rawMarkup };
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'comment' },
	            React.createElement(
	                'h2',
	                { className: 'commentAuthor' },
	                this.props.author
	            ),
	            React.createElement('span', { dangerouslySetInnerHTML: this.rawMarkup() })
	        );
	    }
	});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map