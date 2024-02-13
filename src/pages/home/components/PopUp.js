import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { SiYourtraveldottv } from "react-icons/si";
import { MdMapsHomeWork } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa6";

const PopUp = ({
  onclick,
  img,
  isCoverVisible,
  searchQuery,
  setSearchQuery,
  setIsCoverVisible,
  showPopUp,
  setShowPopUp,
}) => {
  const thisbtn = () => {
    console.log("this btn", isCoverVisible);
  };
  let iconStyles = { color: "red", fontSize: "1.5rem", marginLeft: "20px" };
  return (
    <Wrapper>
      <div
        className={showPopUp ? "show pop-container" : "hide pop-container"}
        onclick={(e) => e.stopPropagation()}
      >
        <div className="close-btn" onClick={() => setShowPopUp(false)}>
          <MdOutlineClose className="close-icon" />
        </div>
        <div className="links-container">
          <div>
            <div className="img-container">
              <Link to="/">
                <img src={img} alt="" srcset="" />
              </Link>
            </div>
          </div>
          <div
            className="search-container"
            onclick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              // className="desti"
              placeholder="Destination"
              value={searchQuery}
              onChange={(e) => {
                setIsCoverVisible(false);
                setSearchQuery(e.target.value);
              }}
              style={{
                maxWidth: "280px",
                height: "50%",
                marginTop: "13px",
                padding: "15px",
                border: "1px solid #000",
                borderRadius: "20px",
              }}
            />
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/" className="nav-link">
                  <IoMdHome className="icon1" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/attours" className="nav-link">
                  <SiYourtraveldottv style={{ iconStyles }} />
                  Tour
                </Link>
              </li>
              <li>
                <Link to="/atstays" className="nav-link">
                  <MdMapsHomeWork style={{ iconStyles }} />
                  Stays
                </Link>
              </li>
              <li>
                <Link to="/bloggerpage" className="nav-link">
                  <FaNewspaper style={{ iconStyles }} />
                  Blogs
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  z-index: 15;
  .pop-container {
    background-color: gray;
    opacity: 0.95;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    height: 100%;
    width: 100%;

    .close-btn {
      position: fixed;
      top: 1rem;
      right: 1rem;
      font-size: 2rem;

      svg {
        font-size: 3rem;
        font-weight: bolder !important;
        path:nth-child(2) {
          color: black !important;
        }
      }
    }
  }
  .show.pop-container {
    display: flex;
  }
  .hide.pop-container {
    display: none !important;
  }

  /* .img-container {
    height: 5rem;
    width: 5rem;
    img {
      height: 100%;
      width: 100%;
      object-fit: fill;
    }
  } */
  div {
    div {
      span {
        font-size: large;
      }
      p {
        color: aquamarine;
      }
    }
  }

  .links-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0rem;
    div {
      width: 100%;
      justify-content: center;
      display: flex;
      .img-container {
        margin-top: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 5rem;
        width: 7rem;
        a {
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    nav {
      display: flex;
      width: 100%;
      justify-content: center;
      ul {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;
        padding-left: 0;
        li {
          list-style: none;
          color: white;
          font-weight: bolder;
          font-size: 1.8rem;
          margin-left: 2px;
          width: 10rem;
          a {
            width: 100%;
            display: flex;
            gap: 1rem;
            align-items: center;
            svg {
              font-size: 1.5rem;
              font-weight: bolder !important;
              path {
                color: white !important;
              }
            }

            a {
              .icon1 {
                font-size: 2rem;
              }
            }
            /* svg{
            font-size: 2.2rem;
            height: 2.2rem;
            align-items: center;
          } */
          }
        }
      }
    }
  }
  @media (min-width: 769px) {
    .pop-container {
      display: none !important;
    }
  }
`;

export default PopUp;
