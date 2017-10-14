import React, { Component } from 'react';

export default class LargeHeader extends Component {
    constructor(props) {
        super(props)
        }


    render () {
        return (
            <div>
                <div className='background-image'>
                    <h1 className='red-text'>Aha!</h1>
                    <h4 className='white-text'>Share your Aha! moments at GA</h4>
                </div>
            </div>
        )
    }
}
