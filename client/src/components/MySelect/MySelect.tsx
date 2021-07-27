import { FC } from 'react'
import s from './MySelect.module.css'


type MySelect = {
   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
   value: string
   options: string[]
   label?: string
}

const MySelect: FC<MySelect> = ({ onChange, value, options, label = null }) => {
   return (<>
      {label && <div className={s.label}>{label}</div>}
      <select onChange={onChange}  value={value} className={s.select}>
         {options.map(d => <option value={d} key={d}>{d}</option>)}
      </select></>
   )
}


export default MySelect
