const Clapp = require("../modules/clapp-discord");

module.exports = new Clapp.Command({
  name: "clear",
  desc: "clear all tag for a user",
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

      resolve(`Clearing all tags from user ${member.displayName}'s nick.`);

      const match = member.displayName.match(/^(.*)\[.*\].*$/);
      const clearedNick = match[1].trim();

      member.setNickname(`${clearedNick}`).catch(console.error);
    }),
  args: [
    {
      name: "user",
      desc: "User",
      type: "string",
      required: true
    }
  ]
});
