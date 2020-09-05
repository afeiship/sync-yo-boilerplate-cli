# sync-yo-boilerplate
> Sync yeoman boilerplate cache.

## debug
```shell
ruby ./src/index.rb sync boilerplate-webkit-sassui
```

## installation
```shell
# 1. clone the project
git clone git@github.com:afeiship/sync-yo-boilerplate.git

# 2. install to system
npm run thor:install

# 3. step by step
# ruby src/index.rb sync boilerplate-book-notes
Do you wish to continue [y/N]? y
Please specify a name for src/index.rb in the system repository [index.rb]: sync-yo-boilerplate
Could not find command "install" in "thor_cli:sync_yo_boilerplate" namespace.
Storing thor file in your system repository
```

## usage
```shell
thor thor_cli:sync_yo_boilerplate:sync boilerplate-webkit-sassui
```

## dependencies
- gnu-tar
