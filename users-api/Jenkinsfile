pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('dunivivi-dockerhub')
	}

	stages {

		stage('Build') {

			steps {
				sh 'docker build -t dunivivi/spring-front:latest .'
			}
		}

		stage('Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Push') {

			steps {
				sh 'docker push dunivivi/spring-front:latest'
			}
		}
	}

	post {
		always {
			sh 'docker logout'
		}
	}

}
