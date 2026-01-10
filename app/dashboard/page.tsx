import Navbar from '../components/navbar'
import DashboardComp from '../components/dashboardComp'
import Footer from '../components/footer'

export default function Page() {
  return (
    <div>
      <Navbar/>
      <div className="flex justify-center items-center">
       <DashboardComp/>
      </div>
      <Footer/>
    </div>
  )
}
