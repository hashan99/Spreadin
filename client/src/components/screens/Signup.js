import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            UploadFields()                
        }
    },[url])

    const UploadProImg = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","instagram-clone")
        data.append("cloud_name","db957qd0z")
        fetch("	https://api.cloudinary.com/v1_1/db957qd0z/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const UploadFields = ()=>{
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" })
            return
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                pic:url
            })
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    history.push('/signin')
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const PostData = () => {
        if(image){
            UploadProImg()
        }else{
            UploadFields()
        }
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Spreadin</h2>
                <img class="brand-icon" src="https://res.cloudinary.com/db957qd0z/image/upload/v1608642945/logos/SpreadIn_mngm54.ico" 
                    weight="60px" height="60px"
                ></img>
                <input
                    type="text"
                    placeholder="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="valid email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload Profile Image</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => PostData()}>SignUp</button>
                <h5>
                    <Link to="/signin">Already have an account ?</Link>
                </h5>
                <h6>
                    <Link to="/reset">Forgot Password ?</Link>
                </h6>
            </div>
        </div>
    )
}

export default Signup