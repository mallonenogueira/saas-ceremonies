resource "aws_instance" "backend" {
  ami           = "ami-06c68f701d8090592"
  instance_type = var.instance_type
  key_name      = aws_key_pair.ssh_key.key_name

  iam_instance_profile = aws_iam_instance_profile.iam_instance_profile.name

  associate_public_ip_address = true
  subnet_id                   = aws_subnet.public_subnet.id
  vpc_security_group_ids      = [aws_security_group.backend_security_groug.id]

  user_data = templatefile("../install_backend.sh", {
    database_ip = aws_instance.db.private_ip
  })

  tags = {
    Name = "Saas - BackendInstance"
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


resource "aws_key_pair" "ssh_key" {
  key_name   = "my-ssh-key"
  public_key = file("../../.ssh/key.pub")
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
