import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from "../UserContext"
// Toastify
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  // States
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  // const [userError, setUserError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);




  // ---------Login (Paramesh)--------------
  async function login(ev) {
    ev.preventDefault();

    const response = await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      mode: "cors",
      credentials: 'include',
    })


    if (response.status === 200) {
      // alert("User logged in successfully")
      // toast.success('Login Successful', {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });

      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
        // console.log(userInfo)            // Test - Response (id, username)
      }).catch(err => console.log(err))
    } else {
      alert("Incorrect Credentials")
    }



  }
  //-----------REDIRECT---------------------
  if (redirect) return <Navigate to={'/'} />    // if Login SUCCESSFUL navigate to index

  return (
    <>

      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                <form onSubmit={login}>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="username" onChange={(event) => setUsername(event.target.value)} />
                    <label htmlFor="floatingInput">Username</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  {/* <div className="form-check mb-3" >
                    <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                      <label className="form-check-label" htmlFor="rememberPasswordCheck">
                        Remember password
                      </label>
                  </div> */}
                  <div className="d-grid">
                    <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default LoginPage





//<=========================================================================================> 
//<=============================== LEGACY CODES ============================================> 
//<=========================================================================================> 


// <div className="App">

    //   <div className="container">
    //     <h2>Login</h2><br />
    //     <div className="row d-flex justify-content-center">
    //       <div className="col-md-4">
    //         <form id="loginform" onSubmit={loginSubmit}>
    //           <div className="form-group">            {/* USERNAME */}
    //             <label>Username</label>
    //             <input
    //               type="user"
    //               className="form-control"
    //               id="userInput"
    //               name="userInput"
    //               aria-describedby="userHelp"
    //               placeholder="Enter user"
    //               onChange={(event) => setUser(event.target.value)}
    //             />
    //             <small id="userHelp" className="text-danger form-text">
    //               {userError}
    //             </small>
    //           </div>

    //           <div className="form-group">            {/* PASSWORD */}
    //             <label>Password</label>
    //             <input
    //               type="password"
    //               className="form-control"
    //               id="exampleInputPassword1"
    //               placeholder="Password"
    //               onChange={(event) => setPassword(event.target.value)}
    //             />
    //             <small id="passworderror" className="text-danger form-text">
    //               {passwordError}
    //             </small>
    //           </div>
    //           {/* Checkbox
    //            <div className="form-group form-check">
    //             <input
    //               type="checkbox"
    //               className="form-check-input"
    //               id="exampleCheck1"
    //             />
    //             <label className="form-check-label">Check me out</label>
    //           </div> 
    //           */}
    //           <br />
    //           <button type="submit" className="btn btn-primary">Login</button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    //<=========================================================================================> 
