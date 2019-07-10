import React from 'react'

import Layout from '../../components/Layout'
import EpisodeRoll from '../../components/EpisodeRoll'

export default class EpisodesIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <EpisodeRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
