import { FC } from 'react'

import MyButton from '../MyButton/MyButton'
import MyInput from '../MyInput/MyInput'
import s from './AddRoomModal.module.css'


type AddRoomModalP = {
   roomName: string
   onRoomNameChange: (value: string) => void
   onSaveClick: () => void
   isLoading: boolean
}

const AddRoomModal: FC<AddRoomModalP> = ({ roomName, isLoading, onRoomNameChange, onSaveClick }) => {
   return (
      <div className={s.container}>
         <div className={s.title}>{`Add new room`}</div>
         <MyInput errorText={roomName ? null : `Empty`} value={roomName} label={`Name`} onTextChange={onRoomNameChange} />
         <MyButton label={`Save`}
            isLoading={isLoading}
            isDisabled={isLoading || !roomName}
            onButtonClick={onSaveClick}
            className={s.button}
            labelClassName={s.buttonLabel} />
      </div>
   )
}

export default AddRoomModal