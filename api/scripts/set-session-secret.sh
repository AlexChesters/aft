set -e

AWS_PROFILE=personal \
  aws ssm put-parameter \
  --name aft-session-secret \
  --value $(hexdump -vn16 -e'4/4 "%08X" 1 "\n"' /dev/urandom) \
  --type SecureString \
  --overwrite \
  --region eu-west-1
