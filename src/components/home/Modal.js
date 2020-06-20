import React from "react";
import { AddNews } from "../firebase/firebase.utils";
import CustomButton from "../global/CustomButton";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
function Modal({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
  url,
  currentUser,
  history,
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };
  const addnews = async (e, currentUser, url) => {
    await AddNews(currentUser, url);
    if (onClose) {
      onClose(e);
    }
  };
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          <Text>{children}</Text>
          {closable && (
            <Text>
              <CloseButton className="modal-close" onClick={close}>
                x
              </CloseButton>
              <CustomButton
                className="modal-close"
                onClick={(e) => window.open(url.url, "_blank")}
              >
                go to news page
              </CustomButton>
              {currentUser ? (
                <CustomButton
                  onClick={(e) => {
                    addnews(e, currentUser, url);
                  }}
                >
                  scrap this news
                </CustomButton>
              ) : (
                <CustomButton onClick={() => history.push("/signin")}>
                  Sign in for scrap this news
                </CustomButton>
              )}
            </Text>
          )}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

export default withRouter(Modal);

const Text = styled.p`
  text-align: center;
  display: flex;
  flex-flow: column;
  font-weight: bold;
`;
const CloseButton = styled.button`
  position: absolute;
  background-color: blue;
  border-radius: 30px;
  padding: 10px;
  border: none;
  color: white;
  top: 4%;
  left: 90%;
`;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
  justify-content: center;
  align-items: center;
`;
