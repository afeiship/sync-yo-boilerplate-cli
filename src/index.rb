#!/usr/bin/env ruby

require "thor"
require "fileutils"
require "tty-spinner"

YO_CACHE = "/Users/feizheng/.cache/node-yeoman-remote-cache/afeiship"

module ThorCli
  class SyncYoBoilerplate < Thor
    desc "sync NAME", "Sync github boilerplate to yeoman cache."

    def sync(name)
      spinners = TTY::Spinner::Multi.new("[:spinner] task start", format: :spin)
      sp1 = spinners.register "[:spinner] 1. clean old files"
      sp2 = spinners.register "[:spinner] 2. get files with proxy from github: #{name}"

      dir = "#{YO_CACHE}/#{name}"
      FileUtils.mkdir_p YO_CACHE
      FileUtils.cd(YO_CACHE, :verbose => true) do
        sp1.auto_spin
        # clean old
        system "rm -rf #{name}"
        system "mkdir -p #{name}/master"

        sp1.success

        sp2.auto_spin
        # download lastet
        system "https_proxy=http://127.0.0.1:9090 wget -q  --directory-prefix=#{dir} https://github.com/afeiship/#{name}/archive/master.tar.gz"
        system "gtar -zxf #{name}/master.tar.gz --strip-components 1  --directory #{name}/master"
        sp2.success
      end
    end

    def self.exit_on_failure?
      false
    end
  end
end

ThorCli::SyncYoBoilerplate.start(ARGV)

# ruby src/index.rb sync boilerplate-book-notes
