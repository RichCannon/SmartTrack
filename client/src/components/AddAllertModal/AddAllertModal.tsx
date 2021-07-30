import { FC } from 'react'

import CrossIcon from '../DndRoomCard/assets/CrossIcon'
import MyButton from '../MyButton/MyButton'
import MyInput from '../MyInput/MyInput'
import s from './AddAllertModal.module.css'


type AddAllertModalP = {
   onSaveClick: () => void
   colors: string[]
   clickedColor: string | null
   onColorClick: (color: string) => void
   onTextChange: (value: string) => void
   onCrossClick: () => void
   colorName: string
   isLoading?: boolean
}

const AddAllertModal: FC<AddAllertModalP> = ({
   onSaveClick, colors, clickedColor,
   colorName, onColorClick, onTextChange,
   onCrossClick, isLoading
}) => {
   return (
      <div className={s.container}>
         <div className={s.cross}>
            <div onClick={onCrossClick}>
               <CrossIcon />
            </div>
         </div>
         <div className={s.title}>
            {`Add Allert`}
         </div>
         <MyInput label={`Name`} value={colorName} onTextChange={onTextChange} />
         <div className={s.colorTitle}>{`Color`}</div>
         <div className={s.circlesContainer}>
            {colors.map((d, idx) => (
               <div key={`COLOR_${idx}`} className={s.circleWrapper}>
                  <div onClick={() => onColorClick(d)}
                     style={{ backgroundColor: `${d}33`, border: `2px solid ${d}`, transform: clickedColor === d ? `scale(1.2)` : `scale(1)` }}
                     className={s.circle} />
               </div>
            ))}
         </div>

         <MyButton isLoading={isLoading} isDisabled={isLoading}
            label={`Save`} onButtonClick={onSaveClick} className={s.button}
            labelClassName={s.buttonLabel} />

      </div>
   )
}

export default AddAllertModal