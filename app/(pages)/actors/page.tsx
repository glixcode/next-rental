import { DashboardLayout } from "@/components/dashboard-layout"
import ActorsTable from "./components/actor-table"
import { IActor } from "@/types/movie"

const ActorsPage = async () => {
  const BASE_URL = process.env.BASE_URL
  const res = await fetch(`${BASE_URL}/api/actors`,{
    cache: 'no-store',        // or 'force-cache' if you want caching
    next: { revalidate: 0 }
  });
  const actors:IActor[] = await res.json();

  return (
    <DashboardLayout title="Actors">
      <ActorsTable actors={actors}/>
    </DashboardLayout>
  )
}

export default ActorsPage