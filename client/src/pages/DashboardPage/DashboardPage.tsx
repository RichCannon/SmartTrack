
import { useQuery } from '@apollo/client'

import DashboardCard from '../../components/DashboardCard/DashboardCard'
import { GetByRoleResponse, GetByRolePayload, GET_USER_BY_ROLE } from '../../graphql/dashboard'
import { RoleT } from '../../types/types'
import s from './DashboardPage.module.css'


const DashboardPage = () => {

   const { loading, error, data } = useQuery<GetByRoleResponse, GetByRolePayload>(GET_USER_BY_ROLE, {
      variables: { role: `doctor` }
   })

   console.log(data)

   return (
      <div className={s.container}>
         {loading
            ? `Loading...`
            : data
               ? data.getByRole.map((d, idx) => <DashboardCard key={`DashboardCard_${idx}`} {...d} />)
               : []
         }
      </div>
   )
}

export default DashboardPage