import React from "react";
import { AddNews } from "../firebase/firebase.utils";
import { Link } from "react-router-dom";

import styled from "styled-components";

function Modal({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
  url,
  currentUser,
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
          {children}
          {closable && (
            <>
              <button className="modal-close" onClick={close}>
                x
              </button>
              <button
                className="modal-close"
                onClick={(e) => window.open(url.url, "_blank")}
              >
                go to new page
              </button>
              {currentUser ? (
                <div
                  style={{ color: "black" }}
                  onClick={async () => {
                    const scrapRef = await AddNews(currentUser, url);
                    console.log("imdone");
                  }}
                >
                  scrap this news
                </div>
              ) : (
                <Link style={{ color: "black" }} to="/scrap">
                  Sign in for scrap this news
                </Link>
              )}
            </>
          )}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

export default Modal;

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
`;
