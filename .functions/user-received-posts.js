const { userReceivedPosts } = require("./services/posts");

exports.handler = function (event, context, callback) {
  userReceivedPosts(event.queryStringParameters.user).then((images) =>
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(images),
    })
  );
};
