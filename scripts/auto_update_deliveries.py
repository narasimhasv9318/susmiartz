import os
import glob
import re
import urllib.parse

# Working directory for the script will be the root of the git repo
js_file = 'data.js'
img_dir = 'assets/deliveries'

# Get all images
types = ('*.jpeg', '*.jpg', '*.png', '*.webp', '*.gif')
files = []
for ext in types:
    files.extend(glob.glob(os.path.join(img_dir, ext)))

# Sort by filename descending (newest WhatsApp names will be first)
files.sort(reverse=True)

# Generate JS array content
js_array = "const DELIVERIES_DATA = [\n"
for i, f in enumerate(files):
    # Encode the path for safe rendering in HTML correctly keeping slashes
    safe_path = urllib.parse.quote(f)
    js_array += f"    {{\n        id: 'delivery-auto-{i}',\n        status: 'Collected',\n        image: '{safe_path}'\n    }}"
    if i < len(files) - 1:
        js_array += ",\n"
    else:
        js_array += "\n"
js_array += "];"

# Read the current data.js file
if not os.path.exists(js_file):
    print(f"Error: {js_file} does not exist.")
    exit(1)

with open(js_file, 'r') as file:
    content = file.read()

# Replace existing DELIVERIES_DATA array safely using Regex
# Matches everything from 'const DELIVERIES_DATA = [' to '];'
pattern = re.compile(r"const DELIVERIES_DATA = \[.*?\];", re.DOTALL)
new_content = pattern.sub(js_array, content)

with open(js_file, 'w') as file:
    file.write(new_content)

print(f"✅ Successfully auto-updated {js_file} with {len(files)} delivery images!")
