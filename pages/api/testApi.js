import axios from "axios";

export const getFeeds = async () => axios.get('https://jsonplaceholder.typicode.com/posts');