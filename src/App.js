import React, { Component, useState } from 'react';
import { FiAlignJustify, FiEdit, FiEye, FiFile, FiPlusCircle } from 'react-icons/fi';
import Content from './components/Content.js';
import './App.css';
import './DarkApp.css';

import marked from 'marked';

import { sampleText } from './sampleText';

class App extends Component {
  state = {
    text: sampleText,
  }

  componentDidMount () {
    const text = localStorage.getItem('text')

    if (text) {
      this.setState({ text })
    } else {
      this.setState({ text: sampleText })
    }
  }

  componentDidUpdate () {
    const { text } = this.state
    localStorage.setItem('text', text)
  }

  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

  renderText = text => {
    const __html = marked(text, { sanitize: true })
    return { __html }
  }

  render () {
    return (
      <>
      <div className='container w-100'>
          <div className='row'>
            <nav className="navbar py-0 my-0">
              <div className="container-fluid">
              <a className="navbar-brand text-light" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                <FiAlignJustify />
                <span className="px-3">MRKDWN</span>
              </a>
              <FiPlusCircle />
            </div>
          </nav>
          
          <div className="offcanvas offcanvas-start bg-dark" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header text-light">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">My notes</h5>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body text-light">
              <div>
                <ul>
                  <li><a href="/">name of note</a></li>
                  <li><a href="/">name of note</a></li>
                  <li><a href="/">name of note</a></li>
                </ul>
              </div>
            </div>
          </div>
          <Content />
          <div className='col-sm-6'>
          
          {/* <p>{!data ? "Loading..." : data}</p> */}
            <FiEdit className="float-end my-3" />
            <span className="d-flex align-items-center"><FiFile className="me-1" /><input className="bg-dark text-light border-0 my-3 dark-mode" type="text" id="note-name" placeholder="my-note.md" value="" /></span>
            <textarea
              onChange={this.handleChange}
              value={this.state.text}
              className='form-control dark-mode'
              rows='35' />
          </div>

          <div className='col-sm-6 dark-mode'>
            <FiEye className="float-end my-3" />
            <div className='dark-mode mt-5' dangerouslySetInnerHTML={this.renderText(this.state.text)} />
          </div>

        </div>
       
      </div>
       
      </>
    )
  }
}

export default App
