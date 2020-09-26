import { api } from "./constants";

const userReceivedPosts = user => fetch(`${api}/user-received-posts?user=${user}`).then(res => res.json());

export default { userReceivedPosts };