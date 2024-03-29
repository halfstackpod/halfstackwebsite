import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
//import PreviewCompatibleImage from './PreviewCompatibleImage'

class EpisodeRoll extends React.Component {
  state = {currentPage: 1, postsPerPage: 4};

  onPageSelectChange = (e) => {
    e.preventDefault()
    const pageNum = +e.target.value
    if (pageNum) {
      this.setState({currentPage: pageNum})
    }
  }

  onItemsPerPageSelectChange = (e) => {
    e.preventDefault()
    const { data } = this.props
    const { edges: episodes } = data.allFeedExamplePodcast
    const itemsPerPage = +e.target.value
    if (itemsPerPage) {
      const maxPages = episodes && episodes.length && Math.ceil(episodes.length / itemsPerPage)

      if (this.state.currentPage > maxPages) {
        this.setState({currentPage: maxPages})
      }
      this.setState({ postsPerPage: itemsPerPage })
    }
  }

  createPageSelect() {
    const { data } = this.props    
    const { edges: episodes } = data.allFeedExamplePodcast
    const maxPages = episodes && episodes.length && Math.ceil(episodes.length / this.state.postsPerPage)
    if (maxPages < 2) {
      return;
    }
    const options = [];
    for (let i = 1; i <= maxPages; i++) {
      options.push(i)
    }

    return (
    <div className="ep-roll-select-wrap">
    <label for="pageSelect">Current Page</label>
    <select id="pageSelect" onChange={this.onPageSelectChange} value={this.state.currentPage}>
      {options.map(option => <option value={option}>{option}</option>)}
    </select></div>)
  }

  createItemsPerPageSelect() {
    return (
      <div className="ep-roll-select-wrap">
      <label for="itemsPerPage">Items Per Page</label>
      <select id="itemsPerPage" onChange={this.onItemsPerPageSelectChange}>
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      </div>
    )
  }

  render() {
    const { data } = this.props
    const { edges: episodes } = data.allFeedExamplePodcast
    const maxPages = episodes && episodes.length && Math.ceil(episodes.length / this.state.postsPerPage)
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage
    const currentPosts = episodes.slice(indexOfFirstPost, indexOfLastPost)

    return (
      <>
        <div className="columns is-multiline">      
          {currentPosts &&
            currentPosts.map(({ node: episode }) => (
              <div className="is-parent column is-6" key={episode.title}>
                <article
                  className={`episode-list-item tile is-child box notification`}
                >
                  <header>
                    {/* {episode.frontmatter.featuredimage ? (
                      <div className="featured-thumbnail">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: episode.frontmatter.featuredimage,
                            alt: `featured image thumbnail for episode ${
                              episode.title
                            }`,
                          }}
                        />
                      </div>
                    ) : null} */}
                    <p className="post-meta">
                      <Link
                        className="title has-text-primary is-size-4"
                        to={encodeURI(episode.title)}
                      >
                        {episode.title}
                      </Link>
                      <span> &bull; </span>
                      <span className="subtitle is-size-5 is-block">
                        {episode.pubDate}
                      </span>
                    </p>
                  </header>
                  <p>
                    {/* {episode.description} */}
                    <br />
                    <br />
                    <Link className="button" to={encodeURI(episode.title)}>
                      Keep Reading →
                    </Link>
                  </p>
                </article>
              </div>
            ))}
        </div>
        <div className="column is-12 has-text-centered">
        </div>
        {this.state.currentPage > 1 && (
            <button className="btn paginate" onClick={() => this.setState({ currentPage: this.state.currentPage -= 1 })}>Prev</button>
        )}
        {this.state.currentPage < maxPages && (
            <button className="btn paginate" onClick={() => this.setState({currentPage: this.state.currentPage += 1})}>Next</button>
        )}
        {this.createPageSelect()}
        {this.createItemsPerPageSelect()}
      </>
    )
  }
}

EpisodeRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allFeedExamplePodcast {
          edges {
            node {
              title
              link
              pubDate
            }
          }
        }        
      }
    `}
    render={(data, count) => <EpisodeRoll data={data} count={count} />}
  />
)
