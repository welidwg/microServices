import { useEffect, useState } from "react";
import axios from "axios";
import Container from "./layouts/Container";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      axios
        .get("/api/user/11")
        .then((res) => {
          // setData(res.data.message);
          const user = res.data;
          setUser(user);
        })
        .catch((err) => {
          console.log("====================================");
          console.log(err);
          console.log("====================================");
        });
    } catch (error) {}
  }, []);

  return (
    <Container>
      <div className="container-fluid bg-primary">
        <p className="text-light">{user === null ? <>loading</> : user.nom}</p>
      </div>
    </Container>
  );
}

export default App;
