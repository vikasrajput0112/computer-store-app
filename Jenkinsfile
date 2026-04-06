pipeline {
    agent any

    environment {
        IMAGE_NAME = "vikas0112/computer-store"
    }

    stages {

        stage('Generate Tag') {
            steps {
                script {
                    env.TAG = sh(
                        script: "date +%Y%m%d-%H%M%S",
                        returnStdout: true
                    ).trim()
                }
            }
        }

        stage('Build Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME:$TAG .
                docker tag $IMAGE_NAME:$TAG $IMAGE_NAME:latest
                '''
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                docker push $IMAGE_NAME:$TAG
                docker push $IMAGE_NAME:latest
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl rollout restart deployment computer-store || true
                '''
            }
        }

        stage('Cleanup Docker') {
            steps {
                sh 'docker system prune -af || true'
            }
        }

        stage('Show Image Info') {
            steps {
                echo "Pushed Images:"
                echo "${IMAGE_NAME}:${TAG}"
                echo "${IMAGE_NAME}:latest"
            }
        }
    }
}
