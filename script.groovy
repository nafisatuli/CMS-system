def buildAPP(){
    echo "building the application..."
    sh 'npm install'
}

def buildImage(){
    withCredentials([
        usernamePassword(credentialsId:'dockerhub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')
    ]){
    echo "building the docker image of application..."
    sh 'docker build -t anssaeed/my-repo:cms1.0 .'
    sh 'echo $PASS | docker login -u $USER --password-stdin'
    sh 'docker push anssaeed/my-repo:cms1.0'
    }
}

// def deployAPP(){
//     echo "deploying the application..."
//     echo "deploying version ${params.VERSION}"
// }
return this
