#!/bin/bash

NODE_ENV=travis-default

if [[ $TRAVIS_BRANCH == 'master' ]]
then
  NODE_ENV=staging
elif [[ $TRAVIS_BRANCH == 'production' ]]
  NODE_ENV=production
fi

node index.js