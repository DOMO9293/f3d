import React, { useState, useEffect } from "react";
import { GetList } from "../components/firebase/firebase.utils";
import { selectScrapsCount } from "../redux/scrap/scrap.selectors";
import CustomButton from "../components/global/CustomButton";
import { connect } from "react-redux";
import { addItem, clearItemFromScrap } from "../redux/scrap/scrap.actions";
import { clearNews } from "../components/firebase/firebase.utils";
import styled from "styled-components";

function Scrap({ currentUser, scraps, dispatch }) {
  useEffect(() => {
    let listRef;
    const fetchData = async () => {
      listRef = await GetList(currentUser);
      dispatch(addItem(listRef));
    };
    fetchData();

    return () => listRef();
  }, []);

  const onClick = async (data) => {
    await clearNews(currentUser, data.publishedAt);
    dispatch(clearItemFromScrap(data));
  };
  return (
    <Body>
      <Wrapper>
        {scraps.length > 0 &&
          scraps.map((d, i) => (
            <StyledDiv key={i} className="scrap">
              <CloseButton className="modal-close" onClick={() => onClick(d)}>
                x
              </CloseButton>
              <img src={d.urlToImage} alt="" />
              <h1>{d.title}</h1>
            </StyledDiv>
          ))}
      </Wrapper>
    </Body>
  );
}

const mapStateToProps = ({ scrap: { scraps } }) => ({
  scraps,
});

export default connect(mapStateToProps)(Scrap);

const StyledDiv = styled.div`
  box-sizing: border-box;
  padding: 10px;
  padding-top: 5px;
  margin: 10px;
  display: flex;
  flex-flow: column;

  width: 250px;

  border: 1px solid #b57373;
  color: #b57373;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  & > h1 {
    color: inherit;
    font-size: 1.2rem;
    justify-content: center;
  }
  & > img {
    max-width: 180px;
    overflow: clip;
    margin: 0px auto;
    justify-self: center;
  }
`;
const CloseButton = styled.button`
  background-color: transparent;
  border-radius: 30px;
  padding: 1px;
  border: none;
  color: #b57373;
  margin: 5px;
  margin-bottom: 10px;
  font-size: 1rem;
  margin-left: 220px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
`;

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 30px;
  background-color: blue;
`;
