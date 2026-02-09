
from playwright.sync_api import sync_playwright

def verify_design():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # 1. Verify Main Marketplace View
        page.goto("http://localhost:3000")
        page.wait_for_selector("text=Marketplace") # Ensure loaded

        # Take a screenshot of the top of the page (Header + First row of cards)
        page.screenshot(path="verification_main.png")
        print("Main view screenshot saved to verification_main.png")

        # 2. Verify Empty State
        # Type something in search that won't match
        page.fill("input[placeholder='Search...']", "XYZ123ThisWillNotMatch")
        page.press("input[placeholder='Search...']", "Enter")

        # Wait for "No results found"
        try:
            page.wait_for_selector("text=No results found", timeout=5000)
            page.screenshot(path="verification_empty.png")
            print("Empty state screenshot saved to verification_empty.png")
        except Exception as e:
            print(f"Empty state verification failed: {e}")
            page.screenshot(path="verification_error.png")

        browser.close()

if __name__ == "__main__":
    verify_design()
