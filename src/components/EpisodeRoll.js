import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
//import PreviewCompatibleImage from './PreviewCompatibleImage'

class EpisodeRoll extends React.Component {
  render() {
    const { data } = this.props
    console.log(data.allFeedExampleBlog)
    const { edges: episodes } = data.allFeedExampleBlog

    return (
      <div className="columns is-multiline">      
        {episodes &&
          episodes.map(({ node: episode }) => (
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
                      to={episode.link}
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
                  <Link className="button" to={episode.link}>
                    Keep Reading →
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </div>
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
        allFeedExampleBlog {
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
