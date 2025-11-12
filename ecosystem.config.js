module.exports = {
  apps: [
    {
      name: "mock-sso-portal",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "development",
        PORT: 3004,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};

