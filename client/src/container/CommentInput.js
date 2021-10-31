import React, { Component }from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import { addComment } from '../reducer/comments'
import CommentInput from "../components/CommentInput"


// init and add comments
class CommentInputContainer extends Component{
    static propTypes = {
        comments: PropTypes.array,
        onSubmit: PropTypes.func
    }

    constructor () {
        super()
        this.state = {
            username: ''
        }
    }


    handleOnsubmit(comment) {
        if (!comment) return
        if (!comment.username) return alert("Please enter username!")
        if (!comment.content) return alert("Please enter content!")
        let newComments = [...this.props.comments, comment]
        localStorage.setItem("comments", JSON.stringify(newComments))
        this.props.onSubmit(comment)

    }
    componentDidMount() {
        this._loadUsername()
    }

    handleOnUsernameOnBlur(username) {
        localStorage.setItem("username", username)
    }

    _loadUsername() {
        const username = localStorage.getItem("username")
        if (username)
            this.setState({ username })
    }

    render() {
        return (
            <CommentInput
                onSubmit={this.handleOnsubmit.bind(this)}
                OnUsernameOnBlur={this.handleOnUsernameOnBlur.bind(this)}
                username={this.state.username}
            />
        )
    }
}


const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}


const mapDispatchProps = (dispatch) => {
    return {
        onSubmit: (comment) => dispatch(addComment(comment))
    }
}


export default connect(mapStateToProps, mapDispatchProps)(CommentInputContainer)