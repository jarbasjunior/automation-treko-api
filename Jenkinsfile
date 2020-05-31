pipeline {
  agent {
    docker {
      image "node:8-alpine"
      args "--network=skynet"
    }
  }
  stages {
    stage("Build") {
      steps {
        sh "apk add --update-cache mongodb \
           --repository http://dl-cdn.alpinelinux.org/alpine/v3.6/main \
           --repository http://dl-cdn.alpinelinux.org/alpine/v3.6/community"
        sh "chmod +x ./scripts/dropdb.sh"
        sh "npm install"
      }
    }
    stage("Test") {
      steps {
        sh "npm run test:ci"
      }
    }
  }
}