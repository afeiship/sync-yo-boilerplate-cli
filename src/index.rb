#!/usr/bin/env ruby

require "thor"
require "fileutils"

YO_CACHE = "/Users/feizheng/.cache/node-yeoman-remote-cache/afeiship"

module ThorCli
  class SyncYoBoilerplate < Thor
    desc "sync NAME", "Sync github boilerplate to yeoman cache."

    def sync(name)
      dir = "#{YO_CACHE}/#{name}"
      FileUtils.cd(YO_CACHE, :verbose => true) do
        # clean old
        system "rm -rf #{name}"
        system "mkdir -p #{name}/master"

        # download lastet
        system "https_proxy=http://127.0.0.1:9090 wget --directory-prefix=#{dir} https://github.com/afeiship/#{name}/archive/master.tar.gz"
        system "gtar -zxf #{name}/master.tar.gz --strip-components 1  --directory #{name}/master"
      end
    end

    def self.exit_on_failure?
      false
    end
  end
end

ThorCli::SyncYoBoilerplate.start(ARGV)

# ruby src/index.rb sync boilerplate-book-notes
