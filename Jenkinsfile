pipeline {
  agent {
    docker {
      image "node:9-alpine"
      args "--network=skynet"
    }
  }
  stages {
    stage("Build") {
      steps {
        sh "apk add --no-cache mongodb \
           --repository http://dl-cdn.alpinelinux.org/alpine/v3.9/main \
           --repository http://dl-cdn.alpinelinux.org/alpine/v3.9/community"
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