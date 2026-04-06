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
                sh 'docker build -t $IMAGE_NAME:$TAG .'
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
                sh 'docker push $IMAGE_NAME:$TAG'
            }
        }
/*
        stage('Cleanup Docker') {
            steps {
                sh 'docker system prune -af || true'
            }
        }
*/
        stage('Show Image Info') {
            steps {
                echo "Pushed Image: ${IMAGE_NAME}:${TAG}"
            }
        }
        stage('Deploy to Kubernetes') {
    steps {
        sh """
        sed -i 's|image: .*|image: ${IMAGE_NAME}:${TAG}|g' k8s/deployment.yaml
        kubectl apply -f k8s/deployment.yaml
        kubectl apply -f k8s/service.yaml
        """
    }
}
    }
}
