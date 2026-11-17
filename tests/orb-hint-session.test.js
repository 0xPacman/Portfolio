import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = fs.readFileSync(
  new URL("../lib/orb-hint-session.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const exported = {};
vm.runInNewContext(compiled, { exports: exported });
const {
  ORB_HINT_DELAY_MS,
  readOrbHintSession,
  advanceOrbHintSession,
  isOrbHintDue,
  markOrbHintSession,
} = exported;

test("eligible only after 30 minutes of foreground time", () => {
  let session = readOrbHintSession(null);
  session = advanceOrbHintSession(session, ORB_HINT_DELAY_MS - 1, true);
  assert.equal(isOrbHintDue(session), false);
  session = advanceOrbHintSession(session, 1, true);
  assert.equal(isOrbHintDue(session), true);
});

test("background intervals never consume the viewing delay", () => {
  let session = advanceOrbHintSession(readOrbHintSession(null), 15 * 60 * 1000, true);
  session = advanceOrbHintSession(session, 8 * 60 * 60 * 1000, false);
  assert.equal(session.elapsedMs, 15 * 60 * 1000);
  assert.equal(isOrbHintDue(session), false);
  session = advanceOrbHintSession(session, 15 * 60 * 1000, true);
  assert.equal(isOrbHintDue(session), true);
});

test("saved progress resumes across reloads without counting time away", () => {
  const original = advanceOrbHintSession(readOrbHintSession(null), 29 * 60 * 1000, true);
  const restored = readOrbHintSession(JSON.stringify(original));
  assert.equal(restored.elapsedMs, 29 * 60 * 1000);
  assert.equal(isOrbHintDue(restored), false);
  assert.equal(isOrbHintDue(advanceOrbHintSession(restored, 60 * 1000, true)), true);
});

test("malformed or unsupported session data starts safely", () => {
  const invalid = [
    undefined, null, "", "broken", "null", "[]", "5",
    '{"version":2,"elapsedMs":1800000,"status":"waiting"}',
    '{"version":1,"elapsedMs":-1,"status":"waiting"}',
    '{"version":1,"elapsedMs":"1800000","status":"waiting"}',
    '{"version":1,"elapsedMs":1e999,"status":"waiting"}',
    '{"version":1,"elapsedMs":0,"status":"__proto__"}',
    '{"version":1,"elapsedMs":0,"status":"constructor"}',
    '{"version":1,"elapsedMs":0}',
  ];
  for (const raw of invalid) {
    const session = readOrbHintSession(raw);
    assert.equal(session.status, "waiting");
    assert.equal(session.elapsedMs, 0);
    assert.equal(isOrbHintDue(session), false);
  }
});

test("invalid deltas are ignored and elapsed time is bounded", () => {
  const session = Object.freeze(readOrbHintSession(null));
  for (const delta of [NaN, Infinity, -Infinity, -1, 0]) {
    assert.equal(advanceOrbHintSession(session, delta, true), session);
  }
  const saturated = advanceOrbHintSession(session, Number.MAX_VALUE, true);
  assert.equal(saturated.elapsedMs, ORB_HINT_DELAY_MS);
  assert.equal(readOrbHintSession(JSON.stringify(saturated)).elapsedMs, ORB_HINT_DELAY_MS);
  assert.equal(session.elapsedMs, 0);
});

test("shown or dismissed hints cannot reappear in the same tab session", () => {
  const ready = advanceOrbHintSession(readOrbHintSession(null), ORB_HINT_DELAY_MS, true);
  const shown = markOrbHintSession(ready, "shown");
  assert.equal(isOrbHintDue(shown), false);
  assert.equal(isOrbHintDue(readOrbHintSession(JSON.stringify(shown))), false);
  const dismissed = markOrbHintSession(shown, "dismissed");
  assert.equal(markOrbHintSession(dismissed, "shown"), dismissed);
  assert.equal(advanceOrbHintSession(dismissed, ORB_HINT_DELAY_MS, true), dismissed);
  assert.equal(isOrbHintDue(readOrbHintSession(JSON.stringify(dismissed))), false);
});

test("finding the orb early suppresses the hint permanently for that session", () => {
  const found = markOrbHintSession(readOrbHintSession(null), "discovered");
  assert.equal(found.status, "discovered");
  assert.equal(markOrbHintSession(found, "dismissed"), found);
  assert.equal(markOrbHintSession(found, "shown"), found);
  assert.equal(advanceOrbHintSession(found, ORB_HINT_DELAY_MS, true), found);
  assert.equal(isOrbHintDue(readOrbHintSession(JSON.stringify(found))), false);
});
