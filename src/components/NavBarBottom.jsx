import ProfilePic from '../assets/images/JessB.jpg';


const NavBarBottom = () => {
    return (
        <div style={{ cursor: 'pointer' }} className="row g-1 justify-content-between mt-auto p-1 rounded text-bg-dark flex-nowrap">
            <div className="col-6 h-100 d-flex flex-column">
                <p className="fw-bold text-nowrap my-auto">Jess Bugs</p>
            </div>

            <div className="col-6">
                {/* <WorkspaceLogo height='30px'/> */}
                <div className="text-end">
                    <img src={ProfilePic} className="profile_pic" />
                </div>
            </div>
        </div>
    )
}

export default NavBarBottom