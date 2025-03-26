import React from 'react'
import css from '@/style/header.module.css'
import Box from './box/Box'
const Header = () => {
  return (
    <div className={css.warrper}>
        <Box style={{
            height: '100%'
        }}>
            <div className={css.header}>
                Header
                
            </div>
        </Box>
    </div>
  )
}

export default Header
