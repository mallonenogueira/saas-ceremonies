
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
