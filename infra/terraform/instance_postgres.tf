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

resource "aws_instance" "db" {
  ami           = "ami-06c68f701d8090592"
  instance_type = var.instance_type
  key_name      = aws_key_pair.ssh_key.key_name

  associate_public_ip_address = false
  subnet_id                   = aws_subnet.private_subnet.id
  vpc_security_group_ids      = [aws_security_group.db_security_group.id]

  user_data = templatefile("../install_postgress.sh", {
    pg_hba_file     = templatefile("../pg_hba.conf", { allowed_ip = "0.0.0.0/0" }),
    postgresql_file = templatefile("../postgresql.conf", { allowed_ip = "*" }),
  })

  tags = {
    Database = "PostgreSQL"
    Name     = "DatabaseInstance"
  }
}
