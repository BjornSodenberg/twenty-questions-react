import { Link } from 'react-router-dom'
import {useTranslation} from 'react-i18next';
import './GameMode.css'

const GameModePage = () => {
  const { t } = useTranslation();

  return (
    <div className="gamemode">
      <div className='gamemode-selector'>
        <Link className='gamemode-left' to='/guess'>
          <p className='gamemode-text'>{t('guess')}<br/>{t('movie')}</p>
        </Link>
        <Link className='gamemode-right' to='/suggest'>
          <p className='gamemode-text'>{t('suggest')}<br/>{t('movie')}</p>
        </Link>
      </div>
    </div>
  )
}

export default GameModePage;