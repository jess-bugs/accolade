import React from 'react'

const Sidebar = ({children}) => {
    return (

        <div className="d-none d-lg-flex flex-column h-100 border-end border-muted sidebar">
            {children}
        </div>

    )
}

export default Sidebar