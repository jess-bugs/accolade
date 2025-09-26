import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';




const MainLayout = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Outlet />
      <ToastContainer />
      
    </div>
  )

}


export default MainLayout