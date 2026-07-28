pipeline {

    agent any

    environment {
        IMAGE_NAME = "8787490748/spotify-clone:v1"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }


        stage('Docker Build') {
            steps {
                bat "docker build -t %IMAGE_NAME% ."
            }
        }


        stage('Check Credentials') {
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: 'voterapp_credentials',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )
        ]) {
            bat '''
            echo Username=%DOCKER_USER%
            if "%DOCKER_PASS%"=="" (
                echo PASSWORD IS EMPTY
                exit /b 1
            ) else (
                echo PASSWORD IS PRESENT
            )
            '''
        }
    }
}


        stage('Docker Push') {
            steps {
                bat "docker push %IMAGE_NAME%"
            }
        }


        stage('Deploy to Kubernetes') {
            steps {

                bat '''
                kubectl apply -f k8s/spotify-deployment.yaml
                kubectl apply -f k8s/spotify-service.yaml
                '''

            }
        }


        stage('Verify Deployment') {
            steps {

                bat '''
                kubectl get pods
                kubectl get svc
                '''

            }
        }

    }


    post {

        success {
            echo "Spotify Clone CI/CD Pipeline Completed Successfully"
        }

        failure {
            echo "Pipeline Failed"
        }

    }
}