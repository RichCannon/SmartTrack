import { FC, useRef, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import SimpleReactValidator from 'simple-react-validator';

import MyButton from '../../components/MyButton/MyButton'
import StuffCard from '../../components/StuffCard/StuffCard'
import { UserT, GetByRolePayload, GET_USER_BY_ROLE } from '../../graphql/dashboard'
import s from './StuffPage.module.scss'
import { ErrorValidateT, RoleT } from '../../types/types'
import Preloader from '../../components/Preloader/Preloader'
import Modal from '../../components/Modal/Modal'
import AddUserModal from '../../components/AddUserModal/AddUserModal'
import {
   ByRoleResponseStuff, CreateUserPayload, CreateUserResponse,
   CREATE_USER, DeleteUserPayload, DeleteUserResponse, DELETE_USER,
   UpdateUserPayload, UpdateUserResponse, UPDATE_USER,
   USER_BY_ROLE_STUFF_PAGE
} from '../../graphql/stuff'
import { OptionsT } from '../../components/MySelect/MySelect'


type RouteT = `Doctors` | `Assistans` | `Receptionist`

const routes: RouteT[] = [`Doctors`, `Assistans`, `Receptionist`]

type VariableRolesT = {
   "Doctors": RoleT
   "Assistans": RoleT
   "Receptionist": RoleT
}

const roles: RoleT[] = [`assistan`, `doctor`, `receptionist`]


const variableRoles: VariableRolesT = {
   "Doctors": `doctor`,
   "Assistans": `assistan`,
   "Receptionist": `receptionist`
}

const initError = {
   email: null,
   specialization: null,
   phoneNum: null,
   name: null,
}



const StuffPage: FC = () => {

   const { current: validate } = useRef(new SimpleReactValidator())
   const [errors, setErrors] = useState<ErrorValidateT>(initError)
   const [route, setRoute] = useState<RouteT>(`Doctors`)

   const [email, setEmail] = useState(``)
   const [name, setName] = useState(``)
   const [role, setRole] = useState<RoleT>(variableRoles[route])
   const [phoneNum, setPhoneNum] = useState(`+380`)
   const [specialization, setSpecialization] = useState<string | null>(null)
   const [currentEditId, setCurrentEditId] = useState(``)

   const clearState = () => {
      setEmail(``)
      setName(``)
      setRole(variableRoles[route])
      setPhoneNum(`+380`)
      setSpecialization(null)
      setCurrentEditId(``)

   }

   const [isVisible, setIsVisible] = useState(false)

   const { loading, data } = useQuery<ByRoleResponseStuff, GetByRolePayload>(USER_BY_ROLE_STUFF_PAGE, {
      variables: { role: variableRoles[route] }
   })



   const onCreateUserComplete = () => {
      clearState()
      setIsVisible(false)
   }

   const onDeleteUserCompleted = () => {

   }

   const onUpdateUserComplete = onCreateUserComplete

   const [deleteUser, { loading: deleteUserLoading }] = useMutation<DeleteUserResponse, DeleteUserPayload>(DELETE_USER, {
      onCompleted: onDeleteUserCompleted
   })

   const [createUser, { loading: createUserLoading }] = useMutation<CreateUserResponse, CreateUserPayload>(CREATE_USER, {
      onCompleted: onCreateUserComplete
   })


   const [updateUser, { loading: updateUserLoading }] = useMutation<UpdateUserResponse, UpdateUserPayload>(UPDATE_USER, {
      onCompleted: onUpdateUserComplete
   })



   const onEmailChange = (value: string) => {
      if (errors[`email`]) {
         setErrors({ ...errors, email: null })
      }
      setEmail(value)
   }

   const onPhoneNumChange = (value: string) => {
      if (errors[`phoneNum`]) {
         setErrors({ ...errors, phoneNum: null })
      }
      setPhoneNum(value)
   }

   const onNameChange = (value: string) => {
      if (errors[`name`]) {
         setErrors({ ...errors, name: null })
      }
      setName(value)
   }

   const onRoleChange = (payload: OptionsT | null) => {
      if (payload) {
         setRole(payload.value as RoleT)
      }
   }

   const onSpecializationChange = (value: string) => {
      if (errors[`specialization`]) {
         setErrors({ ...errors, specialization: null })
      }
      setSpecialization(value)
   }


   const onButtonClick = () => {
      setIsVisible(true)
   }


   const onEditClick = (payload: UserT) => {
      setIsVisible(true)
      setEmail(payload.email)
      setRole(variableRoles[route])
      setName(payload.name)
      setPhoneNum(payload.phoneNum)
      if (payload.specialization) {
         setSpecialization(payload.specialization)
      }
      setCurrentEditId(payload._id)
   }

   const onDeleteClick = (_id: string) => {
      const areYouSure = window.confirm(`Are you sure?`)
      if (areYouSure) {
         deleteUser({
            variables: { _id },
            refetchQueries: [{ query: GET_USER_BY_ROLE, variables: { role } }]
         })
      }

   }

   const onDoctorClick = () => {

   }



   const onSaveClick = () => {

      const payload = { email, phoneNum, name, role, specialization }

      validate.message(`email`, email, `required|email`)
      validate.message(`name`, name, `required|min:4|max:15`)
      validate.message(`phoneNum`, phoneNum, `required|phone`)
      if (role === `doctor`) {
         validate.message(`specialization`, specialization, `required`)
      }

      if (validate.allValid()) {
         if (currentEditId) {
            updateUser({
               variables: {
                  data: {
                     _id: currentEditId, ...payload
                  }
               },
               refetchQueries: roles.map(role => ({ query: GET_USER_BY_ROLE, variables: { role } }))
            })
         }
         else {
            createUser({
               variables: {
                  data: payload
               },
               refetchQueries: [{ query: GET_USER_BY_ROLE, variables: { role } }]
            })
         }
      }
      else {
         setErrors(validate.getErrorMessages())
      }
   }

   console.log(errors)

   const onChangeRoute = (route: RouteT) => {
      setRoute(route)
      setRole(variableRoles[route])
   }


   const onDismissClick = () => {
      clearState()
      setIsVisible(false)
   }


   return (
      <div className={s.container}>
         {isVisible &&
            <Modal onDismissClick={onDismissClick}>
               <AddUserModal
                  errors={errors}
                  specialization={specialization}
                  onSpecializationChange={onSpecializationChange}
                  email={email}
                  name={name}
                  phoneNum={phoneNum}
                  role={role}
                  onEmailChange={onEmailChange}
                  onPhoneNumChange={onPhoneNumChange}
                  onNameChange={onNameChange}
                  onRoleChange={onRoleChange}
                  onSaveClick={onSaveClick}
                  isLoading={createUserLoading}
               />
            </Modal>
         }
         <div className={s.routeAndButton}>
            <div className={s.routeWrapper}>
               {routes.map((d, idx) => (
                  <div key={`ROUTE_${idx}`} onClick={() => onChangeRoute(d)} className={`${s.routeTab} ${route === d ? s.routeTabActive : ``}`}>
                     <div>{d}</div>
                     {route === d && <div className={s.underLine} />}
                  </div>
               ))}
            </div>
            <MyButton label={`Add new`} onButtonClick={onButtonClick} className={s.button} labelClassName={s.buttonText} />
         </div>
         {loading
            ? <Preloader />
            : <div className={s.content}>
               <div>
                  {data && data?.getByRole.map((d, idx) => (
                     <div key={`STUFF_CARD_${idx}`} className={s.stuffCard}>
                        <StuffCard
                           onDoctorClick={route === `Assistans` ? onDoctorClick : undefined}
                           onDeleteClick={() => onDeleteClick(d._id)}
                           onEditClick={() => onEditClick(d)}
                           number={idx + 1}
                           name={d.name}
                           email={d.email}
                           phoneNum={d.phoneNum}
                           rooms={route !== `Doctors` ? null : d.docRooms}
                        />
                     </div>)
                  )}
               </div>
            </div>}
      </div>
   )
}

export default StuffPage



   // const stuffdata = [
   //    {
   //       name: `Alex Sample2`,
   //       email: `frontdesk@gmail.com`,
   //       phoneNum: `0959423146`,
   //       rooms: [`1a`, `1b`, `3f`],
   //       statuses: [`red`, `yellow`, `blue`]

   //    },
   //    {
   //       name: `Alex Sample2`,
   //       email: `frontdesk2@gmail.com`,
   //       phoneNum: `0959423146`,
   //       rooms: [`1a`, `1b`, `3f`],
   //       statuses: [`red`, `yellow`, `blue`]

   //    },
   //    {
   //       name: `Alex Sample3`,
   //       email: `frontdesk3@gmail.com`,
   //       phoneNum: `0959423146`,
   //       rooms: [`1a`, `1b`, `3f`],
   //       statuses: [`red`, `yellow`, `blue`]

   //    },
   // ]
