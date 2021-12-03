#!/usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');
const del = require('del');
const mkdirp = require('mkdirp');
const HttpsProxyAgent = require('https-proxy-agent');
const Listr = require('listr');
const list = require('./list.json');

// next packages:
require('@jswork/next');
require('@jswork/next-absolute-package');
require('@jswork/next-node-downfile');

const { version } = nx.absolutePackage();
const program = new Command();
const { execSync, exec } = require('child_process');
const YO_CACHE = `${process.env.HOME}/.cache/node-yeoman-remote-cache/afeiship`;

program.version(version);

program
  .option('-a, --all', 'Sync all list.json boilerplate.')
  .option('-p, --proxy', 'If use http(s) proxy url(default: 127.0.0.1:9090).')
  .option('-t, --target <string>', 'Boilerplate name (eg: boilerplate-cli).')
  .parse(process.argv);

nx.declare({
  statics: {
    init() {
      const app = new this();
      app.start();
    }
  },
  properties: {
    agent() {
      return program.proxy
        ? new HttpsProxyAgent('http://127.0.0.1:9090')
        : null;
    }
  },
  methods: {
    init() {
      this.tasks = new Listr([
        {
          title: 'step1: clean up dir',
          task: () => {
            return this.clean();
          }
        },
        {
          title: 'step2: donwload & extract.',
          task: () => {
            return this.download();
          }
        }
      ]);
    },
    clean() {
      this.dir = `${YO_CACHE}/${program.target}`;
      del.sync(this.dir, { force: true });
      mkdirp.sync(this.dir);
      mkdirp.sync(`${this.dir}/master`);
    },
    download() {
      return nx.nodeDownfile({
        url: `https://github.com.cnpmjs.org/afeiship/${program.target}/archive/master.tar.gz`,
        filename: `${this.dir}/master.tar.gz`
      });
    },
    start() {
      if (program.target) {
        this.tasks.run().then((res) => {
          execSync(
            `cd ${YO_CACHE} && gtar -zxf ${program.target}/master.tar.gz --strip-components 1  --directory ${program.target}/master`
          );
        });
      }

      if (program.all) {
        const items = list.map((target, index) => {
          return {
            title: `step ${index + 1}: ${target}`,
            task: () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  execSync(`sybc -p -t ${target}`);
                  resolve();
                }, 0);
              });
            }
          };
        });
        const tasks = new Listr(items);
        tasks.run().then((res) => {
          console.log('🤡 tasks done!');
        });
      }
    }
  }
});

// sybc -t boilerplate-cli -p
// /Users/aric.zheng/github/sync-yo-boilerplate-cli
// gtar -zxf boilerplate-cli/master.tar.gz --strip-components 1  --directory boilerplate-cli/master
