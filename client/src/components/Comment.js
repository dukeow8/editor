import React, { Component }from 'react';
import PropTypes from 'prop-types'
import { ListGroupItem } from 'reactstrap';

class Comment extends Component{
    static propTypes = {
        comment: PropTypes.object.isRequired,
        onDeleteComment: PropTypes.func,
        index: PropTypes.number
    }

    constructor () {
        super()
        this.state = {
            timeString: ''
        }
    }
     // Update component state 
    //handle delete button
    handleOnClick() {
        if (this.props.onDeleteComment)
        // "deletecomment" 
            this.props.onDeleteComment(this.props.index)
    }

// ... that takes care of the subscription...
    componentDidMount() {
         // Subscribe to changes
        this._updateTimeString()
        this._timer = setInterval(this._updateTimeString.bind(this), 5000)
    }
    com

    componentDidUnmount() {
        clearInterval(this._timer)
    }

    _updateTimeString() {
        const comment  = this.props.comment
        const duration = (+Date.now() - comment.createdTime) / 1000
        let timeString = ''

        if (duration < 60)
            timeString = Math.round(Math.max(duration, 1)) + (Math.max(duration, 1) === 1 ? ' second ago' : ' seconds ago')
        else
            timeString = Math.round(duration / 60) + (Math.round(duration / 60) === 1 ? ' minute ago' : ' minutes ago')
        this.setState({ timeString })
    }
    render() {
      // renders the component with the fresh data!
      //  pass through any additional props
        const comment = this.props.comment
        return (
            <ListGroupItem tag="a" href="#" action>
                <div className='comment'>
                    <div className='comment-user'>
                        <span className='comment-username'>
                            {comment.username}
                        </span>:
                    </div>
                    <p>{comment.content}</p>
                    <span className='comment-createdTime'>
                        {this.state.timeString}
                    </span>
                    <span className='comment-delete'
                        onClick={this.handleOnClick.bind(this)}>
                        delete
                    </span>
                </div>
            </ListGroupItem>
        )
    }
}

export default Comment