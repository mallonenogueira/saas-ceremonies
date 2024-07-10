# install
sudo yum install cronie -y
# enable the service
sudo systemctl enable crond.service
# start the service
sudo systemctl start crond.service
# verify success
sudo systemctl status crond | grep Active

# also you can:
sudo systemctl status crond.service