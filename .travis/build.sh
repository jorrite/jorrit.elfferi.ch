#!/bin/bash

export NODE_ENV=travis-default

if [[ $TRAVIS_BRANCH == 'master' ]]
then
  export NODE_ENV=staging
elif [[ $TRAVIS_BRANCH == 'production' ]]
then
  export NODE_ENV=production
fi

echo $NODE_ENV

node index.js