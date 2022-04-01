import useFetch from "../customize/fetch";
import './Blog.scss';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AddNewBlog from './AddNewBlog.js';

const Blog = () => {
    const [show, setShow] = useState(false);
    const [newData, setNewData] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { data: dataBlog, isLoading, isError } =
        useFetch(`https://jsonplaceholder.typicode.com/posts`, false);

    useEffect(() => {
        if (dataBlog && dataBlog.length > 0) {
            let data = dataBlog.slice(0, 9);
            setNewData(data);
        }
    }, [dataBlog])


    const handleAddBlog = (blog) => {
        let data = newData;
        data.unshift(blog);
        setShow(false);
    }

    const handleDeletePost = (id) => {
        let data = newData;
        data = data.filter(item => item.id !== id);
        setNewData(data);
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                + Add New Blog
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddNewBlog handleAddBlog={handleAddBlog} />
                </Modal.Body>
            </Modal>

            <div>
                {/* <button className="btn-add" onClick={handleAddBlog}>+ Add new blog</button> */}
            </div>
            <div className="blog-container">
                {isLoading === false && newData && newData.length > 0 && newData.map(item => {
                    return (
                        <div key={item.id} className="single-blog">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h5 className="blog-title">Title {item.id}: {item.title}</h5>
                                <span style={{ cursor: 'pointer' }} onClick={() => handleDeletePost(item.id)}>X</span>
                            </div>
                            <p className="blog-description">{item.body}</p>
                            <button>
                                <Link to={`/blog/${item.id}`}>View Detail</Link>
                            </button>
                        </div>
                    )
                })}

                {isLoading === true &&
                    <div style={{ textAlign: 'center !important', width: '100%' }}>Loading data...</div>}
            </div>
        </>
    )
}

export default Blog;
