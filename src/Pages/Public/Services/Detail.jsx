import { Navigate, useParams } from 'react-router-dom'
import { PATHS } from '@/constant/routes'
import { SERVICE_GROUPS, SERVICES } from '@/data/services'
import GroupDetail from './GroupView'
import ServiceDetail from './ServiceView'

/** /services/:slug – the slug is either a group (consulting) or a single service (websites). */
export default function Detail() {
  const { slug } = useParams()
  const group = SERVICE_GROUPS.find((g) => g.id === slug)
  if (group) return <GroupDetail key={slug} group={group} />
  const service = SERVICES.find((s) => s.id === slug)
  if (service) return <ServiceDetail key={slug} service={service} />
  return <Navigate to={PATHS.services} replace />
}
