const fetch = require("node-fetch");
const { imageDataFromResponse, maxPostPage } = require("../utils/transform");
const { MAX_PAGE_ITERATIONS } = require("../config");

const FIRST_ITERABLE_PAGE = 2;

const postsFromUrl = (url, from = true) => {
  return fetch(url)
    .then((response) => response.text())
    .then((response) => {
      return imageDataFromResponse(response, from);
    })
};

const firstPageDataFromUrl = (url, from = true) => {
  return fetch(url)
    .then(
      (response) => response.text())
    .then((response) => {
      return {
        firstPosts: imageDataFromResponse(response, from),
        maxPage: maxPostPage(response),
      };
    });
};

const postsFromRange = (maxPage, url, from = true) => {
  const request = [];
  const limit = maxPage > MAX_PAGE_ITERATIONS ? MAX_PAGE_ITERATIONS : maxPage;
  
  return new Promise((resolve) => {
    for (var i = FIRST_ITERABLE_PAGE; i <= limit; i++) {
      request.push(postsFromUrl(`${url}/${i}`, from));
    }
    Promise.all(request).then((result) => resolve(result.flat()));
  });
};

const posts = (url, from = true) =>
  firstPageDataFromUrl(url, from).then(({ firstPosts, maxPage }) =>
    maxPage > 1
      ? postsFromRange(maxPage, url, from).then((newPosts) => [
          ...firstPosts,
          ...newPosts,
        ])
      : firstPosts
  );

const userReceivedPosts = (user) => {
  return posts(`https://www.postcrossing.com/user/${user}/gallery/received/`);
};
const userSentPosts = (user) => {
  return posts(`https://www.postcrossing.com/user/${user}/gallery/sent`, false);
};

module.exports = { userReceivedPosts, userSentPosts };
