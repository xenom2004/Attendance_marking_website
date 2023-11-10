import React from "react";
import "../cssfile/about.css";
import darshil from "../images/WhatsApp Image 2023-11-09 at 10.45.58 PM.jpeg"
import aadish  from "../images/Screenshot 2023-11-02 233803.png"
import abhinav from "../images/Screenshot 2023-11-02 233734.png"

function Aboutme() {
  return (
    <>
      <>
        <div id="back1">
          <nav className="navMenu">
            <a href="/home">Home</a>
            <a href="/myclass">MyClass</a>
            <a href="/about">About</a>
            <a href="/result">MyResult</a>
          </nav>
          <section class="articles">
            <article>
              <div class="article-wrapper">
                <figure>
                  <img src={aadish} alt="" />
                </figure>
                <div class="article-body">
                  <h2>Aadish Jain</h2>
                  <p>220001001</p>
                </div>
              </div>
            </article>
            <article>
              <div class="article-wrapper">
                <figure>
                  <img src={abhinav} alt="" />
                </figure>
                <div class="article-body">
                  <h2>Abhinav Gangil</h2>
                  <p>220001002</p>
                </div>
              </div>
            </article>
            <article>
              <div class="article-wrapper">
                <figure>
                  <img src={darshil} alt="" />
                </figure>
                <div class="article-body">
                  <h2>Darshil Patel</h2>
                  <p>220001014</p>
                </div>
              </div>
            </article>
          </section>
        </div>
      </>
    </>
  );
}

export default Aboutme;
