def buildAPP(){
    echo "building the application..."
}

def testAPP(){
    echo "testing the application..."
}

def deployAPP(){
    echo "deploying the application..."
    echo "deploying version ${params.VERSION}"
}
return this
