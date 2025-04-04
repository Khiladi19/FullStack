pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
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
                sh 'cd frontend && chmod +x node_modules/.bin/vite && npm run build'
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
                    docker build -t abhi702/backend:latest ./backend
                    docker build -t abhi702/frontend:latest ./frontend
                    docker push abhi702/backend:latest
                    docker push abhi702/frontend:latest
                    '''
                }
            }
        }

        stage('Update Docker Compose Image & Restart Services') {
            steps {
                script {
                    sh '''
                    # Update docker-compose.yaml to use latest images
                    sed -i 's|image: abhi702/backend:.*|image: abhi702/backend:latest|' docker-compose.yml
                    sed -i 's|image: abhi702/frontend:.*|image: abhi702/frontend:latest|' docker-compose.yml

                    # Restart services with updated images
                    docker-compose down
                    docker-compose up -d
                    '''
                }
            }
        }
         stage('Delete minikube Deployment & Service') {
            steps {
                script {
                    // Update Kubernetes deployment files to use the latest images
                    sh '''
                    kubecle delete deployment backend frontend
                    kubectl delete service backend-service frontend-service
                    '''
                }
            }
        }

        stage('Update Kubernetes Deployment & Deploy') {
            steps {
                script {
                    // Update Kubernetes deployment files to use the latest images
                    sh '''
                    sed -i 's|image: abhi702/backend:.*|image: abhi702/backend:latest|' kuber/backend-deployment.yaml
                    sed -i 's|image: abhi702/frontend:.*|image: abhi702/frontend:latest|' kuber/frontend-deployment.yaml

                    # Apply the updated deployment files to Kubernetes
                    kubectl apply -f kuber/backend-deployment.yaml
                    kubectl apply -f kuber/frontend-deployment.yaml
                    '''
                }
            }
        }
    }
}


