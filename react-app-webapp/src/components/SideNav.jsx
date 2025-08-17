import { clearUserData } from "../utils/auth";

const SideNav = ({onClose, userData}) => {

  const handleLogout = () => {
    clearUserData();
    window.location.href = '/login';
  };

  return (
    <div id="mySideNav" className="sidenav">
      <button className="closebtn" onClick={onClose}>&times;</button>

      <div className="sidenav-user-section">
        <div className="sidenav-user-profile">
          <img
            src={userData?.userInfo?.avatar}
            alt="Avatar"
            width="50"
            height="50"
          />
          <div className="sidenav-user-details">
            <h3>{userData?.userInfo?.user}</h3>
            <p>{userData?.userInfo?.email}</p>
          </div>
        </div>
      </div>

      <button className="logout-button" onClick={handleLogout}>Logga ut</button>
    </div>
  )
};

export default SideNav;