# aft-api

## Architecture
![Architecture diagram of the AFT API](docs/img/architecture.png)

## Scripts
The [`scripts/`](scripts/) directory contains various scripts which should be
ran manually on a local machine:
* [`pipeline.sh`](scripts/pipeline.sh) - this script updates the
[CloudFormation template](ci/codepipeline.yml) which defines the CodePipeline
* [`set-avwx-token.sh`](scripts/set-avwx-token.sh) - this script updates
a Parameter Store entry with a token used to authenticate requests to AVWX
* [`airport-data/generate.js`](scripts/airport-data/generate.js) - this Node.js
script is used to generate the airport data (uses the CSV files from
[Our Airports](https://ourairports.com/data/))

## Load tests
Load testing is performed after every deployment using
[`loadtest`](https://www.npmjs.com/package/loadtest); the load test script can
be found in the [`load-test/`](load-test/index.js) directory.

## Monitoring
There exists a CloudWatch dashboard which can be used to monitor the service;
the dashboard is defined in the main
[CloudFormation stack](stacks/infrastructure.yml).

## Accessing the running server
`ssh -A -i ~/Desktop/key-pairs/personal.pem -J nat ec2-user@<AFT_EC2_IP_ADDRESS>`
