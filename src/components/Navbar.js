import React from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom'

const Navbar = () => {
  const Navigate=useNavigate()
    const locate=useLocation()

   const handleLogout=()=>{
    localStorage.removeItem("token")
    Navigate("/login")
   }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-info ">
  <div className="container-fluid">
    <Link className="navbar-brand" to={"/"}> <i class="fa-solid fa-book"></i> Note-App</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${locate.pathname==="/"}?"active":""`} aria-current="page" to={"/"}><i class="fa-solid fa-house"></i> Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${locate.pathname==="/about"}?"active":""`} to={"/about"}><i class="fa-solid fa-address-card"></i> About</Link>
        </li>
      </ul>
      
      
    {!localStorage.getItem("token") ? <form className="d-flex" role="search">
    <Link className= "btn btn-dark mx-2" to={"/registeration"} role="botton"><i class="fa-solid fa-registered"></i> Register</Link>
    <Link className="btn btn-dark mx-2" to={"/login"} role="botton"><i class="fa-solid fa-right-to-bracket"></i> Login</Link>
    </form>:
    <botton className="btn btn-dark mx-2" onClick={handleLogout}  ><i class="fa-solid fa-right-from-bracket"></i> Logout</botton>
      }
      
      
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
