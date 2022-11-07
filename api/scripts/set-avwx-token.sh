set -e

SECRET_VALUE=$1

if [[ -z "$SECRET_VALUE" ]]; then
  echo "[ERROR]: Secret value not provided"
  echo "Usage: sh scripts/set-avwx-token.sh <TOKEN_VALUE>"
  exit 1
fi

aws ssm put-parameter \
  --name aft-avwx-secret \
  --value "$1" \
  --type SecureString \
  --overwrite \
  --region eu-west-1 \
  --profile api-projects
