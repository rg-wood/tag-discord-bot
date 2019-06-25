"use strict";

const Clapp = require("clapp");

const Table = require("cli-table2");

const str = require("./str-en.js");

class App extends Clapp.App {
  _getHelp() {
    const LINE_WIDTH = 175;

    var r =
      this.name +
      (typeof this.version === "undefined" ? "" : " v" + this.version) +
      "\n" +
      this.desc +
      "\n\n" +
      str.helpUsage +
      this.prefix +
      this.separator +
      str.helpCommand +
      "\n\n" +
      str.helpCommandList +
      "\n\n";

    // Command list
    var table = new Table({
      chars: {
        top: "",
        "top-mid": "",
        "top-left": "",
        "top-right": "",
        bottom: "",
        "bottom-mid": "",
        "bottom-left": "",
        "bottom-right": "",
        left: "",
        "left-mid": "",
        mid: "",
        "mid-mid": "",
        right: "",
        "right-mid": "",
        middle: ""
      },
      colWidths: [
        Math.round(0.15 * LINE_WIDTH), // We round it because providing a decimal number would
        Math.round(0.65 * LINE_WIDTH) // Break cli-table2
      ],
      wordWrap: true
    });

    for (var i in this.commands) {
      table.push([i, this.commands[i].desc]);
    }

    r +=
      "```" +
      table.toString() +
      "```\n\n" +
      str.helpFurtherHelp +
      this.prefix +
      " " +
      str.helpCommand +
      " --help";

    return r;
  }
}

class Command extends Clapp.Command {
  _getHelp(app) {
    const LINE_WIDTH = 175;

    var r = str.helpUsage + " " + app.prefix + " " + this.name;

    // Add every argument to the usage (Only if there are arguments)
    if (Object.keys(this.args).length > 0) {
      var argsTable = new Table({
        chars: {
          top: "",
          "top-mid": "",
          "top-left": "",
          "top-right": "",
          bottom: "",
          "bottom-mid": "",
          "bottom-left": "",
          "bottom-right": "",
          left: "",
          "left-mid": "",
          mid: "",
          "mid-mid": "",
          right: "",
          "right-mid": "",
          middle: ""
        },
        head: ["Argument", "Description", "Default"],
        colWidths: [
          Math.round(0.1 * LINE_WIDTH),
          Math.round(0.45 * LINE_WIDTH),
          Math.round(0.25 * LINE_WIDTH)
        ],
        wordWrap: true
      });
      for (var i in this.args) {
        r += this.args[i].required ? " (" + i + ")" : " [" + i + "]";
        argsTable.push([
          i,
          typeof this.args[i].desc === "undefined" ? "" : this.args[i].desc,
          typeof this.args[i].default === "undefined"
            ? ""
            : this.args[i].default
        ]);
      }
    }

    r += "\n" + this.desc;

    if (Object.keys(this.args).length > 0)
      r +=
        "\n\n" +
        str.helpAvailableArguments +
        ":\n\n```" +
        argsTable.toString() +
        "```";

    // Add every flag, only if there are flags to add
    if (Object.keys(this.flags).length > 0) {
      var flagsTable = new Table({
        chars: {
          top: "",
          "top-mid": "",
          "top-left": "",
          "top-right": "",
          bottom: "",
          "bottom-mid": "",
          "bottom-left": "",
          "bottom-right": "",
          left: "",
          "left-mid": "",
          mid: "",
          "mid-mid": "",
          right: "",
          "right-mid": "",
          middle: ""
        },
        head: ["Option", "Description", "Default"],
        colWidths: [
          Math.round(0.1 * LINE_WIDTH),
          Math.round(0.45 * LINE_WIDTH),
          Math.round(0.25 * LINE_WIDTH)
        ],
        wordWrap: true
      });
      for (i in this.flags) {
        flagsTable.push([
          (typeof this.flags[i].alias === "undefined"
            ? ""
            : "-" + this.flags[i].alias + ", ") +
            "--" +
            i,
          typeof this.flags[i].desc === "undefined" ? "" : this.flags[i].desc,
          typeof this.flags[i].default === "undefined"
            ? ""
            : this.flags[i].default
        ]);
      }

      r +=
        "\n\n" +
        str.helpAvailablOptions +
        ":\n\n```" +
        flagsTable.toString() +
        "```";
    }

    if (Object.keys(this.args).length > 0)
      r += "\n\n" + str.helpArgumentsRequiredOptional;

    return r;
  }
}

module.exports = {
  App: App,
  Argument: Clapp.Argument,
  Command: Command,
  Flag: Clapp.Flag
};
