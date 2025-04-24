# Bluesky RSS

This is a script that checks an RSS feed, and will post the latest entry to a Bluesky account.

I wrote this for my own purposes, so there's a couple hard-coded preferences to work around.

First, you'll probably want to revise the generated message template.

Second, it requires that there is an image in the RSS item. That might not be a requirement for your feed.

Finally, it will not post if the _latest_ Bluesky post matches the newly generated post. If your Bluesky account hosts mixed content, you might want a different method for avoiding repeat posts.

I'll update this package with more sophisticated options if there's any interest. Please let me know if you find this of use!

## To run locally…

- `npm run build` from `post` folder
- `node -e 'import("./lib/index.js").then( loadedModule => loadedModule.main() )'`

## To deploy…

- `doctl sls deploy . --verbose-build --env ./.env` from root

Deployments are slow.

It doesn’t build on remote-builds for unknown reasons.
