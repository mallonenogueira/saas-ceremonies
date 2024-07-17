aws ecr get-login-password --region us-east-1 | sudo docker login --username AWS --password-stdin 156280051339.dkr.ecr.us-east-1.amazonaws.com
sudo docker stop backend-server
sudo docker rm backend-server
sudo docker run -p 80:3000 -e DATABASE_URL -itd --name backend-server 156280051339.dkr.ecr.us-east-1.amazonaws.com/saas-ceremonies:latest


# ssh -i my-key-gen ec2-user@44.204.133.95 <<-'ENDSSH'
# aws ecr get-login-password --region us-east-1 | sudo docker login --username AWS --password-stdin 156280051339.dkr.ecr.us-east-1.amazonaws.com
# sudo docker stop backend-server
# sudo docker rm backend-server
# sudo docker run -p 80:3000 -e DATABASE_URL -itd --name backend-server 156280051339.dkr.ecr.us-east-1.amazonaws.com/saas-ceremonies:latest
# ENDSSH
## sudo docker run -p 80:3000 -e DATABASE_URL='postgres://postgres@10.0.1.159:5432/saas-client' -itd --name backend-server 156280051339.dkr.ecr.us-east-1.amazonaws.com/saas-ceremonies:latest