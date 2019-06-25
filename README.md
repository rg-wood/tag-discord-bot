# tag-discord-bot [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Bot to tag server nicks.

## Installation

Clone this repository, and run:
```sh
$ npm install
```

## Usage

```sh
$ npm run bot
```

## Bot Usage

To install Tag Bot on your server click on this [link](https://discordapp.com/oauth2/authorize?&client_id=261302296103747584&scope=bot&permissions=388160).

Once you have added Tag Bot, you need to modify it's permissions by going to `Server Settings` and clicking on `Roles`. Click on the `Tag Nick Bot` user and then scroll down the page and enable the `Manage Nicknames` permission.

### Adding Tags

To add a new tag to a user on your server type this message:

```
-tag add <user> <tag>
```

For example, if you wanted to tag a user as inspired you would send a message:

```
-tag add @Ric#0018 "Inspired 🔥"
```

### Clearing Tags

Similarly, the syntax for clearing tags is as follows:

```
-tag clear <user>
```

This should reset your nickname to its previous setting.

You can also remove a tag using the following command:


```
-tag remove <@user> <tag>
```

The tag string matches loosely, so even if you provide a fragment it will still remove matching tags.

## License

MIT © [R.G. Wood](https://grislyeye.com/)

[travis-image]: https://travis-ci.org/rg-wood/tag-discord-bot.svg?branch=master
[travis-url]: https://travis-ci.org/rg-wood/tag-discord-bot
[daviddm-image]: https://david-dm.org/rg-wood/tag-discord-bot.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/rg-wood/tag-discord-bot
