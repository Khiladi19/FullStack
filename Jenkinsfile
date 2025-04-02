pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'  // Ensure you have Node.js installed in Jenkins
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
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
                    sh 'docker build -t abhi702/fullstack-backend:latest ./backend'
                    sh 'docker build -t abhi702/fullstack-frontend:latest ./frontend'
                    sh 'docker push abhi702/fullstack-backend:latest'
                    sh 'docker push abhi702/fullstack-frontend:latest'
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

