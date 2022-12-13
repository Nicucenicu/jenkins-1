pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('nicu651-dockerhub')
	}

	stages {

		stage('Build') {

			steps {
				bat 'docker build -t nicu651/lab4:latest ./users-api'
			}
		}

		stage('Login') {

			steps {
				bat 'echo %DOCKERHUB_CREDENTIALS_PSW%|docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin'
			}
		}

		stage('Push') {

			steps {
				bat 'docker push nicu651/lab4:latest'
			}
		}
	}

	post {
		always {
			bat 'docker logout'
		}
	}

}
