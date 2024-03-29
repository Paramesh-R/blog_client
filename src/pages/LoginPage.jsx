import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from "../UserContext"

function LoginPage() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('https://draftjs-blog-server.onrender.com/users/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      mode: "cors",
      credentials: 'include',
    })


    if (response.status === 200) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
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
                  <div className="d-grid">
                    <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign in</button>
                    <div className="text-center m-2">
                      <h6>
                        <mark>
                          Test Credentials
                        </mark>
                      </h6>

                      <mark>Username: test_user<br />Password:Password@123</mark>
                    </div>
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

