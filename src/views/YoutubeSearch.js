import '../App.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment';

const YouTubeSearch = () => {
    const [videos, setVideos] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {

    }, [])

    const handleSearchYoutube = async () => {
        let res = await axios({
            "method": "GET",
            "url": 'https://www.googleapis.com/youtube/v3/search',
            "params": {
                'part': 'snippet',
                'maxResults': '20',
                'key': 'AIzaSyB_CxzJp0WG9pI2Ojt1jV12BQDkyAABrQw',
                'type': 'video',
                'q': query
            }
        })

        if (res && res.data && res.data.items) {
            let raw = res.data.items;
            let result = [];

            if (raw && raw.length > 0) {
                raw.map(item => {
                    let object = {};
                    object.id = item.id.videoId;
                    object.title = item.snippet.title;
                    object.createdAt = item.snippet.pushlishedAt;
                    object.author = item.snippet.channelTitle;
                    object.description = item.snippet.description;

                    result.push(object);
                })
            }

            setVideos(result);
        }
    }

    return (
        <div className="yt-search-container">
            <h4>Youtube Search</h4>
            <div className="yt-search">
                <input
                    type="text" className="yt-search" placeholder="Search here..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                >
                </input>
                <button onClick={handleSearchYoutube}>Search</button>
            </div>

            {videos && videos.length > 0 &&
                videos.map(item => {
                    return (
                        <div className="yt-result" key={item.id}>
                            <div className="yt-result-video">
                                <iframe
                                    className="yt-iframe"
                                    src={`https://www.youtube.com/embed/${item.id}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                >
                                </iframe>
                            </div>
                            <div className="yt-result-description">
                                <div className="title">
                                    {item.title}
                                </div>
                                <div className="created-at">
                                    Created At: {moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss A')}
                                </div>
                                <div className="author">
                                    Author: {item.author}
                                </div>
                                <div className="description">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    )
                })
            }


        </div>
    )

}


export default YouTubeSearch;