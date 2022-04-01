import { useParams, useHistory } from "react-router-dom";
import useFetch from '../customize/fetch.js';

const DetailBlog = () => {
    let { id } = useParams();
    let history = useHistory();

    const { data: dataBlogDetails, isLoading, isError } =
        useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`, false);

    const handleBackPage = () => {
        history.push("/blog");
    }
    return (
        <>
            <div>
                <span
                    style={{ fontSize: "30px", cursor: "pointer" }}
                    onClick={handleBackPage}
                >
                    &larr;
                </span>
            </div>
            <h3>This is a detail of blog {id}</h3>
            <div className="blog-detail">
                {isLoading === false && dataBlogDetails &&
                    <>
                        <h3 className="title">Title: {dataBlogDetails.title}</h3>
                        <p className="content">{dataBlogDetails.body}</p>
                    </>
                }

                {isLoading === true &&
                    <div>Loading data...</div>
                }
            </div>
        </>
    )
}

export default DetailBlog;