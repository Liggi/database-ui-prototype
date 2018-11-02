import React, { Component } from 'react';
import classnames from 'classnames';
import loader from './images/25.gif';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      panelOpen: false,
      queryLoading: false,
      queryLocked: false,
      visualise: false,
      viz: 'number',
      showResults: false,
    };

    this.togglePanel = this.togglePanel.bind(this);
    this.runQuery = this.runQuery.bind(this);
    this.editQuery = this.editQuery.bind(this);
    this.visualise = this.visualise.bind(this);
    this.switchViz = this.switchViz.bind(this);
  }

  togglePanel() {
    this.setState({ panelOpen: !this.state.panelOpen })
  }

  runQuery() {
    this.setState({ queryLoading: true });

    setTimeout(() => {
      this.setState({
        queryLoading: false,
        queryLocked: true
      })
    }, 3000);
  }

  editQuery() {
    this.setState({ queryLoading: false, queryLocked: false });
  }

  visualise() {
    this.setState({ visualise: true });
  }

  switchViz(type) {
    this.setState({ viz: type });
  }

  renderSQLPanel() {
    const sqlEntryClasses = classnames({
      'locked': this.state.queryLocked,
      'hidden': this.state.showResults && this.state.queryLocked,
    });

    return (
      <div>
        <h1>Enter your SQL query</h1>

        <textarea className={sqlEntryClasses} disabled={this.state.queryLocked}></textarea>

        {this.state.showResults && this.state.queryLocked && <table border="0" cellpadding="0" cellspacing="0" className="results-table">
          <thead>
            <td>id</td>
            <td>data_point</td>
            <td>date</td>
          </thead>
          <tbody>
            <tr>
              <td>26</td>
              <td>5</td>
              <td>2018-02-02 22:01</td>
            </tr>
            <tr>
              <td>27</td>
              <td>11</td>
              <td>2018-02-06 14:22</td>
            </tr>
            <tr>
              <td>28</td>
              <td>1</td>
              <td>2018-02-10 07:49</td>
            </tr>
            <tr>
              <td>29</td>
              <td>27</td>
              <td>2018-03-01 10:55</td>
            </tr>
            <tr>
              <td>30</td>
              <td>17</td>
              <td>2018-03-13 03:28</td>
            </tr>
            <tr>
              <td>31</td>
              <td>2</td>
              <td>2018-04-12 12:01</td>
            </tr>
          </tbody>
        </table>}

        {!this.state.queryLocked &&
        !this.state.queryLoading &&
          <div class="actions">
              <button onClick={this.runQuery} className="greenButton">Run</button>
            </div>}

        {!this.state.queryLocked &&
        this.state.queryLoading &&
          <div class="actions">
              <img src={loader} alt="" height="40" />
            </div>}

        {this.state.queryLocked &&
        !this.state.queryLoading &&
          <div class="actions">
              <div className="info">
                <span role="img" aria-label="tick">✅</span> Your query ran successfully.
              </div>
              <button onClick={this.editQuery} className="greenButton">Edit</button>
              <button onClick={this.visualise} className="greenButton">Configure</button>
            </div>}
      </div>
    );
  }

  renderConfigPanel() {
    return (
      <div class="config">
        <button onClick={() => this.switchViz('number')} className="number"></button>
        <button onClick={() => this.switchViz('line')} className="line"></button>
      </div>
    );
  }

  render() {
    const frameClasses = classnames('frame', {
      'db': !this.state.visualise && this.state.panelOpen,
      'number-frame': this.state.queryLocked || (this.state.visualise && this.state.viz) === 'number' || this.state.showResults && this.state.queryLocked,
      'line-frame': this.state.visualise && this.state.viz === 'line'
    });
    const panelClasses = classnames('panel', {
      'visualise-mode': this.state.visualise
    });
    const dotsClasses = classnames('dots', {
      'hidden': !this.state.panelOpen
    });
    const addButtonClasses = classnames('addButton', {
      'hidden': this.state.panelOpen
    });


    return (
      <div className="App">
        <button onClick={() => this.setState({ showResults: true })} className="show-results">Show Results</button>

        <div className={frameClasses}>
          <button onClick={this.togglePanel} className={addButtonClasses} />
        </div>

        <button onClick={this.togglePanel} className={dotsClasses}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {this.state.panelOpen && 
          <div className={panelClasses}>
            {this.state.visualise ? this.renderConfigPanel() : this.renderSQLPanel()}
          </div>}
      </div>
    );
  }
}

export default App;
