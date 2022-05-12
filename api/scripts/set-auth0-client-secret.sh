set -e

SECRET_VALUE=$1

if [[ -z "$SECRET_VALUE" ]]; then
  echo "[ERROR]: Secret value not provided"
  echo "Usage: sh scripts/set-auth0-client-secret.sh <SECRET_VALUE>"
  exit 1
fi

AWS_PROFILE=personal \
  aws ssm put-parameter \
  --name aft-auth0-client-secret \
  --value "$1" \
  --type SecureString \
  --overwrite \
  --region eu-west-1
