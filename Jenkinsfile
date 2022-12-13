pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('nicu651-dockerhub')
	}

	stages {

		stage('Build') {

			steps {
				sh 'docker build -t nicu651/lab3:latest .'
			}
		}

		stage('Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Push') {

			steps {
				sh 'docker push nicu651/lab3:latest'
			}
		}
	}

	post {
		always {
			sh 'docker logout'
		}
	}

}
