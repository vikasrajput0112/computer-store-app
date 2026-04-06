pipeline {
    agent any

    environment {
        IMAGE_NAME = "computer-store"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 3000:3000 $IMAGE_NAME'
            }
        }
    }
}
