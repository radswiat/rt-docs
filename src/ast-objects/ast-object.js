export default class AstObject {
  parseComments(comments) {
    let newComments = [];

    // lets clean a comment block
    comments = comments.replace(/\*/g, '');

    // split each @tag by regex
    let r = comments.match(/((\@)([A-Za-z]){0,})(((.|[\r\n])(?!(\@))){0,})/g);

    // for each tag, split @tag name and the content
    r.forEach((tag) => {
      let c = tag.match(/(\@[a-z]+)((\s)+)(.+)/);
      let tagType = c[1].replace(/@/g, '');
      let req = `../kind-object/${tagType}`;
      newComments.push(new (require(req).default)(tag, tagType, c[4]));
    });
    return newComments;
  }
}
