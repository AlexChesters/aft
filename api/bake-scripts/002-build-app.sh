set -e

pushd /tmp/aft-api

npm ci --only=prod

popd

mv /tmp/aft-api /usr/lib/aft-api

mkdir -p /var/log/aft-api

chown -R aft-api:aft-api /usr/lib/aft-api
chown -R aft-api:aft-api /var/log/aft-api

systemctl enable /usr/lib/aft-api/services/aft-api.service
