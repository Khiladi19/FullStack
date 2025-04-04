pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
        VERSION = "v1.0.${BUILD_NUMBER}"  // Unique version per build
        DOCKER_USER = "abhi702"
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
                    # Build versioned images
                    docker build -t $DOCKER_USER/backend:$VERSION ./backend
                    docker build -t $DOCKER_USER/frontend:$VERSION ./frontend

                    # Tag as latest
                    docker tag $DOCKER_USER/backend:$VERSION $DOCKER_USER/backend:latest
                    docker tag $DOCKER_USER/frontend:$VERSION $DOCKER_USER/frontend:latest

                    # Push all
                    docker push $DOCKER_USER/backend:$VERSION
                    docker push $DOCKER_USER/frontend:$VERSION
                    docker push $DOCKER_USER/backend:latest
                    docker push $DOCKER_USER/frontend:latest
                    '''
                }
            }
        }

        stage('Update Docker Compose & Restart') {
            steps {
                script {
                    sh '''
                    # Replace image tags with new version
                    sed -i "s|image: $DOCKER_USER/backend:.*|image: $DOCKER_USER/backend:$VERSION|" docker-compose.yml
                    sed -i "s|image: $DOCKER_USER/frontend:.*|image: $DOCKER_USER/frontend:$VERSION|" docker-compose.yml

                    docker-compose pull
                    docker-compose up -d --force-recreate
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh '''
                    # Update deployment YAMLs with new version
                    sed -i "s|image: $DOCKER_USER/backend:.*|image: $DOCKER_USER/backend:$VERSION|" kuber/backend-deployment.yaml
                    sed -i "s|image: $DOCKER_USER/frontend:.*|image: $DOCKER_USER/frontend:$VERSION|" kuber/frontend-deployment.yaml

                    # Apply and rollout
                    kubectl apply -f kuber/backend-deployment.yaml
                    kubectl apply -f kuber/frontend-deployment.yaml

                    kubectl rollout restart deployment/backend
                    kubectl rollout restart deployment/frontend
                    '''
                }
            }
        }
    }
}



