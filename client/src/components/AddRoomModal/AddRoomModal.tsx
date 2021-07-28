import { FC } from 'react'

import MyButton from '../MyButton/MyButton'
import MyInput from '../MyInput/MyInput'
import s from './AddRoomModal.module.css'


type AddRoomModal = {
   roomName: string
   onRoomNameChange: (value: string) => void
   onSaveClick: () => void
   isLoading: boolean
}

const AddRoomModal: FC<AddRoomModal> = ({ roomName, isLoading, onRoomNameChange, onSaveClick }) => {
   return (
      <div className={s.container}>
         <div className={s.title}>{`Add new room`}</div>
         <MyInput value={roomName} label={`Name`} onTextChange={onRoomNameChange} />
         <MyButton label={`Save`}
            isLoading={isLoading}
            isDisabled={isLoading}
            onButtonClick={onSaveClick}
            className={s.button}
            labelClassName={s.buttonLabel} />
      </div>
   )
}

export default AddRoomModal