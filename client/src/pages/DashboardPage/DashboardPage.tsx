
import { useQuery } from '@apollo/client'

import DashboardCard from '../../components/DashboardCard/DashboardCard'
import { GetAllDoctorsResponse, GET_ALL_DOCTORS } from '../../graphql/dashboard'
import s from './DashboardPage.module.css'


const DashboardPage = () => {

   const { loading, error, data } = useQuery<GetAllDoctorsResponse>(GET_ALL_DOCTORS)

   return (
      <div className={s.container}>
         {loading
            ? `Loading...`
            : data
               ? data.getAllDoctors.map((d, idx) => <DashboardCard key={`DashboardCard_${idx}`} {...d} />)
               : []
         }
      </div>
   )
}

export default DashboardPage