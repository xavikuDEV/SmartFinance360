const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

// Fix para framer-motion/tslib en web
config.resolver.sourceExts.push("mjs");

module.exports = withNativeWind(config, { input: "./src/theme/global.css" });
