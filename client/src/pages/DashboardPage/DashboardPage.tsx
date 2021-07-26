
import { useQuery } from '@apollo/client'

import DashboardCard from '../../components/DashboardCard/DashboardCard'
import Preloader from '../../components/Preloader/Preloader'
import { GetByRoleResponse, GetByRolePayload, GET_USER_BY_ROLE } from '../../graphql/dashboard'
import s from './DashboardPage.module.css'


const DashboardPage = () => {

   const { loading, error, data } = useQuery<GetByRoleResponse, GetByRolePayload>(GET_USER_BY_ROLE, {
      variables: { role: `doctor` }
   })


   return (
      <div className={s.container}>
         {loading
            ? <Preloader />
            : data
               ? data.getByRole.map((d, idx) => <DashboardCard key={`DashboardCard_${idx}`} {...d} />)
               : []
         }
      </div>
   )
}

export default DashboardPage