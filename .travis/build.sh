#!/bin/bash

NODE_ENV=travis-default

if [[ $TRAVIS_BRANCH == 'master' ]]
then
  NODE_ENV=staging
elif [[ $TRAVIS_BRANCH == 'production' ]]
then
  NODE_ENV=production
fi

echo $NODE_ENV

node index.js