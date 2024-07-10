provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "main" {
  cidr_block = var.cidr_block
  tags = {
    Name = "Saas - Vpc create with terraform on saas project"
  }
}

resource "aws_internet_gateway" "main_gw" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "Saas - Main internet gateway"
  }
}

resource "aws_route_table" "second_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main_gw.id
  }

  tags = {
    Name = "Saas - 2nd Route Table"
  }
}

resource "aws_eip" "nat" {
  domain = "vpc"
}

resource "aws_nat_gateway" "main" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public_subnet.id

  tags = {
    Name = "Saas - main-nat-gateway"
  }
}

resource "aws_route" "private_nat_gateway" {
  route_table_id         = aws_route_table.private_rt.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.main.id
}

resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "Saas - Private with NAT Route Table"
  }
}

resource "aws_route_table_association" "private_subnet_asso" {
  subnet_id      = aws_subnet.private_subnet.id
  route_table_id = aws_route_table.private_rt.id
}

resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet
  availability_zone       = var.aws_availability_zone
  map_public_ip_on_launch = true

  tags = {
    Name = "Saas - Public subnet"
  }
}

resource "aws_subnet" "private_subnet" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet
  availability_zone = var.aws_availability_zone

  tags = {
    Name = "Saas - Private subnet"
  }
}

resource "aws_route_table_association" "public_subnet_asso" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.second_rt.id
}

resource "aws_security_group" "db_security_group" {
  name        = "PostgreSQL"
  description = "Allow SSH and PostgreSQL inbound traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "PostgreSQL"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_tls"
    Name = "Saas - DatabaseSecurityGroup"
  }
}

resource "aws_security_group" "backend_security_groug" {
  name   = "Backend secutiry group"
  vpc_id = aws_vpc.main.id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Saas - BackendSecurityGroup"
  }
}

resource "aws_instance" "db" {
  ami           = "ami-06c68f701d8090592"
  instance_type = var.instance_type
  key_name      = aws_key_pair.ssh_key.key_name

  associate_public_ip_address = false
  subnet_id                   = aws_subnet.private_subnet.id
  vpc_security_group_ids      = [aws_security_group.db_security_group.id]

  user_data = templatefile("/home/mallone/projects/saas-ceremonies/install_postgress.sh", {
    pg_hba_file     = templatefile("/home/mallone/projects/saas-ceremonies/pg_hba.conf", { allowed_ip = "0.0.0.0/0" }),
    postgresql_file = templatefile("/home/mallone/projects/saas-ceremonies/postgresql.conf", { allowed_ip = "*" }),
  })

  tags = {
    Database = "PostgreSQL"
    Name     = "DatabaseInstance"
  }
}

resource "aws_instance" "backend" {
  ami           = "ami-06c68f701d8090592"
  instance_type = var.instance_type
  key_name      = aws_key_pair.ssh_key.key_name

  iam_instance_profile = aws_iam_instance_profile.iam_instance_profile.name

  associate_public_ip_address = true
  subnet_id                   = aws_subnet.public_subnet.id
  vpc_security_group_ids      = [aws_security_group.backend_security_groug.id]

  user_data = templatefile("/home/mallone/projects/saas-ceremonies/install_backend.sh", {})

  tags = {
    Name = "Saas - BackendInstance"
  }
}

resource "aws_key_pair" "ssh_key" {
  key_name   = "my-ssh-key"
  public_key = file("../my-key-gen.pub")
}

resource "aws_iam_role" "role" {
  name = "test-role"

  assume_role_policy = <<EOF
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "sts:AssumeRole",
          "Principal": {
            "Service": "ec2.amazonaws.com"
          },
          "Effect": "Allow",
          "Sid": ""
        }
      ]
    }
EOF
}

resource "aws_iam_policy" "policy" {
  name        = "test-policy"
  description = "A test policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ecr:*",
        "cloudtrail:LookupEvents"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "test-attach" {
  role       = aws_iam_role.role.name
  policy_arn = aws_iam_policy.policy.arn
}

resource "aws_iam_instance_profile" "iam_instance_profile" {
  name = "saas-ec2-profile"
  role = aws_iam_role.role.name
}
