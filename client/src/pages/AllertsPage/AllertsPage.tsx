
import MyButton from '../../components/MyButton/MyButton'
import StatusCard from '../../components/StatusCard/StatusCard'
import s from './AllertsPage.module.css'



const data = [
   {
      description: `Patient`,
      color: `#74C386`
   },
   {
      description: `Patient2`,
      color: `#74C386`
   },
   {
      description: `Patient3`,
      color: `#74C386`
   },
   {
      description: `Patient4`,
      color: `#74C386`
   },
]


const AllertsPage = () => {

   const onButtonClick = () => {

   }

   const onEditClick = () => {

   }

   return (
      <div className={s.container}>
         <MyButton label={`Add new`}
            onButtonClick={onButtonClick}
            className={s.button}
            labelClassName={s.buttonText} />
         <div className={s.statusCardWrapper}>
            {data.map((d, idx) => (
               <div className={s.statusCard} key={d.description}>
                  <StatusCard
                     idx={idx}
                     description={d.description}
                     color={d.color}
                     onEditClick={onEditClick} />
               </div>
            ))
            }
         </div>
      </div>
   )
}

export default AllertsPage