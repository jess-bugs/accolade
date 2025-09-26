import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SidebarItems from '../components/SidebarItems'
import WorkspaceLogo from '../components/WorkspaceLogo'
import Content from '../components/Content'
import Portals from './Portals'
import ProfilePic from '../assets/images/JessB.jpg';
import NavBarBottom from '../components/NavBarBottom'

const Dashboard = () => {

    const { page } = useParams();

    return (
        <>
            <Sidebar>
                <WorkspaceLogo />
                <hr className='p-0 mb-4' />
                <SidebarItems />
                <NavBarBottom />
            </Sidebar>


            <Content>

                {page === 'portal' && (
                    <Portals />
                )}


            </Content>
        </>
    )
}

export default Dashboard