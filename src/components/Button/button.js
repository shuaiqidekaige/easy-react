import React from 'react'
import PropTypes from 'prop-types';

class Button extends React.Component {
    render() {
        return (
            <button>
                <span>
                    { this.props.children ? this.props.children : this.props.text }
                </span>
            </button>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string
}


export default Button
