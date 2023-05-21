set -e

export AWS_PROFILE=api-projects

PRIVATE_IP_ADDRESS=$(aws ec2 describe-instances \
  --filters Name=instance-state-name,Values=running Name=tag:Name,Values="AFT API" \
  | jq -r .Reservations[0].Instances[0].PrivateIpAddress)

ssh -A -i ~/Desktop/key-pairs/personal.pem -J nat ec2-user@$PRIVATE_IP_ADDRESS
