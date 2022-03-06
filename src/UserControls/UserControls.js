import React from 'react'
import "./userControls.scss"
import Rock from "../assets/rock.png"
import Paper from "../assets/paper.png"
import Scissors from "../assets/scissors.png"

function UserControls() {
    return (
        <div className='UserControls'>
            <button className='Button'>
            <img className='Image' src={Rock} alt='rock'/>
            </button>
            <button className='Button'>
            <img className='Image' src={Paper} alt='paper'/>
            </button>
            <button className='Button'>
            <img className='Image' src={Scissors} alt='scissors'/>
            </button>
        </div>
    )
}

export default UserControls