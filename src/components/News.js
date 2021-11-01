import React, { Component } from "react";
import Newsitem from "./Newsitem";

export default class News extends Component {
  constructor() {
    super();
    console.log("constructor of news called");
    // we set state inside the constructor
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=421dc721667c40f2a7a0b935d0a1d304`;
    const response = await fetch(url);
    const parsedResponse = await response.json();

    this.setState({
      articles: parsedResponse.articles,
      totalResults: parsedResponse.totalResults,
    });
  }
  prevHandler = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=421dc721667c40f2a7a0b935d0a1d304&page=${
      this.state.page - 1
    }`;
    const response = await fetch(url);
    const parsedResponse = await response.json();

    this.setState({
      articles: parsedResponse.articles,
      page: this.state.page - 1,
    });
  };
  nextHandler = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=421dc721667c40f2a7a0b935d0a1d304&page=${
      this.state.page + 1
    }`;
    const response = await fetch(url);
    const parsedResponse = await response.json();

    this.setState({
      articles: parsedResponse.articles,
      page: this.state.page + 1,
    });
  };

  render() {
    console.log("rendered called");
    return (
      <div className="container my-3">
        <h2>DailyNewsDose || Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  url={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            onClick={this.prevHandler}
            type="button"
            className="btn btn-dark"
            disabled={this.state.page <= 1}
          >
            &#8592; prev
          </button>
          <button
            onClick={this.nextHandler}
            type="button"
            className="btn btn-dark"
            disabled={
              Math.ceil(this.state.totalResults / 20) <= this.state.page
            }
          >
            next &#8594;
          </button>
        </div>
      </div>
    );
  }
}
