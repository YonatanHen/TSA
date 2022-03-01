pipeline {

    agent any

    stages {
        stage("build") {
            steps {
                echo 'Building the application...'
                dir("client") {
                    echo 'inside client...'
                    sh 'npm install'
                    sh 'npm build'
                }
                dir("server") {
                    echo 'inside server...'
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