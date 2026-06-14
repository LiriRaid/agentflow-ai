#!/usr/bin/env node
'use strict';
// Background watcher for NOTIFY.md (asyncRewake hook).
// Launched on every Stop event. Polls until NOTIFY.md appears, then
// exits with code 2 to wake the Claude session with the notification.
// If .away-mode exists, exits immediately — Away Mode handles monitoring.
const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const notifyFile = path.join(cwd, 'NOTIFY.md');
const awayFile = path.join(cwd, '.away-mode');

if (fs.existsSync(awayFile)) process.exit(0);
if (fs.existsSync(notifyFile)) deliver();

const POLL_MS = 10_000;
const MAX_MS  = 30 * 60_000;
const start   = Date.now();

const timer = setInterval(() => {
  if (fs.existsSync(awayFile)) { clearInterval(timer); process.exit(0); }
  if (Date.now() - start > MAX_MS) { clearInterval(timer); process.exit(0); }
  if (fs.existsSync(notifyFile)) { clearInterval(timer); deliver(); }
}, POLL_MS);

function deliver() {
  const content = fs.readFileSync(notifyFile, 'utf8').trim();
  try { fs.unlinkSync(notifyFile); } catch {}
  if (!content) process.exit(0);
  process.stdout.write('\n' + content + '\n');
  process.exit(2);
}
