source "amazon-ebs" "default" {
  ami_name                = "aft-api"
  force_delete_snapshot   = true
  force_deregister        = true
  instance_type           = "t4g.nano"
  region                  = "eu-west-1"
  ssh_username            = "ec2-user"
  subnet_id               = "subnet-01001afad61ae5506"
  temporary_key_pair_type = "ed25519"

  source_ami_filter {
    filters = {
      name                = "base-images--nodejs"
      virtualization-type = "hvm"
      root-device-type    = "ebs"
    }
    owners      = ["748997477946"]
    most_recent = true
  }

  launch_block_device_mappings {
    device_name           = "/dev/xvda"
    volume_size           = "16"
    volume_type           = "gp2"
    delete_on_termination = true
  }

  tags = {
    Name = "AFT API"
  }
  vpc_id = "vpc-02ac7aee4d2125c4f"
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
