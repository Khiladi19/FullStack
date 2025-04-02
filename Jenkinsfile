pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
        DOCKER_HUB_USER = 'abhi702'
        DOCKER_HUB_PASS = credentials('docker-hub-password-id')  // Use Jenkins credentials
        BACKEND_IMAGE = "abhi702/backend:latest"
        FRONTEND_IMAGE = "abhi702/frontend:latest"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Khiladi19/FullStack.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                cd backend && npm install
                cd ../frontend && npm install
                '''
            }
        }

        stage('Build Application') {
            steps {
                sh '''
                cd backend && npm run build
                cd ../frontend && npm run build
                '''
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    try {
                        sh 'cd backend && npm test || echo "Backend tests failed, but continuing..."'
                        sh 'cd frontend && npm test || echo "Frontend tests failed, but continuing..."'
                    } catch (Exception e) {
                        echo "Tests failed, but pipeline will continue..."
                    }
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    sh '''
                    echo $DOCKER_HUB_PASS | docker login -u $DOCKER_HUB_USER --password-stdin
                    docker build -t $BACKEND_IMAGE ./backend
                    docker build -t $FRONTEND_IMAGE ./frontend
                    docker push $BACKEND_IMAGE
                    docker push $FRONTEND_IMAGE
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f kuber/'
            }
        }
    }
}

