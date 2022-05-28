import axios from 'axios';
import React from 'react';
import './search.scss';
import './utilities.scss';

class Search extends React.Component {
          constructor() {
                    super();
                    this.state = {
                              search: '',
                              loading: false,
                              first: true,
                              items: [],
                              err: ''
                    };
                    this.onInputchange = this.onInputchange.bind(this);
          }

          onInputchange(event) {
                    this.setState({
                              search: event.target.value
                    });
          }

          sendReq(e) {
                    e.preventDefault();
                    this.setState({ loading: true, first: false });
                    var xhr = new XMLHttpRequest();
                    var formData = new FormData();
                    formData.append('name', this.state.search);
                    xhr.open("POST", 'https://movie-search-scrapper.herokuapp.com/scrapper');
                    xhr.onload = () => {
                              this.setState({
                                        items: JSON.parse(xhr.responseText),
                                        loading: false,
                              });
                    }
                    xhr.onerror = (err) => {
                              this.setState({
                                        err: 'Something went wrong!',
                                        loading: false
                              });
                    }
                    xhr.send(formData);
          }

          renderDetails(details) {
                    let detailsList = [];
                    for (const key in details) {
                              if (Object.hasOwnProperty.call(details, key)) {
                                        const element = details[key];
                                        detailsList.push(
                                                  <p>{key} <span>{element}</span></p>
                                        );
                              }
                    }
                    return detailsList;
          }
          renderExtra(extra) {
                    let extraList = []
                    for (let i = 0; i < extra.length; i++) {
                              const element = extra[i];
                              extraList.push(
                                        <p class="extra_item"><span>{element}</span></p>
                              );
                    }
                    return extraList;

          }
          renderListing() {
                    let itemList = [];
                    this.state.items.map(item => {
                              return itemList.push(
                                        <li key={item.link}>
                                                  <div className="img">
                                                            <img src={item.img} alt="" />
                                                  </div>
                                                  <div className="id">${document.querySelectorAll('.content li').length}</div>
                                                  <div className="info">
                                                            <div className="header">
                                                                      <h2 className="name" >{item.title}</h2>
                                                            </div>
                                                            <p className="site">سایت: <a className="en" target="_blank" href="">{item.site}</a></p>
                                                            {this.renderDetails(item.details)}
                                                            <p>{item.story}</p>
                                                            <p className='extra'>نوع فیلم: {this.renderExtra(item.extra_info)}</p>
                                                            <div className="more">
                                                                      <a target="_blank" href={item.link} className="btn btn-blue">بیشتر</a>
                                                            </div>
                                                  </div>
                                        </li>
                              )
                    })

                    return itemList;
          }
          render() {
                    return (
                              <>
                                        {!this.state.first && this.state.loading ? (
                                                  <div className="please-wait">
                                                            <div className="spinner-border text-light" role="status">
                                                                      <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                  </div>
                                        ) : (
                                                  <div>
                                                            <div className="header-search">
                                                                      <form className='form' onSubmit={this.sendReq.bind(this)}>
                                                                                <div className="form-group">
                                                                                          <input type="text" name="name" placeholder="Search..." className="en"
                                                                                                    autoComplete="off" onChange={this.onInputchange} />
                                                                                          <button type='submit'><i className="fa fa-search"></i></button>
                                                                                </div>
                                                                      </form>
                                                            </div>
                                                            <div className='content'>
                                                                      <ul>
                                                                                {this.renderListing()}
                                                                      </ul>
                                                            </div>
                                                            {!this.state.first && this.state.items.length === 0 && this.state.err === '' ? (<div className="not-found show">
                                                                      <p className="en">No Result</p>
                                                            </div>) : (<div></div>)}
                                                            {!this.state.first && this.state.items.length === 0 && this.state.err !== '' ?(<div className="error show">
                                                                      <p className="en">{this.state.err}</p>
                                                            </div>):(<div></div>)}

                                                  </div>

                                        )}
                              </>
                    )
          }
}

export default Search;