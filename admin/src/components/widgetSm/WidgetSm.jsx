import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { userRequest } from "../../requestMethods";
import { useEffect, useState } from "react";

export default function WidgetSm() {
  const [users,setUsers] = useState([]);

useEffect(()=> {
  const getUsers = async () => {
    try {
      const res = await userRequest.get("users/?new=true");
      setUsers(res.data);
    } catch {}
  }
  getUsers();
},[])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map(user=>(   
        <li className="widgetSmListItem" key={user._id}>
          <img
            src={users.img || "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}
