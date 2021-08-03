import { FC } from 'react'
import { ErrorValidateT } from '../../types/types'

import MyButton from '../MyButton/MyButton'
import MyInput from '../MyInput/MyInput'
import s from './AddRoomModal.module.css'


type AddRoomModalP = {
   roomName: string
   onRoomNameChange: (value: string) => void
   onSaveClick: () => void
   isLoading: boolean
   errors: ErrorValidateT
}

const AddRoomModal: FC<AddRoomModalP> = ({ roomName, isLoading,errors, onRoomNameChange, onSaveClick }) => {
   return (
      <div className={s.container}>
         <div className={s.title}>{`Add new room`}</div>
         <MyInput errorText={errors[`roomName`]} value={roomName} label={`Name`} onTextChange={onRoomNameChange} />
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