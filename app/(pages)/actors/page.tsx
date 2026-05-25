import { DashboardLayout } from "@/components/dashboard-layout"
import ActorsTable from "./components/actor-table"
import { IActor } from "@/types/movie"

const ActorsPage = async () => {
  const BASE_URL = process.env.BASE_URL
  const res = await fetch(`${BASE_URL}/api/actors`);
  const actors:IActor[] = await res.json();

  return (
    <DashboardLayout title="Actors">
      <ActorsTable actors={actors}/>
    </DashboardLayout>
  )
}

export default ActorsPage