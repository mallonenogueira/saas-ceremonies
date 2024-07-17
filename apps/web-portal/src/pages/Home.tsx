import { useEffect } from "react";
import { api } from "../service/api";

function Home() {
  useEffect(() => {
    api.get("/users");
  }, []);

  return <div>Home</div>;
}

export default Home;
