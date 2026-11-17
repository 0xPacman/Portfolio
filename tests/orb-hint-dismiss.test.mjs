import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = fs.readFileSync(new URL("../components/shell/OrbHintDismiss.tsx", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

// Exercise the real component handlers with deterministic pointer timing.
function mount() {
  let now = 0, nextId = 0;
  const timers = new Map(), listeners = new Map(), cleanup = [], actions = [];
  const window = {
    setTimeout(callback, delay) { const id = ++nextId; timers.set(id, { callback, at: now + delay }); return id; },
    clearTimeout(id) { timers.delete(id); },
    addEventListener(name, callback) { listeners.set(name, callback); },
    removeEventListener(name, callback) { if (listeners.get(name) === callback) listeners.delete(name); },
  };
  const jsx = (type, props) => ({ type, props });
  const loadedModule = { exports: {} };
  vm.runInNewContext(compiled, {
    window, document: window, module: loadedModule, exports: loadedModule.exports,
    require(name) {
      if (name === "react") return {
        useRef: current => ({ current }),
        useCallback: callback => callback,
        useEffect: callback => cleanup.push(callback()),
      };
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "lucide-react") return { X: "svg" };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  const button = loadedModule.exports.OrbHintDismiss({
    className: "dismiss",
    onDismiss: () => actions.push("dismiss"),
    onDiscover: () => actions.push("discover"),
  });
  const props = button.props;
  return {
    props, actions, type: button.type,
    pointer(handler, extra = {}) {
      props[handler]({ isPrimary: true, button: 0, pointerType: "touch", pointerId: 1, clientX: 10, clientY: 10, ...extra });
    },
    click() {
      const event = { prevented: false, stopped: false, preventDefault() { this.prevented = true; }, stopPropagation() { this.stopped = true; } };
      props.onClick(event);
      return event;
    },
    contextMenu(type) {
      const event = { nativeEvent: { pointerType: type }, prevented: false, preventDefault() { this.prevented = true; } };
      props.onContextMenu(event);
      return event.prevented;
    },
    advance(ms) {
      now += ms;
      for (const [id, timer] of [...timers]) {
        if (timer.at <= now) { timers.delete(id); timer.callback(); }
      }
    },
    fire: name => listeners.get(name)?.(),
    unmount: () => cleanup.forEach(dispose => dispose?.()),
    timerCount: () => timers.size,
    listenerCount: () => listeners.size,
  };
}

test("a normal tap dismisses the hint without revealing the orb", () => {
  const h = mount();
  assert.equal(h.type, "button");
  assert.equal(h.props.type, "button");
  assert.match(h.props["aria-label"], /dismiss/i);
  h.pointer("onPointerDown"); h.advance(899); h.pointer("onPointerUp"); h.advance(1000);
  assert.deepEqual(h.actions, []);
  assert.equal(h.click().prevented, false);
  assert.deepEqual(h.actions, ["dismiss"]);
});

for (const pointerType of ["touch", "pen"]) {
  test(`${pointerType} hold reveals once and consumes its release click`, () => {
    const h = mount();
    h.pointer("onPointerDown", { pointerType }); h.advance(899);
    assert.deepEqual(h.actions, []);
    h.advance(1); h.advance(2000);
    assert.deepEqual(h.actions, ["discover"]);
    h.pointer("onPointerUp", { pointerType });
    assert.equal(h.click().prevented, true);
    assert.deepEqual(h.actions, ["discover"]);
    h.pointer("onPointerDown", { pointerType }); h.pointer("onPointerUp", { pointerType });
    assert.equal(h.click().prevented, false);
    assert.deepEqual(h.actions, ["discover", "dismiss"]);
  });
}

test("mouse holds and nonprimary touches do not reveal", () => {
  for (const extra of [{ pointerType: "mouse" }, { isPrimary: false }, { altKey: true }, { ctrlKey: true }, { metaKey: true }, { shiftKey: true }]) {
    const h = mount();
    h.pointer("onPointerDown", extra); h.advance(2000);
    assert.deepEqual(h.actions, []);
    assert.equal(h.click().prevented, false);
    assert.deepEqual(h.actions, ["dismiss"]);
  }
});

test("movement, canceled touches, leaving, scrolling, and blur cancel a pending hold", () => {
  for (const cancel of [
    h => h.pointer("onPointerMove", { clientX: 23 }),
    h => h.pointer("onPointerCancel"),
    h => h.pointer("onPointerLeave"),
    h => h.fire("scroll"),
    h => h.fire("blur"),
    h => h.fire("visibilitychange"),
  ]) {
    const h = mount();
    h.pointer("onPointerDown"); h.advance(600); cancel(h); h.advance(1000);
    assert.deepEqual(h.actions, []);
    assert.equal(h.timerCount(), 0);
  }
});

test("touch callouts are suppressed without disabling desktop context menus", () => {
  const h = mount();
  h.pointer("onPointerDown");
  assert.equal(h.contextMenu("touch"), true);
  assert.equal(h.contextMenu(undefined), true);
  h.pointer("onPointerDown", { pointerType: "mouse", button: 2 });
  assert.equal(h.contextMenu("mouse"), false);
  h.props.onKeyDown();
  assert.equal(h.contextMenu(undefined), false);
});

test("keyboard activation dismisses instead of discovering", () => {
  const h = mount();
  h.pointer("onPointerDown"); h.advance(600); h.props.onKeyDown(); h.advance(1000);
  assert.equal(h.click().prevented, false);
  assert.deepEqual(h.actions, ["dismiss"]);
});

test("unmount cancels a pending hold and removes listeners", () => {
  const h = mount();
  h.pointer("onPointerDown"); h.unmount(); h.advance(1000);
  assert.deepEqual(h.actions, []);
  assert.equal(h.timerCount(), 0);
  assert.equal(h.listenerCount(), 0);
});
