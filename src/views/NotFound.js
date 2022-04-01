import { useHistory } from 'react-router-dom';

const NotFound = () => {
    let history = useHistory();
    const handleClickBtn = () => {
        history.push('/')
    }

    return (
        <div className="not-found-container">
            <h4>This's an error.</h4>
            <p>The requested URL/badpage was not found on the server.</p>
            <button className="btn btn-primary" onClick={handleClickBtn}>Go to homepage</button>
        </div>
    )
}

export default NotFound;