import { Link } from 'react-router-dom'
import './GameMode.css'

export const GameModePage = () => {
  return (
    <div className="gamemode">
      <div className='gamemode-selector'>
        <Link className='gamemode-left' to='/guess'>
          <p className='gamemode-text'>Guest<br/>Movie</p>
        </Link>
        <Link className='gamemode-right' to='/suggest'>
          <p className='gamemode-text'>Suggest<br/>Movie</p>
        </Link>
      </div>
    </div>
  )
}