import React from 'react'
import '../assets/scss/main.scss'
import Helmet from 'react-helmet'
import YouTube from 'react-youtube';

import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isArticleVisible: false,
      timeout: false,
      articleTimeout: false,
      article: '',
      loading: 'is-loading',
      selectedVideo: '',
      customVideos: [
        'Z6FPJOgfCkc', // Galaxy Supernova
        'QN6KVm5cRWw', // Shy Boy
        'DRSRpXPZVdM', // Is It Poppin
        'NPqtL1dtrlA', // Love Options
        'Zy_sgB4EJB8', // Tell Me Tell Me
        'U7mPqycQ0tQ', // Gee
        'nUDMw9f24kE', // UU
        '6SwiSpudKWI', // Genie
        'TGbwL8kSpEk', // Oh!
        'kKS12iGFyEA', // Danger
        'nQm_9nbY_7U', // Would You Like Some Tea?
        'Qk52ypnGs68', // Number 9
        'Y-FhDScM_2w', // Some
        '8iY3wGoJfng', // Sunshine
        'K5H-GvnNz2Y', // Mr. Chu
        'YXZ19CvCmto', // Hush
        'ouR4nn1G9r4', // Not Spring, Love
        'p6XLNsJ9YrA', // Give it to me
        'PfPWxK1BQFI', // Hoot
        'hspqQuuuGIw', // NoNoNo
        'c3-pUNhYORw', // Paparazzi
        'JCscyDno4yA', // Beep Beep
        'bAicySTsvLo', // Berry Good Don't believe
        'yuCbJykB32M', // Yoona Stonewall Walkway
        '1pBgMBBsv4k', // Heart Attack
        'sno_genwMz8', // Good Luck
        'rRzxEiBLQCA', // Heart Shaker
        '0rtV5esQT6I', // Like OOH-AHH
      ]
    }
    this.handleOpenArticle = this.handleOpenArticle.bind(this)
    this.handleCloseArticle = this.handleCloseArticle.bind(this)
  }

  componentDidMount () {
    this.timeoutId = setTimeout(() => {
        this.setState({loading: ''});
    }, 100);
    this.randomVideo();
  }

  componentWillUnmount () {
    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
    }
  }

  handleOpenArticle(article) {

    this.setState({
      isArticleVisible: !this.state.isArticleVisible,
      article
    })

    setTimeout(() => {
      this.setState({
        timeout: !this.state.timeout
      })
    }, 325)

    setTimeout(() => {
      this.setState({
        articleTimeout: !this.state.articleTimeout
      })
    }, 350)

  }

  handleCloseArticle() {

    this.setState({
      articleTimeout: !this.state.articleTimeout
    })

    setTimeout(() => {
      this.setState({
        timeout: !this.state.timeout
      })
    }, 325)

    setTimeout(() => {
      this.setState({
        isArticleVisible: !this.state.isArticleVisible,
        article: ''
      })
    }, 350)

  }

  randomVideo = () => {
    this.setState({
      selectedVideo: this.state.customVideos[Math.floor(Math.random()*this.state.customVideos.length)]
    })
  }

  _onReady = (event) => {
    // access to player in all event handlers via event.target
    // event.target.mute();
  }

  _onError = (event) => {
    console.log(event.target.getVideoData());
    this.setState({
      selectedVideo: this.state.customVideos[Math.floor(Math.random()*this.state.customVideos.length)]
    })
  }

  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = this.props.data.site.siteMetadata.description

    const videoOptions = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        // controls: 0,
        // rel: 0,
        // showinfo: 0
      }
    };

    return (
      <div className={`body ${this.state.loading} ${this.state.isArticleVisible ? 'is-article-visible' : ''}`}>
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
        </Helmet>

        <div id="wrapper">

          <Header onOpenArticle={this.handleOpenArticle} timeout={this.state.timeout} />
          <Main
            isArticleVisible={this.state.isArticleVisible}
            timeout={this.state.timeout}
            articleTimeout={this.state.articleTimeout}
            article={this.state.article}
            onCloseArticle={this.handleCloseArticle}
          />
          <Footer timeout={this.state.timeout} />

        </div>
        {/*<div id="bg"></div>*/}

        <div className="video-background">
          <div className="video-foreground">
            <YouTube
              videoId={this.state.selectedVideo}
              opts={videoOptions}
              className="video-iframe"
              onReady={this._onReady}
              onEnd={this.randomVideo}
              onError={this._onError}
            />
          </div>
        </div>
      </div>
    )
  }
}

Template.propTypes = {
  route: React.PropTypes.object,
}

export default Template

export const pageQuery = graphql`
  query PageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`