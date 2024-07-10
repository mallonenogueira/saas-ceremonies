variable "aws_region" {
  description = "The AWS region to deploy in"
  default     = "us-east-1"
}

variable "cidr_block" {
  default = "10.0.0.0/16"
}

variable "public_subnet" {
  default = "10.0.0.0/24"
}

variable "private_subnet" {
  default = "10.0.1.0/24"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "aws_availability_zone" {
  type    = string
  default = "us-east-1a"
}

variable "aws_availability_private_zone" {
  type    = string
  default = "us-east-1b"
}