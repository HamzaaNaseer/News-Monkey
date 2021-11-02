import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";

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
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=421dc721667c40f2a7a0b935d0a1d304&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const response = await fetch(url);
    const parsedResponse = await response.json();

    this.setState({
      articles: parsedResponse.articles,
      totalResults: parsedResponse.totalResults,
      loading: false,
    });
  }
  prevHandler = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=421dc721667c40f2a7a0b935d0a1d304&pageSize=${
      this.props.pageSize
    }&page=${this.state.page - 1}`;
    this.setState({ loading: true });
    const response = await fetch(url);
    const parsedResponse = await response.json();

    this.setState({
      articles: parsedResponse.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };
  nextHandler = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=421dc721667c40f2a7a0b935d0a1d304&pageSize=${
      this.props.pageSize
    }&page=${this.state.page + 1}`;
    this.setState({ loading: true });
    const response = await fetch(url);
    const parsedResponse = await response.json();

    this.setState({
      articles: parsedResponse.articles,
      page: this.state.page + 1,
      loading: false,
    });
  };

  render() {
    console.log("rendered called");
    return (
      <div className="container my-3">
        <h2 className="text-center">DailyNewsDose || Top Headlines</h2>
        {/* loading spinner will show only when the loading state is true otherwise none */}
        {this.state.loading && <Spinner />}
        <div className="row">
          {/* news articles will only be shown when the spinner is false otherwise none  */}
          {!this.state.loading &&
            this.state.articles.map((element) => {
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
              this.state.page >=
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            next &#8594;
          </button>
        </div>
      </div>
    );
  }
}
