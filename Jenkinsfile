pipline {

    agent any

    stages {
        stage("build") {
            steps {
                echo 'building the application...'
                dir("client") {
                    sh 'npm install'
                    sh 'npm build'
                }
                dir("server") {
                    sh 'npm install'
                    sh 'npm build'
                }
            }
        }

        stage("test") {
            steps {
                echo 'testing the application...'
            }
        }

        stage("deploy") {
            steps {
                echo 'deploying the application...'
            }
        }
    }
}