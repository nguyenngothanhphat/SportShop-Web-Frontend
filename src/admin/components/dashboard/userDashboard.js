import React, {useState} from 'react';
import Navbar from '../navbar/navbar';

const UserDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const openSidebar = () => {
        setSidebarOpen(true);
    }
    const closeSidebar = () => {
        setSidebarOpen(false);
    }
    return (
        <div className="container">
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            <h1>React dashboard</h1>
        </div>
    )
}

export default UserDashboard;

