const Clapp = require("../modules/clapp-discord");
const TaggedNick = require("../tagged-nick");

module.exports = new Clapp.Command({
  name: "add",
  desc: "add a tag to user nick",
  fn: (argv, context) =>
    new Promise((resolve, _) => {
      const message = context.msg;
      const memberId = argv.args.user.match(/^<@[!]?([0-9]+)>$/)[1];
      const member = message.guild.members.get(memberId);

      if (!member) {
        resolve(`Could not find user ${argv.args.user}!`);
        return;
      }

      // TODO verify target user is not admin otherwise we don't have permissions
      if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) {
        resolve(`Tag Bot needs privileges to alter a user's nick.`);
        return;
      }

      resolve(
        `Adding tag "${argv.args.tag}" to user ${member.displayName}'s nick.`
      );

      const nick = new TaggedNick(member.displayName).addTag(argv.args.tag);

      member.setNickname(nick.toString()).catch(console.error);
    }),
  args: [
    {
      name: "user",
      desc: "User",
      type: "string",
      required: true
    },
    {
      name: "tag",
      desc: "Tag",
      type: "string",
      required: true
    }
  ]
});
