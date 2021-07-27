import { FC } from 'react'

import { RoleT } from '../../types/types'
import MyButton from '../MyButton/MyButton'
import MyInput from '../MyInput/MyInput'
import MySelect from '../MySelect/MySelect'
import s from './AddUserModal.module.css'

type AddUserModal = {
   email: string
   name: string
   phoneNum: string
   role: string
   specialization: string | null
   onSpecializationChange: (value: string) => void
   onEmailChange: (value: string) => void
   onPhoneNumChange: (value: string) => void
   onNameChange: (value: string) => void
   onRoleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
   onSaveClick: () => void
   isLoading?: boolean
}

const roles: RoleT[] = [`admin`, `assistan`, `doctor`, `receptionist`]

const AddUserModal: FC<AddUserModal> = ({
   email,
   name,
   phoneNum,
   role,
   specialization,
   onSpecializationChange,
   onEmailChange,
   onPhoneNumChange,
   onNameChange,
   onRoleChange,
   onSaveClick,
   isLoading
}) => {
   return (
      <div className={s.container}>
         {/* <div className={s.cross}>
            <div onClick={onCrossClick}>
               <CrossIcon />
            </div>
         </div> */}
         <div className={s.title}>{`Add new user`}</div>
         <MyInput label={`Email`} value={email} onTextChange={onEmailChange} />
         <MyInput label={`Name`} value={name} onTextChange={onNameChange} />
         <MyInput label={`Phone number`} value={phoneNum} onTextChange={onPhoneNumChange} />
         {role === `doctor` && <MyInput label={`Specialization`} value={specialization || ``} onTextChange={onSpecializationChange} />}
         <MySelect label={`Role`} options={roles} value={role} onChange={onRoleChange} />
         <MyButton isLoading={isLoading} isDisabled={isLoading} className={s.button} labelClassName={s.buttonText} onButtonClick={onSaveClick} label={`Save`}/>
      </div>
   )
}

export default AddUserModal