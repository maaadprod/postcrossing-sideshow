const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const FIRST_PAGE = 1;

const imageElementInfo = (from) => (element) => {
  const image = element.getElementsByClassName("gallery").item(0).href;
  const name = element.getElementsByTagName("figcaption").item(0)
    .firstElementChild.text;

  const metaPart = element
    .getElementsByTagName("figcaption")
    .item(0)
    .getElementsByTagName("div")
    .item(0);
  const extraFields = {};
  const userKey = from ? "from" : "to";
  extraFields[userKey] = metaPart.firstElementChild.text;
  const flagPart = metaPart.getElementsByTagName("a").item(1);
  const country = flagPart
    ? flagPart.firstElementChild.classList[1].replace("flag-", "")
    : null;

  return { name, image, ...extraFields, country };
};

const imageDataFromResponse = (response, from) => {
  const dom = new JSDOM(response);
  const postcardImageList = dom.window.document.getElementsByClassName(
    "postcardImageList"
  );
  const elements = Array.prototype.slice.call(
    postcardImageList.item(0).getElementsByTagName("figure")
  );
  return elements.map(imageElementInfo(from));
};

const maxPostPage = (response) => {
  const dom = new JSDOM(response);
  const pagination = dom.window.document
    .getElementsByClassName("pagination")
    .item(0);
  if (!pagination) {
    return FIRST_PAGE;
  }
  const pageLinks = Array.prototype.slice.call(
    pagination.getElementsByTagName("a")
  );
  const lastLinkUrl = pageLinks[pageLinks.length - 1].href;
  const lastLinkUrlParts = lastLinkUrl.split("/");

  return lastLinkUrlParts[lastLinkUrlParts.length - 1];
};

module.exports = { imageDataFromResponse, maxPostPage };
