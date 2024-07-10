output "db_instance_id" {
  description = "ID of the database instance"
  value       = aws_instance.db.id
}

output "backend_instance_id" {
  description = "ID of the backend instance"
  value       = aws_instance.backend.id
}

output "db_instance_public_ip" {
  description = "Public IP of the database instance"
  value       = aws_instance.db.public_ip
}

output "db_instance_private_ip" {
  description = "Private IP of the database instance"
  value       = aws_instance.db.private_ip
}

output "backend_instance_public_ip" {
  description = "Public IP of the backend instance"
  value       = aws_instance.backend.public_ip
}
