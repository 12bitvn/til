build:
	hugo  --gc --minify --buildFuture --enableGitInfo && yarn run precache
