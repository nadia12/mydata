import React from 'react'
import { connect } from 'react-redux'
import MyData from './units'
import { 
  TrashFolderIcon,
  DatasetIcon,
  MyModelIcon,
} from 'volantis-icon'

import {
  setValue,
  setModalShow,
} from './reducer'

import colors from '../../../assets/css/colors'

const DEFAULT_ENTITY = { creatorName: '-', type: 'System Folder', size: '-', updatedAt: '-', status: '-' };


// function mapStateToProps(state) {
//   const cookies = new Cookies()
//   const userData = cookies.get('userdata')

//   return {
//     _mydata
//   }
// }

const mapStateToProps = state => ({
  _mydata: state._mydataList,
  staticFolders: [
    {
      en: { 
        ...DEFAULT_ENTITY, 
        idx: 'my dataset',
        name: 'My Dataset',
      },
      icon: <DatasetIcon color={colors.gold} />,
      isSelected: false,
      handleClick: () => null,
      handleDoubleClick: () => null
    },
    {
      en: { 
        ...DEFAULT_ENTITY, 
        idx: 'my model',
        name: 'My Model'
      },
      icon: <MyModelIcon color={colors.gold} />,
      isSelected: false,
      handleClick: () => null,
      handleDoubleClick: () => null
    },
    {
      en: { 
        ...DEFAULT_ENTITY, 
        idx: 'pretrained model',
        name: 'Pre-Trained Model',
      },
      icon: <MyModelIcon color={colors.gold} />,
      isSelected: false,
      handleClick: () => null,
      handleDoubleClick: () => null
    },
    {
      en: { 
        ...DEFAULT_ENTITY,
        idx: 'my trash',
        name: 'Trash'
      },
      icon: <TrashFolderIcon color={colors.gold} />,
      isSelected: false,
      handleClick: () => null,
      handleDoubleClick: () => null
    }
  ]
})

const mapDispatchToProps = dispatch => ({
  handleAddNewData() {
    dispatch(setModalShow('menubar', true))
  },
  // renderMouseLeave() {
  //   dispatch(setModalShow('menubar', false))
  //   document.getElementById('mouse-leave').style.display = 'none'
  // }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyData)
