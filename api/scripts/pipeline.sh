set -e

aws cloudformation deploy \
  --template-file ci/codepipeline.yml \
  --stack-name codepipeline-aft-api \
  --capabilities CAPABILITY_NAMED_IAM \
  --region eu-west-1 \
  --profile api-projects
