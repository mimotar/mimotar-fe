module.exports = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        // port: '',
        // pathname: '/my-bucket/**',
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/djlzl6mzf/**",
      },
    ],
  },
};
