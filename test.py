import requests

API_URL = "http://localhost:3000/posts"
ADMIN_USERNAME = "adminrole"
USER_USERNAME = "userrole"

post_data = {
    "title": "Test Post",
    "topic": ["tech"],
    "message": "This is a test post",
    "hashtags": ["#test"]
}

# Admin creates a post
response = requests.post(API_URL, json=post_data, headers={"username": ADMIN_USERNAME})
print(response.text)

# User tries to create a posts
response = requests.post(API_URL, json=post_data, headers={"username": USER_USERNAME})
print(response.text)

# Get all posts as admin
response = requests.get(API_URL, headers={"username": ADMIN_USERNAME})
print(response.text)

# Get all posts as user
response = requests.get(API_URL, headers={"username": USER_USERNAME})
print(response.text)

post_id = "6609bf50719fd24cb3c8c751"

# Admin updates a post
updated_post_data = {
    "title": "Updated Test Post",
    "message": "This post has been updated"
}
response = requests.patch(f"{API_URL}/{post_id}", json=updated_post_data, headers={"username": ADMIN_USERNAME})
print(response.text)

# Admin deletes a post
response = requests.delete(f"{API_URL}/{post_id}", headers={"username": ADMIN_USERNAME})
print(response.text)

# Admin deletes all posts
response = requests.delete(API_URL, headers={"username": ADMIN_USERNAME})
print(response.text)

# Attempt by a regular user to delete all posts (admin command)
response = requests.delete(API_URL, headers={"username": USER_USERNAME})
print(response.text)

# Attempt by a regular user to delete a specific post by ID (admin command)
post_id = "6609bf50719fd24cb3c8c751" 
response = requests.delete(f"{API_URL}/{post_id}", headers={"username": USER_USERNAME})
print(response.text)