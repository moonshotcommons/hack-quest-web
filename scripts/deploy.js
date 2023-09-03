#!/usr/bin/env node

const cp = require('node:child_process');
const { promisify } = require('node:util');
const { existsSync } = require('node:fs');
const { writeFile, unlink } = require('node:fs/promises');
const { resolve } = require('node:path');
const express = require('express');
const exec = promisify(cp.exec);
const port = process.env.SITE_PORT || '5126';
const pkg = require('../package.json');

const app = express();

// build
async function buildVite(root) {
  let output = '';

  // build vite
  try {
    const { stdout, stderr } = await exec('pnpm run build', {
      cwd: root
    });
    output += stdout;
    if (stderr) {
      output += stderr;
    }
  } catch (e) {
    console.error(e);
  }

  return output;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.get('/', async (req, res) => {
  const site = 'hackquest';

  // check if site is in building
  const lockFile = `${__dirname}/${site}.lock`;
  if (existsSync(lockFile)) {
    res.status(400);
    res.send('[error] site is in building.');
    return;
  }

  // create lock file
  await writeFile(lockFile, 'lock', 'utf8');

  if (req.headers['user-agent']) {
    res.set('Content-type', 'text/plain');
  } else {
    res.set('Content-Type', 'application/octet-stream');
  }

  res.write('[deploy started]\n');
  res.write(`[sites version: ${pkg.version}]\n`);

  // pull latest codes
  let gitout = '';
  try {
    res.write('[start to git pull]\n');
    const shell = __dirname + '/pull.sh';
    const { stdout, stderr } = await exec(shell);
    gitout = stdout;
    res.write(stdout);
    if (stderr) {
      res.write('[stderr]\n' + stderr);
    }
    res.write('---- git pull ok\n');
  } catch (e) {
    console.error(e);
    res.write('[error]\n' + e);
    res.end();
    return;
  }

  // install dependencies if needed
  if (gitout.includes('pnpm-lock.yaml')) {
    try {
      res.write('[lock file changed, need install dependencies]\n');
      const { stdout, stderr } = await exec('pnpm i', {
        env: {
          PATH: process.env.PATH
        }
      });
      res.write(stdout);
      if (stderr) {
        res.write('[stderr]\n' + stderr);
      }
      res.write('---- dependencies installed\n');
    } catch (e) {
      res.write('[error]\n' + e);
      res.end();
      return;
    }
  }

  // build
  const root = resolve(__dirname, '../');
  res.write('[start to build by `pnpm run build`]\n');
  const output = await buildVite();
  res.write(output);
  res.write('---- vite built\n');

  // echo message
  res.write('[Successfully deployed]\n');

  // remove lock file
  await unlink(lockFile);

  // save a log
  await writeFile(`${new Date().toISOString()}.log`, output, 'utf8');

  // exit process if `deploy.js` or `build/utils.js` has been changed
  // then pm2 will restart this process automatically
  if (gitout.includes('deploy.js') || gitout.includes('build/utils.js')) {
    res.write('[deploy scripts updated, exiting process to restart]\n');
    res.end();
    await sleep(100);
    process.exit(0);
  } else {
    res.end();
  }
});

app.listen(port, () => {
  console.log('Sites deploy service running on:', port);
});
