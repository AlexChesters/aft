set -e

pushd /tmp/aft-api

npm ci --only=prod

mv \
  amazon-cloudwatch-agent.json \
  /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json

popd

mv /tmp/aft-api /usr/lib/aft-api

mkdir -p /var/log/aft-api

chown -R aft-api:aft-api /usr/lib/aft-api
chown -R aft-api:aft-api /var/log/aft-api

systemctl enable /usr/lib/aft-api/services/aft-api.service
