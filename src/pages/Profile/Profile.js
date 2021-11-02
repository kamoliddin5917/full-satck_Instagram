import "./Profile.css";
import { useRef } from "react";

// Components
import Header from "../../components/Header/Header";
import Content from "../../components/Content/Content";

const Profile = ({user, setUser, contents, setContents}) => {
  const firstName = useRef()
  const lastName = useRef()
  const file = useRef()
  const content = useRef()
  const imgVideo = useRef()

  const handleSubmit = async(e)=> {
    e.preventDefault();
    const token = document.cookie?.split(";")?.filter((item) => item.match(/token/))[0]?.split("=")[1]

    const formData = new FormData()
    
    formData.append("firstName", firstName.current.value)
    formData.append("lastName", lastName.current.value)
    formData.append("file", file.current.files[0])
    
    const json = await fetch("http://localhost:777/profile",{
      headers:{token},
      method: "POST",
      body: formData
    })
    const data = await json.json()

    if (data[0].error) {
      document.cookie = "token=false"
      return
    }
    setUser(data[0].user);

    firstName.current.value = ""
    lastName.current.value = ""
  }

  const handleSubmitPost = async(e)=> {
    e.preventDefault()
    const token = document.cookie?.split(";")?.filter((item) => item.match(/token/))[0]?.split("=")[1]

    const formData = new FormData()
    
    formData.append("content", content.current.value)
    formData.append("file", imgVideo.current.files[0])
    
    const json = await fetch("http://localhost:777/profile/content",{
      headers:{token},
      method: "POST",
      body: formData
    })
    const data = await json.json()

    if (data[0].error) {
      document.cookie = "token=false"
      return
    }
    if (data[0].contents) setContents(data[0].contents)

    content.current.value = ""
  }

  const handleExit = async()=>{
    const token = document.cookie?.split(";")?.filter((item) => item.match(/token/))[0]?.split("=")[1]
    const json = await fetch("http://localhost:777/exit",{
      headers:{token}
    })
    const data = await json.json()
    console.log(data);
    document.cookie = "token=false"

  }

  return (
    <section className="profile">
      <Header user={user}/>
      <div className="profile__body container">
        <div className="profile__left">
          <form method="POST" onSubmit={handleSubmit}>
            <label htmlFor="img">
              <img
                className="profile__image"
                src={user.image}
                alt="ok"
              />
              <input className="profile__image-input" type="file" id="img" ref={file}/>
            </label>
            <h2>{`${user.firstName} ${user.lastName}`}</h2>
            <input type="text" placeholder="First name" ref={firstName} />
            <input type="text" placeholder="Last name" ref={lastName}/>
            <button type="submit">Change</button>
          </form>
          <button onClick={handleExit} className="profile__exit-btn">Exit</button>
        </div>
        <div className="profile__right">
          <form method="POST" onSubmit={handleSubmitPost}>
            <input type="text" name="content" placeholder="Content" ref={content} />
            <input type="file" name="file" ref={imgVideo} />
            <button type="submit">Submit</button>
          </form>

         { contents.length &&
          <ul className="box">
            {contents.map((content, i) => (
              <Content key={i} content={content} user={user}/>
            ))}
          </ul>
          }
        </div>
      </div>
    </section>
  );
};

export default Profile;
