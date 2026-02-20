import { expect, test, describe, beforeEach } from "bun:test";
const { applyTheme } = require("../script.js");

// Lightweight DOM Mock
class MockElement {
  constructor() {
    this.attributes = {};
    this.textContent = "";
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  getAttribute(name) {
    return this.attributes[name];
  }
}

describe("applyTheme", () => {
  let html;
  let themeBtn;

  beforeEach(() => {
    html = new MockElement();
    themeBtn = new MockElement();
  });

  test("should apply dark theme correctly", () => {
    applyTheme("dark", html, themeBtn);

    expect(html.getAttribute("data-theme")).toBe("dark");
    expect(themeBtn.textContent).toBe("☀️");
    expect(themeBtn.getAttribute("aria-label")).toBe("Switch to light mode");
  });

  test("should apply light theme correctly", () => {
    applyTheme("light", html, themeBtn);

    expect(html.getAttribute("data-theme")).toBe("light");
    expect(themeBtn.textContent).toBe("🌙");
    expect(themeBtn.getAttribute("aria-label")).toBe("Switch to dark mode");
  });

  test("should handle missing themeBtn gracefully", () => {
    applyTheme("dark", html, null);

    expect(html.getAttribute("data-theme")).toBe("dark");
    // Should not throw error
  });

  test("should do nothing if html element is missing", () => {
    const btn = new MockElement();
    applyTheme("dark", null, btn);

    expect(btn.textContent).toBe("");
  });
});
