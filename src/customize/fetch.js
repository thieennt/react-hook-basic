import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const useFetch = (url, isCovidData) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const ourRequest = axios.CancelToken.source();

        async function fetchData() {
            try {
                let res = await axios.get(url, {
                    cancelToken: ourRequest.token
                });
                let data = res && res.data ? res.data : [];
                if (data && data.length > 0 && isCovidData === true) {
                    data.map(item => {
                        item.Date = moment(item.Date).format('DD-MM-YYYY');
                        return item;
                    })
                    data.reverse();
                }
                setData(data);
                setIsLoading(false);
                setIsError(false);
            }
            catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else {
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        }

        setTimeout(() => {
            fetchData();
        }, 2000);

        return () => {
            ourRequest.cancel('Operation canceled by the user.');
        }

    }, []);

    return {
        data, isLoading, isError
    }
}

export default useFetch;