import { FC } from 'react'
import Select, { StylesConfig } from 'react-select';

import s from './MySelect.module.css'

export type OptionsT = {
   value: string, label: string
}

type MySelectP = {
   onChange: (e: OptionsT | null) => void
   value: OptionsT | string | null
   options: OptionsT[] | string[]
   label?: string
}

type IsMulti = false

const MySelect: FC<MySelectP> = ({ onChange, value, options, label = null }) => {
   //@ts-ignore
   const optionsR: OptionsT[] = typeof options[0] === `string` ? options.map(d => ({ value: d, label: d })) : options
   //@ts-ignore
   const valueR: OptionsT = typeof value === `string` ? { value, label: value } : value

   const customStyles: StylesConfig<OptionsT, IsMulti> = {
      input: (provided: any, state: any) => ({
         flex: 1
      }),
      valueContainer: (provided, state) => ({
         flex: 1,
         display: 'flex',
         alignItems: `center`
      }),
      control: (provided, state) => ({
         width: '100%',
         fontFamily: 'Poppins',
         fontStyle: 'normal',
         border: '1px solid #D3D3FF',
         borderRadius: '20px',
         padding: '.5em',
         backgroundColor: 'transparent',
         display: `flex`,
         flex: 1
      }),
      indicatorSeparator: (provided, state) => ({
         display: 'none'
      }),

   }

   return (
      <Select

         styles={customStyles}
         defaultValue={valueR}
         onChange={e => onChange(e)}
         options={optionsR}
      />
   )
}


export default MySelect



{/* <>
      {label && <div className={s.label}>{label}</div>}
      <select onChange={onChange} value={value} className={s.select}>
         {options.map(d => <option value={d} key={d}>{d}</option>)}
      </select>
   </> */}