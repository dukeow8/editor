import React, { Component }from 'react';
import PropTypes from 'prop-types'
import Comment from './Comment'
import { ListGroup, ListGroupItem } from 'reactstrap';

class CommentList extends Component{
    static propTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func
    }

    static defaultProps = {
        comments: []
    }


    handleOnDeleteComment (index) {
        if (this.props.onDeleteComment)
            this.props.onDeleteComment(index)
    }
    render() {
        return (
            <ListGroup className='comment-box' style={{width: '600px'}}>
                <ListGroupItem style={{backgroundColor: '#343a40', color:'white'}} tag="a" href="#" action>Messages</ListGroupItem>
                {this.props.comments.map((comment, i) =>
                    <Comment
                        comment={comment}
                        key={i}
                        index={i}
                        onDeleteComment={this.handleOnDeleteComment.bind(this)} />
                )}
            </ListGroup>
        )
    }
}

export default CommentList