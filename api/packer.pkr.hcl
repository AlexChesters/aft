source "amazon-ebs" "default" {
  ami_name              = "aft-api"
  force_delete_snapshot = true
  force_deregister      = true
  instance_type         = "t4g.nano"
  region                = "eu-west-1"
  ssh_username          = "ec2-user"
  subnet_id             = "subnet-0642944fa4b2f7f9b"
  source_ami_filter {
    filters = {
      name                = "base-images--nodejs"
      virtualization-type = "hvm"
      root-device-type    = "ebs"
    }
    owners      = ["008356366354"]
    most_recent = true
  }

  tags = {
    Name = "AFT API"
  }
  vpc_id = "vpc-074a894841ed93bdb"
}

build {
  sources = ["source.amazon-ebs.default"]

  provisioner "shell" {
    inline = [
      "mkdir /tmp/aft-api"
    ]
  }

  provisioner "file" {
    source      = "./"
    destination = "/tmp/aft-api"
  }

  provisioner "shell" {
    execute_command = "echo 'packer' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'"
    scripts = [
      "bake-scripts/001-create-user.sh",
      "bake-scripts/002-build-app.sh"
    ]
  }
}
