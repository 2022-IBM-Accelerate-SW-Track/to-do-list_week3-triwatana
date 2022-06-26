import React, { Component } from "react";
import "./About.css";
import tri_profile_pic from "../assets/tri_profile_pic.png";

export default class About extends Component {
  render() {
    return (
      <div>
        <div>
          <div class="split left">
            <div className="centered">
              <img
                className="profile_image"
                src={tri_profile_pic}
                alt="Tri's Profile Pic"
              ></img>
            </div>
          </div>
          <div className="split right">
            <div className="centered">
              <div className="name_title">Tri Watanasuparp</div>
              <div className="brief_description">
                <b>Bio:</b> I'm a rising junior at Northeastern University
                pursuing a combined major in computer science and business
                administration. I enjoy working on impactful projects that lie
                at the intersection of technology, business, and design.
                <br />
                <br />
                <b>Interests:</b> When I'm not in front of a computer screen,
                I'm probably learning some new dance moves, taking photos on my
                Canon EOS 77D camera, or listening to inspirational podcasts.
                <br />
                <br />
                <b>Fun fact:</b> I'm a member of the Kinematix Dance Troupe :)
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
