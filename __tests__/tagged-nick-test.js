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
