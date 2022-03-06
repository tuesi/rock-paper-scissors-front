import React, { useEffect } from 'react'
import './opponent.scss'
import Rock from "../assets/rock.png"
import Paper from "../assets/paper.png"
import Scissors from "../assets/scissors.png"

function Opponent() {
    useEffect(() => {
        const spinValue = document.documentElement;
        console.log(spinValue.style.getPropertyValue('--spin-amount'));
    }, [])

    return (
        <div className='Opponent'>
                <div className='Choice'>
                    <ul>
                        <li><img className='OpponentImage' src={Rock} alt='rock'/></li>
                        <li><img className='OpponentImage' src={Paper} alt='paper'/></li>
                        <li><img className='OpponentImage' src={Scissors} alt='scissors'/></li>
                        <li><img className='OpponentImage' src={Rock} alt='rock'/></li>
                    </ul>
                </div>
        </div>
    )
}

export default Opponent