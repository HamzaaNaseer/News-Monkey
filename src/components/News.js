import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    pageSize: 8,
    category: "science",
  };
  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    console.log("constructor of news called");
    // we set state inside the constructor
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=421dc721667c40f2a7a0b935d0a1d304&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const response = await fetch(url);
    const parsedResponse = await response.json();

    this.setState({
      articles: parsedResponse.articles,
      totalResults: parsedResponse.totalResults,
      loading: false,
    });
  }
  pageHandler = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category
      }&apiKey=421dc721667c40f2a7a0b935d0a1d304&pageSize=${this.props.pageSize
      }&page=${this.state.page + 1}`;
    const response = await fetch(url);
    const parsedResponse = await response.json();

    this.setState({
      articles: this.state.articles.concat(parsedResponse.articles),
      page: this.state.page + 1,
      totalResults: parsedResponse.totalResults,
    });
  };
  fetchMoreData = async () => {

    this.pageHandler('next')


  };

  render() {
    console.log("rendered called");
    return (
      <>
        <h2 className="text-center">DailyNewsDose || Top Headlines</h2>
        {/* loading spinner will show only when the loading state is true otherwise none */}
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className="row">
              {/* news articles will only be shown when the spinner is false otherwise none  */}
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      url={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
