const { userReceivedPosts } = require("./services/posts");
const headers = require("./utils/response");

exports.handler = function (event, context, callback) {
  userReceivedPosts(event.queryStringParameters.user).then((images) =>
    callback(null, {
      headers,
      statusCode: 200,
      body: JSON.stringify(images),
    })
  );
};
