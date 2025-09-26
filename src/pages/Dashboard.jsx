import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SidebarItems from '../components/SidebarItems'
import WorkspaceLogo from '../components/WorkspaceLogo'
import Content from '../components/Content'
import ProfilePic from '../assets/images/JessB.jpg';
import NavBarBottom from '../components/NavBarBottom'


// Content Panes
import DashboardPane from '../panes/DashboardPane'
import Portals from '../panes/Portals'
import SiteStat from '../panes/SiteStat'
import Accounts from '../panes/Accounts'

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

                {
                // dashboard pane
                page === 'dashboard' ? <DashboardPane /> :
                
                // portals
                page === 'portal' ? <Portals /> :

                // site stat
                page === 'site-stat' ? <SiteStat /> : 

                // accounts
                page === 'accounts' ? <Accounts /> :

                // fallbback to Dashboard Pane
                <DashboardPane />
                
                }


            </Content>
        </>
    )
}

export default Dashboard