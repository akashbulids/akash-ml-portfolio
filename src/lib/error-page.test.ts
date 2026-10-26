import { describe, expect, it } from "vitest";
import { renderErrorPage } from "./error-page";

describe("server error page", () => {
  it("uses the portfolio's dark surfaces and readable text colors", () => {
    const html = renderErrorPage();

    expect(html).toContain("background: radial-gradient");
    expect(html).toContain("#101014");
    expect(html).toContain("background: #1B151D");
    expect(html).toContain("color: #E7DDE0");
    expect(html).not.toContain("background: #fff");
    expect(html).not.toContain("background: #fafafa");
  });
});
