const TaggedNick = require("../lib/tagged-nick");

const untaggedNick = new TaggedNick("Ricardo");

test("untagged nick should parse display name", () => {
  expect(untaggedNick.name).toBe("Ricardo");
});

test("untagged nick should not parse tags", () => {
  expect(untaggedNick.tags).toBeUndefined();
});

test("untagged nick should render display name", () => {
  expect(untaggedNick.toString()).toBe("Ricardo");
});

test("clearing untagged nick should result in identical nick", () => {
  expect(untaggedNick.clearTags()).toEqual(untaggedNick);
});

const taggedNick = new TaggedNick("Ricardo [Test Tag]");

test("tagged nick should parse display name", () => {
  expect(taggedNick.name).toBe("Ricardo");
});

test("tagged nick should parse tag", () => {
  expect(taggedNick.tags).toContain("Test Tag");
});

test("tagged nick should parse tag", () => {
  expect(taggedNick.tags).toContain("Test Tag");
});

test("tagged nick should render identical display name", () => {
  expect(taggedNick.toString()).toBe("Ricardo [Test Tag]");
});

test("clearing tagged nick should result in untagged nick", () => {
  expect(taggedNick.clearTags()).toEqual(untaggedNick);
});

test("adding tag to untagged nick should result in tagged nick", () => {
  expect(untaggedNick.addTag("Test Tag")).toEqual(taggedNick);
});

const multiTaggedNick = new TaggedNick("Ricardo [Test Tag, Test Tag 2]");

test("multi tagged tagged nick should parse display name", () => {
  expect(multiTaggedNick.name).toBe("Ricardo");
});

test("multi tagged nick should parse tag", () => {
  expect(multiTaggedNick.tags).toContain("Test Tag 2");
});

test("adding tag to tagged nick should result in multi-tagged nick", () => {
  expect(taggedNick.addTag("Test Tag 2")).toEqual(multiTaggedNick);
});

test("removing tag from tagged nick should result in untagged nick", () => {
  expect(taggedNick.removeTag("Test Tag")).toEqual(untaggedNick);
});

test("removing tag from multi-tagged nick should result in tagged nick", () => {
  expect(multiTaggedNick.removeTag("Test Tag 2")).toEqual(taggedNick);
});

test("removing tag with partial match  ignoring case from tagged nick should result in untagged nick", () => {
  expect(taggedNick.removeTag("tag")).toEqual(untaggedNick);
});
