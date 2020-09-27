const { userSentPosts } = require("./services/posts");
const headers = require("./utils/response");

exports.handler = function (event, context, callback) {
  userSentPosts(event.queryStringParameters.user).then((images) =>
    callback(null, {
      headers,
      statusCode: 200,
      body: JSON.stringify(images),
    })
  ).catch(e => {
    callback(null, {
      headers,
      statusCode: 404,
    })
  });
};