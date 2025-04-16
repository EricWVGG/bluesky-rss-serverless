# Bluesky RSS Serverless poster

This is a Digital Ocean serverless function that will take an RSS feed and post the latest item to Bluesky.

Edit the `generateMessage.ts` file to make a post template.

Note that this script is configured to run on a cron, and has no way of knowing if the latest RSS item has already been posted. This script is best for feeds that update on some kind of predictable schedule.

I’m a bit new to serverless functions, so I’m unsure if there’s a good solution for checking old/repeat entries, or if the bot’s feed needs to be manually checked upon initiation. (That would be… undesireable… as these functions are billed by time and can be shut down if they take too long.)

## notes to self

First, yes, we’re stuck with `npm`.

I’m not sure if `.env` has be in both root and `packages/[project-name]/[action]/`

## To run locally…

- `npm run build` from `post` folder
- `node -e 'import("./lib/index.js").then( loadedModule => loadedModule.main() )'`

## To deploy…

- `doctl sls deploy . --verbose-build --env ./.env` from root

Deployments are slow.

It doesn’t build on remote-builds for unknown reasons.
