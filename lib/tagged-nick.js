module.exports = class TaggedNick {
  constructor(nickname, tag) {
    const matches = nickname.match(/^(.*?)( +\[(.*)\].*)?$/);

    if (matches) {
      this.name = matches[1].trim();
      if (matches[3]) {
        this.tags = matches[3];
      } else if (tag) {
        this.tags = tag;
      }
    }
  }

  clearTags() {
    return new TaggedNick(this.name);
  }

  addTag(tag) {
    if (this.tags) {
      return new TaggedNick(this.name, `${this.tags}, ${tag}`);
    }

    return new TaggedNick(this.name, tag);
  }

  removeTag(tag) {
    if (this.tags) {
      return new TaggedNick(
        this.name,
        this.tags
          .split(", ")
          .filter(t => !t.toLowerCase().includes(tag.toLowerCase()))
          .join(", ")
      );
    }

    return this;
  }

  toString() {
    return `${this.name}${this.tags ? ` [${this.tags}]` : ""}`;
  }
};
