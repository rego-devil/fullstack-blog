import React from 'react';
import M from 'materialize-css';
import { Post } from '../Post';
import { PostApi } from '../../api';
import { Modal } from '../Modal';


export class Layout extends React.Component {
  constructor() {
    super();

    this.modal = [];

    this.state = {
      posts: [],
      loading: true,
      title: '',
      text: ''
    };
  }

  componentDidMount() {
    PostApi.get().then((res) => {
      this.setState({
        posts: res,
        loading: false,
      });
      // eslint-disable-next-line no-undef
      this.modal = M.Modal.init(document.querySelectorAll('.modal'));
    });
  }

  handleCreatePost = () => {
    const { title, text } = this.state;
    PostApi.post({
      title,
      text
    }).then(post => {
      this.setState({
        posts: [...this.state.posts, post],
        title: '',
        text: ''
      });

      const currentModal = this.modal.find(value => value.id === 'openPostForm');
      currentModal.close();

    })
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  removePost = (id) => {
    PostApi.delete(id).then(res => {
      this.setState({
        posts: this.state.posts.filter(item => item._id !== id)
      });
    });
  }

  render() {
    const { posts, loading, title, text } = this.state;
    return (
      <div style={{ textAlign: 'center' }}>
        {
          loading && (
            <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                  <div className="circle" />
                </div>
                <div className="gap-patch">
                  <div className="circle" />
                </div>
                <div className="circle-clipper right">
                  <div className="circle" />
                </div>
              </div>
            </div>
          )
        }
        {
          posts && !loading && (
            posts.length
              ? posts.map(post => <Post key={post._id} {...post} onRemovePost={this.removePost}  />)
              : 'постов нет'
          )
        }
        <Modal 
          id="openPostForm"
          onHandleCreatePost={this.handleCreatePost}
          body={
            <React.Fragment>
              <div className="input-field">
                <input id="title" type="text" className="validate" value={title} onChange={this.handleInputChange} name="title" />
                <label htmlFor="title">Title</label>
              </div>
              <div className="input-field ">
                <textarea id="text" className="materialize-textarea" value={text} onChange={this.handleInputChange} name="text" />
                <label htmlFor="text">Text</label>
              </div>
            </React.Fragment>
          }
          footer={<button type="button" className="waves-effect waves-light btn" onClick={this.handleCreatePost}>Создать</button>}
        />

        <div className="fixed-action-btn">
          <button type="button" className="btn-floating btn-large red modal-trigger" data-target="openPostForm">
            <i className="large material-icons">add</i>
          </button>
        </div>
      </div>
    );
  }
}
