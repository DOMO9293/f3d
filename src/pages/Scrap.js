import React, { useState, useEffect } from "react";
import { GetList } from "../components/firebase/firebase.utils";
import { selectScrapsCount } from "../redux/scrap/scrap.selectors";

function Scrap({ currentUser }) {
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("heeh", currentUser);
      const listRef = await GetList(currentUser);
      setList(listRef);
      console.log("listRef", listRef);
    };
    fetchData();

    return () => fetchData();
  }, []);
  return (
    list && (
      <div>
        {list.map((d, i) => (
          <div key={i}>{d.url}</div>
        ))}
      </div>
    )
  );
}

const mapStateToProps = (state) => ({
  itemcount: selectScrapsCount(state),
});

export default Scrap;
