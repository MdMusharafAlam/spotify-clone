pipeline {

    agent any

    environment {
        IMAGE_NAME = "8787490748/spotify-clone:v1"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }


        stage('Docker Build') {
            steps {
                bat """
                docker build -t %IMAGE_NAME% .
                """
            }
        }


        stage('Docker Login') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'voterapp_credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    bat """
                    echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    """

                }
            }
        }


        stage('Push Image to Docker Hub') {
            steps {
                bat """
                docker push %IMAGE_NAME%
                """
            }
        }


        stage('Verify Docker Image') {
            steps {
                bat """
                docker images
                """
            }
        }

    }


    post {

        success {
            echo 'Spotify Clone Docker Image Build and Push Successful!'
        }

        failure {
            echo 'Pipeline Failed. Check Jenkins Logs.'
        }

    }
}