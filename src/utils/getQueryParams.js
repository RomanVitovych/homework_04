import queryString from 'query-string';

const getQueryParams = (string) => {
    return queryString.parse(string);
};

export default getQueryParams;