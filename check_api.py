import requests
import json

# Try common API endpoints
urls_to_try = [
    "https://desci.world/api/projects",
    "https://desci.world/api/v1/projects",
    "https://desci.world/projects.json",
    "https://desci.world/projects?format=json",
    "https://desci.world/_next/data/projects.json",  # Next.js data
]

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
}

print("🔍 Checking for API endpoints...")
for url in urls_to_try:
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            print(f"✅ FOUND: {url}")
            print(f"   Status: {response.status_code}")
            print(f"   Content-Type: {response.headers.get('content-type', 'unknown')}")
            # Try to parse as JSON
            try:
                data = response.json()
                print(f"   JSON Keys: {list(data.keys()) if isinstance(data, dict) else 'List with ' + str(len(data)) + ' items'}")
                # Save if it looks like projects
                with open("api_response.json", "w") as f:
                    json.dump(data, f, indent=2)
                print(f"   💾 Saved to api_response.json")
            except:
                print(f"   Preview: {response.text[:200]}...")
        else:
            print(f"❌ {url} - Status {response.status_code}")
    except Exception as e:
        print(f"❌ {url} - Error: {e}")
