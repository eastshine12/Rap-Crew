import axios from "axios";
import { useQuery } from "react-query";

const fetchPosts = async (limit = 10) => {
  const { data } = await axios("https://jsonplaceholder.typicode.com/posts");
  const result = data.filter((x) => x.id <= limit);
  return result;
};

const usePosts = (limit) => {
  return useQuery(["posts", limit], () => fetchPosts(limit));
};

export { usePosts, fetchPosts };