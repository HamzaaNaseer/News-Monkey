import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, url, date, author, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <span
            className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
            style={{ zIndex: "1", left: "90%" }}
          >
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://image.shutterstock.com/image-vector/breaking-news-banner-template-world-260nw-1707795817.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description ? description.slice(0, 80) : ""}...
            </p>
            <p className="card-text">
              <small className="text-muted">
                published by {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={url} className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
