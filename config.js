const opts = {
  identity: {
    username: "Aspiringly", // Your bot name here
    password: "oauth:xraa26ggt8e3boutvd9kchpkr72rau", // Your oauth string here (including the 'oauth:' part at the beginning)
  },
  channels: [
    "aspirepainting", // Your channel name
    // "SAS_Grizz", // The bot can be active on multiple channels at a time. Or, you can switch channels by commenting/uncommenting.
  ],
  channel_bots: [
    "pretzelrocks",
  ]
};

module.exports = { opts: opts };
  