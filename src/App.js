import { Switch } from "react-router";
import { useEffect, useState } from "react"
import "./App.css";

// Pages
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
// Routes
import Public from "./routes/Public";
import Private from "./routes/Private"

function App() {
  const [user, setUser] = useState({firstName:"Kamoliddin", lastName:"Jamoliddinov", image:"https://picsum.photos/300/300"})
  const [contents, setContents] = useState([])
  const [allContents, setAllContents] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    ;(async()=>{
      const token = document.cookie?.split(";")?.filter((item) => item.match(/token/))[0]?.split("=")[1]
      const json = await fetch("http://localhost:777/posts",{
        headers: {token}
      })
      const data = await json.json()
      if (data[0].error) {
        document.cookie = "token=false"
        return
      }
      if(data.length) setAllContents(data)
    })()
  },[])

  useEffect(() => {
    ;(async()=>{
      const token = document.cookie?.split(";")?.filter((item) => item.match(/token/))[0]?.split("=")[1]
      const json = await fetch("http://localhost:777/users",{
        headers: {token}
      })
      const data = await json.json()
      if (data[0].error) {
        document.cookie = "token=false"
        return
      }
      if(data.length) setUsers(data)
    })()
  },[])
  return <div className="App">
    <Switch>
      <Private path="/" exact>
        <Home user={user} allContents={allContents} users={users}/>
      </Private>
      <Private path="/profile">
        <Profile contents={contents} setContents={setContents} user={user} setUser={setUser}/>
      </Private>
      <Public path="/login" component={Login}/>
      <Public path="/signup" component={Signup}/>
    </Switch>
  </div>;
}

export default App;
