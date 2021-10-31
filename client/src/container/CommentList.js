import React, { Component }from 'react';
import PropTypes from 'prop-types'
import CommentList from '../components/CommentList'
import { initComments, deleteComment } from '../reducer/comments'
import {connect} from "react-redux"

class CommentListContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        initComments: PropTypes.func,
        deleteComment: PropTypes.func
    }


    componentDidMount() {
        //this._loadComments()
    }

    _loadComments () {
        let comments = localStorage.getItem("comments")
        comments = comments ? JSON.parse(comments) : []
        this.props.initComments(comments)

    }
    handleOnDeleteComment(index) {
        let { comments } = this.props
        let newComments = [comments.slice(0, index), comments.slice(index + 1)]
        localStorage.setItem('comments', JSON.stringify(newComments))
        if (this.props.deleteComment)
            this.props.deleteComment(index)
    }

    render() {
        return (
            <CommentList
                comments={this.props.comments}
                onDeleteComment={this.handleOnDeleteComment.bind(this)}
            />
        )
    }
}


const mapStateProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        initComments: (comments) => dispatch(initComments(comments)),
        deleteComment: (comment) => dispatch(deleteComment(comment))
    }
}

export default connect(mapStateProps, mapDispatchProps)(CommentListContainer)