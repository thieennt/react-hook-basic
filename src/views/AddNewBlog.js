import './Blog.scss';
import { useState } from 'react';
import axios from 'axios';

const AddNewBlog = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        if (!title) {
            alert('Empty title!');
            return;
        }

        if (!content) {
            alert('Empty content!');
            return;
        }

        let data = {
            title: title,
            body: content,
            userId: 1,
        }

        let res = await axios.post('https://jsonplaceholder.typicode.com/posts', data);

        if (res && res.data) {
            let newBlog = res.data;
            props.handleAddBlog(newBlog);
        }
    }

    return (
        <div className="add-new-container">
            <div className="input-data">
                <label>Title: </label>
                <input type="text" name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}>
                </input>
            </div>
            <div className="input-data">
                <label>Content: </label>
                <input type="text" name="content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}>
                </input>
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AddNewBlog;