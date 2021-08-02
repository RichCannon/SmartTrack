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

const MySelect: FC<MySelectP> = ({ onChange, value, options, label }) => {

   const optionsR = typeof options[0] === `string` ? options.map(d => ({ value: d, label: d })) : options
   
   const valueR = typeof value === `string` ? { value, label: value } : value

   const customStyles: StylesConfig<OptionsT, IsMulti> = {
      input: () => ({
         flex: 1
      }),
      valueContainer: () => ({
         flex: 1,
         display: 'flex',
         alignItems: `center`
      }),
      control: () => ({
         width: '100%',
         fontFamily: 'Poppins',
         fontStyle: 'normal',
         border: '1px solid #D3D3FF',
         borderRadius: '20px',
         padding: '.3em .6em',
         backgroundColor: 'transparent',
         display: `flex`,
         flex: 1,
         boxSizing: `border-box`
      }),
      indicatorSeparator: () => ({
         display: 'none'
      }),

   }

   return (<>
      {label && <div className={s.label}>{label}</div>}
      <Select
         styles={customStyles}
         defaultValue={valueR}
         onChange={e => onChange(e)}
         options={optionsR as OptionsT[]}
      />
   </>
   )
}


export default MySelect

