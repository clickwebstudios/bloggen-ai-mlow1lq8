#!/bin/bash
# Fix Docker permissions for admin2 user on VPS
# Run this script as root on the VPS

# Add admin2 to docker group
usermod -aG docker admin2

# Verify
groups admin2

echo "User admin2 added to docker group."
echo "IMPORTANT: User needs to logout and login again for changes to take effect."
echo "Or run: newgrp docker"
